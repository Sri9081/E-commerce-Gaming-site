import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, CreditCard, MapPin, Truck } from 'lucide-react';
import axios from 'axios';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

// Zod Schemas
const addressSchema = z.object({
    fullName: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian Phone Number (10 digits)'),
    street: z.string().min(5, 'Address is too short'),
    city: z.string().min(2, 'City is required'),
    zipCode: z.string().min(5, 'Invalid ZIP code').regex(/^\d+$/, 'Numbers only'),
    country: z.string().min(2, 'Country is required'),
});

const paymentSchema = z.object({
    cardNumber: z.string().min(19, 'Card number must be 16 digits').max(19), // 16 digits + 3 spaces
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid Format (MM/YY)'),
    cvc: z.string().regex(/^\d{3}$/, 'Invalid CVC (3 digits)'),
});

type AddressFormData = z.infer<typeof addressSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

const Checkout: React.FC = () => {
    const { items, total, clearCart } = useCart();
    const { addToast } = useToast();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Forms
    const addressForm = useForm<AddressFormData>({ resolver: zodResolver(addressSchema) });
    const paymentForm = useForm<PaymentFormData>({ resolver: zodResolver(paymentSchema) });

    // Input Formatters
    const formatCardNumber = (value: string) => {
        const numeric = value.replace(/\D/g, '');
        const truncated = numeric.slice(0, 16);
        return truncated.replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiry = (value: string) => {
        const numeric = value.replace(/\D/g, '');
        if (numeric.length >= 2) {
            return `${numeric.slice(0, 2)}/${numeric.slice(2, 4)}`;
        }
        return numeric;
    };

    const formatCVC = (value: string) => {
        return value.replace(/\D/g, '').slice(0, 3);
    };

    const formatZipCode = (value: string) => {
        return value.replace(/\D/g, '').slice(0, 6);
    };

    const handleAddressSubmit = (data: AddressFormData) => {

        setUserEmail(data.email);
        setStep(2);
    };

    const handlePaymentSubmit = (_data: PaymentFormData) => {

        setStep(3); // Go to review/complete
    };

    const handleFinalizeOrder = async () => {
        setIsSubmitting(true);
        try {
            const addressData = addressForm.getValues();
            const paymentData = paymentForm.getValues();

            const payload = {
                user: addressData,
                cart: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                total: total,
                payment: {
                    last4: paymentData.cardNumber.slice(-4),
                    method: 'card'
                }
            };

            const response = await axios.post('http://localhost:5000/api/checkout', payload);

            if (response.data.success) {

                setIsOrderPlaced(true);
                clearCart();
                addToast('Order Placed Successfully!', 'success');
            }
        } catch (error) {
            console.error('Checkout Error:', error);
            addToast('Failed to place order. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0 && !isOrderPlaced) {
        return (
            <div className="pt-24 container mx-auto px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/catalog">
                    <GlassButton>Go to Catalog</GlassButton>
                </Link>
            </div>
        );
    }

    if (isOrderPlaced) {
        return (
            <div className="pt-24 container mx-auto px-4 flex items-center justify-center min-h-[60vh]">
                <GlassCard className="text-center p-12 max-w-lg">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"
                    >
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
                            <Check className="w-10 h-10" />
                        </motion.div>
                    </motion.div>
                    <h1 className="text-3xl font-bold mb-4 text-glow">Order Placed!</h1>
                    <p className="text-gray-400 mb-2">
                        Thank you for your purchase.
                    </p>
                    <p className="text-primary font-bold mb-4">
                        A confirmation email has been sent to {userEmail}
                    </p>
                    <Link to="/">
                        <GlassButton>Return Home</GlassButton>
                    </Link>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="pt-24 container mx-auto px-4 pb-20">
            <h1 className="text-3xl font-bold mb-8 text-center text-glow">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Form Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Step 1: Address */}
                    <GlassCard className={cn("transition-opacity", step !== 1 && "opacity-50 pointer-events-none")}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", step >= 1 ? "bg-primary text-white" : "bg-white/10")}>1</div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <motion.div whileHover={{ scale: 1.2, y: -2 }}>
                                    <MapPin className="w-5 h-5" />
                                </motion.div>
                                Shipping Address
                            </h2>
                        </div>

                        {step === 1 && (
                            <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                        <input {...addressForm.register("fullName")} className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary" placeholder="John Doe" />
                                        {addressForm.formState.errors.fullName && <p className="text-red-400 text-xs mt-1">{addressForm.formState.errors.fullName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                                        <input {...addressForm.register("email")} className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary" placeholder="john@example.com" />
                                        {addressForm.formState.errors.email && <p className="text-red-400 text-xs mt-1">{addressForm.formState.errors.email.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Phone Number (+91)</label>
                                    <input
                                        {...addressForm.register("phone")}
                                        className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary"
                                        placeholder="9876543210"
                                        maxLength={10}
                                    />
                                    {addressForm.formState.errors.phone && <p className="text-red-400 text-xs mt-1">{addressForm.formState.errors.phone.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Street Address</label>
                                    <input {...addressForm.register("street")} className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary" placeholder="123 Gaming St" />
                                    {addressForm.formState.errors.street && <p className="text-red-400 text-xs mt-1">{addressForm.formState.errors.street.message}</p>}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">City</label>
                                        <input {...addressForm.register("city")} className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary" />
                                        {addressForm.formState.errors.city && <p className="text-red-400 text-xs mt-1">{addressForm.formState.errors.city.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Zip Code</label>
                                        <input
                                            {...addressForm.register("zipCode")}
                                            onChange={(e) => {
                                                const formatted = formatZipCode(e.target.value);
                                                addressForm.setValue('zipCode', formatted);
                                            }}
                                            className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary"
                                            placeholder="110001"
                                            maxLength={6}
                                        />
                                        {addressForm.formState.errors.zipCode && <p className="text-red-400 text-xs mt-1">{addressForm.formState.errors.zipCode.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Country</label>
                                        <input {...addressForm.register("country")} className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary" />
                                        {addressForm.formState.errors.country && <p className="text-red-400 text-xs mt-1">{addressForm.formState.errors.country.message}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <GlassButton type="submit">Continue to Payment</GlassButton>
                                </div>
                            </form>
                        )}
                    </GlassCard>

                    {/* Step 2: Payment */}
                    <GlassCard className={cn("transition-opacity", step !== 2 && "opacity-50 pointer-events-none")}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", step >= 2 ? "bg-primary text-white" : "bg-white/10")}>2</div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                                    <CreditCard className="w-5 h-5" />
                                </motion.div>
                                Payment Details
                            </h2>
                        </div>

                        {step === 2 && (
                            <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Card Number</label>
                                    <input
                                        {...paymentForm.register("cardNumber")}
                                        onChange={(e) => {
                                            const formatted = formatCardNumber(e.target.value);
                                            paymentForm.setValue('cardNumber', formatted);
                                        }}
                                        className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                    />
                                    {paymentForm.formState.errors.cardNumber && <p className="text-red-400 text-xs mt-1">{paymentForm.formState.errors.cardNumber.message}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                                        <input
                                            {...paymentForm.register("expiry")}
                                            onChange={(e) => {
                                                const formatted = formatExpiry(e.target.value);
                                                paymentForm.setValue('expiry', formatted);
                                            }}
                                            className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary"
                                            placeholder="MM/YY"
                                            maxLength={5}
                                        />
                                        {paymentForm.formState.errors.expiry && <p className="text-red-400 text-xs mt-1">{paymentForm.formState.errors.expiry.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">CVC</label>
                                        <input
                                            {...paymentForm.register("cvc")}
                                            onChange={(e) => {
                                                const formatted = formatCVC(e.target.value);
                                                paymentForm.setValue('cvc', formatted);
                                            }}
                                            className="w-full bg-black/20 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-primary"
                                            placeholder="123"
                                            maxLength={3}
                                        />
                                        {paymentForm.formState.errors.cvc && <p className="text-red-400 text-xs mt-1">{paymentForm.formState.errors.cvc.message}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 gap-4">
                                    <GlassButton type="button" variant="ghost" onClick={() => setStep(1)}>Back</GlassButton>
                                    <GlassButton type="submit">Review Order</GlassButton>
                                </div>
                            </form>
                        )}
                    </GlassCard>

                    {/* Step 3: Review */}
                    <GlassCard className={cn("transition-opacity", step !== 3 && "opacity-50 pointer-events-none")}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", step >= 3 ? "bg-primary text-white" : "bg-white/10")}>3</div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <motion.div whileHover={{ scale: 1.2, x: 5 }}>
                                    <Truck className="w-5 h-5" />
                                </motion.div>
                                Review Order
                            </h2>
                        </div>
                        {step === 3 && (
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <h3 className="font-bold text-sm text-gray-400 mb-2">Ship To:</h3>
                                    <p className="text-sm">{addressForm.getValues("fullName")}</p>
                                    <p className="text-sm text-gray-400">{addressForm.getValues("street")}, {addressForm.getValues("city")}</p>
                                </div>
                                <div className="flex justify-end pt-4 gap-4">
                                    <GlassButton type="button" variant="ghost" onClick={() => setStep(2)}>Back</GlassButton>
                                    <GlassButton
                                        onClick={handleFinalizeOrder}
                                        disabled={isSubmitting}
                                        className="bg-green-600 hover:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Processing...' : `Place Order (₹${total.toLocaleString('en-IN')})`}
                                    </GlassButton>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <GlassCard className="sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 text-sm">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded bg-white/5 object-cover" />
                                    <div className="flex-1">
                                        <p className="font-medium line-clamp-1">{item.name}</p>
                                        <p className="text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-glass-border pt-4 space-y-2 text-sm text-gray-400">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{(total / 1.18).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (18%)</span>
                                <span>₹{(total - (total / 1.18)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between text-white text-lg font-bold border-t border-glass-border pt-2 mt-2">
                                <span>Total</span>
                                <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
