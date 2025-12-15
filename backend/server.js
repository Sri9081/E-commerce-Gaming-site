const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { z } = require('zod');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data Storage Path
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Zod Schemas
const orderSchema = z.object({
    user: z.object({
        fullName: z.string(),
        email: z.string().email(),
        phone: z.string().regex(/^[6-9]\d{9}$/),
        street: z.string(),
        city: z.string(),
        zipCode: z.string(),
        country: z.string(),
    }),
    cart: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        image: z.string()
    })),
    total: z.number(),
    payment: z.object({
        last4: z.string(),
        method: z.string()
    })
});

// Nodemailer Transporter
let transporter;

async function createTransporter() {
    // 1. Try Real SMTP (if configured in .env)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            transporter = nodemailer.createTransport({
                service: 'gmail', // Use 'gmail' or provide host/port manually
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            console.log(`📧 Real Mail Server Ready (${process.env.EMAIL_USER})`);
            return;
        } catch (err) {
            console.error('❌ Failed to connect to Real SMTP:', err);
        }
    }

    // 2. Fallback to Ethereal
    try {
        console.log('⚠️ No real email config found (or failed). Using Ethereal (Fake) Mail.');
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        console.log('📧 Ethereal Mail Server Ready');
    } catch (err) {
        console.error('Failed to create mail transporter:', err);
    }
}

createTransporter();

// Routes
app.post('/api/checkout', async (req, res) => {
    try {
        console.log('📝 Received Order Request');

        // 1. Validate Data
        const orderData = orderSchema.parse(req.body);

        // 2. Read Existing Orders
        let orders = [];
        if (fs.existsSync(ORDERS_FILE)) {
            const data = fs.readFileSync(ORDERS_FILE, 'utf8');
            orders = data ? JSON.parse(data) : [];
        }

        // 3. Create New Order Object
        const newOrder = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            timestamp: new Date().toISOString(),
            ...orderData
        };

        // 4. Save to File
        orders.push(newOrder);
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
        console.log(`💾 Order Saved: ${newOrder.id}`);

        // 5. Send Email
        let previewUrl = null;
        if (transporter) {
            const info = await transporter.sendMail({
                from: '"Nexus Gaming" <orders@nexusgaming.com>',
                to: orderData.user.email,
                subject: `Order Confirmation #${newOrder.id}`,
                text: `Thank you ${orderData.user.fullName}!\n\nYour order #${newOrder.id} has been placed successfully.\nTotal Amount: ₹${orderData.total.toLocaleString('en-IN')}\n\nItems:\n${orderData.cart.map(i => `- ${i.name} x${i.quantity}`).join('\n')}\n\nWe will notify you when it ships!`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h1 style="color: #6366f1;">Order Confirmed!</h1>
                        <p>Hi <strong>${orderData.user.fullName}</strong>,</p>
                        <p>Thank you for shopping with Nexus Gaming. Ryze your game!</p>
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
                            <p><strong>Order ID:</strong> #${newOrder.id}</p>
                            <p><strong>Total:</strong> ₹${orderData.total.toLocaleString('en-IN')}</p>
                        </div>
                        <h3>Items:</h3>
                        <ul>
                            ${orderData.cart.map(i => `<li>${i.name} (x${i.quantity}) - ₹${i.price}</li>`).join('')}
                        </ul>
                        <p>You can track your order status on our website.</p>
                    </div>
                `
            });

            console.log("📨 Message sent: %s", info.messageId);
            previewUrl = nodemailer.getTestMessageUrl(info);
            console.log("🔗 Preview URL: %s", previewUrl);
        }

        // 6. Respond
        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            orderId: newOrder.id,
            previewUrl: previewUrl || 'Email service unavailable'
        });

    } catch (error) {
        console.error('❌ Order Error:', error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ success: false, error: 'Validation Failed', details: error.errors });
        }
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
