import type { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'NVIDIA GeForce RTX 4090',
        description: 'The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.',
        price: 158999,
        image: '/images/products/rtx4090.jpg',
        rating: 4.9,
        category: 'hardware',
        brand: 'NVIDIA',
        specs: {
            'VRAM': '24GB GDDR6X',
            'Boost Clock': '2.52 GHz',
            'Cores': '16384'
        },
        reviews: [
            { id: 'r1', user: 'Rahul K.', rating: 5, comment: 'Absolute beast of a card. Runs everything at 4K 120fps.', date: '2023-11-15' },
            { id: 'r2', user: 'Amit S.', rating: 5, comment: 'Expensive but worth every rupee for rendering.', date: '2023-12-02' }
        ],
        inStock: false
    },
    {
        id: '2',
        name: 'Cyberpunk 2077: Phantom Liberty',
        description: 'Phantom Liberty is a new spy-thriller adventure for Cyberpunk 2077. Return as cyber-enhanced mercenary V.',
        price: 2999,
        image: '/images/products/cyberpunk2077.jpg',
        rating: 4.8,
        category: 'game',
        platform: 'PC',
        genre: 'RPG',
        reviews: [
            { id: 'r3', user: 'Priya M.', rating: 5, comment: 'Night City has never looked better. Story is top notch.', date: '2023-10-10' }
        ]
    },
    {
        id: '3',
        name: 'Logitech G Pro X Superlight',
        description: 'Designed with and for pros. The lightest, fastest PRO mouse ever.',
        price: 12995,
        image: '/images/products/gpro-superlight.jpg',
        rating: 4.7,
        category: 'hardware',
        brand: 'Logitech',
        specs: {
            'DPI': '25,600',
            'Weight': '<63g',
            'Battery': '70h'
        },
        reviews: [
            { id: 'r4', user: 'Vikram S.', rating: 4, comment: 'Super light, aim feels snappy. Battery life is insane.', date: '2023-09-20' }
        ],
        inStock: false
    },
    {
        id: '4',
        name: 'Elden Ring',
        description: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace.',
        price: 3999,
        image: '/images/products/elden-ring.jpg',
        rating: 4.9,
        category: 'game',
        platform: 'PS5',
        genre: 'Action RPG',
        reviews: [
            { id: 'r5', user: 'Arjun R.', rating: 5, comment: 'A masterpiece. Difficult but rewarding.', date: '2022-03-15' }
        ]
    },
    {
        id: '5',
        name: 'Razer Huntsman V2',
        description: 'Optical Gaming Keyboard with Near-zero Latency.',
        price: 15499,
        image: '/images/products/huntsman-v2.jpg',
        rating: 4.6,
        category: 'hardware',
        brand: 'Razer',
        specs: {
            'Switch': 'Linear Optical',
            'Polling Rate': '8000Hz',
            'Keycaps': 'PBT'
        },
        reviews: [
            { id: 'r6', user: 'Neha G.', rating: 4, comment: 'Clicky and fast. Wrist rest is comfortable.', date: '2023-08-05' }
        ]
    },
    {
        id: '6',
        name: 'God of War Ragnarök',
        description: 'Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.',
        price: 4999,
        image: '/images/products/gow-ragnarok.jpg',
        rating: 4.9,
        category: 'game',
        platform: 'PS5',
        genre: 'Action Adventure',
        reviews: [
            { id: 'r7', user: 'Karan J.', rating: 5, comment: 'Best story game I have played this year.', date: '2022-11-20' }
        ]
    },
    // Hot Deals (New Valid Images)
    {
        id: '7',
        name: 'Ultimate Streamer Bundle',
        description: 'Everything you need to start streaming: Mic, Webcam, and Ring Light. Limited Time Offer!',
        price: 24999,
        image: '/images/products/streamer-bundle.jpg', // Collaborative setup image
        rating: 5.0,
        category: 'deals',
        brand: 'Nexus',
        specs: {
            'Includes': 'Mic, Cam, Light',
            'Savings': '₹12,000'
        },
        reviews: [
            { id: 'r8', user: 'Simran K.', rating: 5, comment: 'Great starter pack for my channel!', date: '2024-01-10' }
        ],
        originalPrice: 36999
    },
    {
        id: '8',
        name: 'Pro FPS Gamer Kit',
        description: 'High-precision mouse + Mechanical Keyboard combo for competitive gaming.',
        price: 11999,
        image: '/images/products/fps-kit.jpg', // Gaming setup
        rating: 4.7,
        category: 'deals',
        brand: 'Razer/Logitech',
        specs: {
            'Mouse': '20k DPI',
            'Keyboard': 'Mechanical Red'
        },
        reviews: [
            { id: 'r9', user: 'Rohan D.', rating: 4, comment: 'Good value for money. Mouse is excellent.', date: '2024-02-01' }
        ],
        originalPrice: 15999,
        inStock: false
    },
    {
        id: '9',
        name: 'VR Starter Pack',
        description: 'Enter the metaverse with this all-in-one VR headset bundle.',
        price: 34999,
        image: '/images/products/vr-bundle.jpg', // VR Headset
        rating: 4.5,
        category: 'deals',
        brand: 'Oculus',
        specs: {
            'Res': '4K Combined',
            'Refresh': '90Hz'
        },
        reviews: [
            { id: 'r10', user: 'Vivek A.', rating: 5, comment: 'Immersive experience. Best deal out there.', date: '2024-01-25' }
        ],
        originalPrice: 45000
    },
    // More Hardware
    {
        id: '10',
        name: 'Alienware 34" Curved Monitor',
        description: 'QD-OLED Gaming Monitor with 175Hz refresh rate for immersive gameplay.',
        price: 89999,
        image: '/images/products/alienware-monitor.jpg',
        rating: 4.9,
        category: 'hardware',
        brand: 'Alienware',
        specs: {
            'Refresh': '175Hz',
            'Panel': 'QD-OLED',
            'Response': '0.1ms'
        },
        reviews: [
            { id: 'r11', user: 'Ankit P.', rating: 5, comment: 'Colors are vibrant. HDR is mind-blowing.', date: '2023-12-15' }
        ]
    },
    {
        id: '11',
        name: 'SteelSeries Arctis Nova Pro',
        description: 'High-fidelity gaming headset with active noise cancellation.',
        price: 29999,
        image: '/images/products/arctis-nova.jpg',
        rating: 4.8,
        category: 'hardware',
        brand: 'SteelSeries',
        specs: {
            'Audio': 'Hi-Res',
            'Conn': 'Wireless'
        },
        reviews: [
            { id: 'r12', user: 'Sanjay B.', rating: 5, comment: 'Best wireless headset I have owned.', date: '2024-01-05' }
        ]
    },
    {
        id: '12',
        name: 'Samsung 990 PRO 2TB SSD',
        description: 'Blazing fast PCIe 4.0 NVMe SSD for top-tier gaming performance.',
        price: 14999,
        image: '/images/products/samsung-ssd.jpg',
        rating: 4.9,
        category: 'hardware',
        brand: 'Samsung',
        specs: {
            'Read': '7450 MB/s',
            'Write': '6900 MB/s'
        },
        reviews: [
            { id: 'r13', user: 'TechGuru', rating: 5, comment: 'Loading screens are gone.', date: '2023-11-01' }
        ]
    },
    // More Games
    {
        id: '13',
        name: 'EA SPORTS FC 24',
        description: 'The world\'s game with HyperMotionV technology.',
        price: 4499,
        image: '/images/products/fc24.jpg',
        rating: 4.5,
        category: 'game',
        platform: 'All Platforms',
        genre: 'Sports',
        reviews: [
            { id: 'r14', user: 'FootballFan', rating: 4, comment: 'Gameplay is smooth.', date: '2023-10-01' }
        ]
    },
    {
        id: '14',
        name: 'Call of Duty: Modern Warfare III',
        description: 'Adapt or die in a fight against the ultimate threat.',
        price: 5599,
        image: '/images/products/mw3.jpg', // Adjusted to Generic Gaming
        rating: 4.2,
        category: 'game',
        platform: 'PC / Console',
        genre: 'FPS',
        reviews: [
            { id: 'r15', user: 'ShooterPro', rating: 3, comment: 'Campaign was short but multiplayer is fun.', date: '2023-11-20' }
        ]
    },
    {
        id: '15',
        name: 'Assassin\'s Creed Mirage',
        description: 'Experience the story of Basim, a cunning street thief seeking answers.',
        price: 3499,
        image: '/images/products/ac-mirage.jpg', // Adjusted
        rating: 4.6,
        category: 'game',
        platform: 'PC / Console',
        genre: 'Action',
        reviews: [
            { id: 'r16', user: 'HistoryBuffer', rating: 5, comment: 'Back to the roots of AC. Loved it.', date: '2023-11-10' }
        ]
    },
    // More Hot Deals
    {
        id: '16',
        name: 'Console Starter Bundle',
        description: 'Next-Gen Console + Extra Controller + 3 Months Game Pass.',
        price: 49999,
        image: '/images/products/console-bundle.jpg', // PS5 controller image
        rating: 4.9,
        category: 'deals',
        brand: 'Xbox/PS5',
        specs: {
            'Type': 'Console',
            'Bonus': 'Game Pass'
        },
        reviews: [
            { id: 'r17', user: 'GamerDad', rating: 5, comment: 'Amazing value for the holidays.', date: '2023-12-25' }
        ],
        originalPrice: 55000
    },
    {
        id: '17',
        name: 'PC Builder Kit (Mid-Range)',
        description: 'CPU, Motherboard, and RAM combo for starting a solid build.',
        price: 35000,
        image: '/images/products/pc-builder-kit.jpg', // GPU/Hardware image
        rating: 4.7,
        category: 'deals',
        brand: 'Intel/AMD',
        specs: {
            'CPU': 'i5/Ryzen 5',
            'RAM': '32GB DDR5'
        },
        reviews: [
            { id: 'r18', user: 'BuilderBob', rating: 4, comment: 'Great starting point for a budget build.', date: '2024-01-15' }
        ],
        originalPrice: 42000
    },
    {
        id: '18',
        name: 'Gamer Accessorize Pack',
        description: 'RGB Mousepad, Headset Stand, and Cable Management Kit.',
        price: 2999,
        image: '/images/products/accessories-pack.jpg', // Keyboard/RGB image
        rating: 4.4,
        category: 'deals',
        brand: 'Generic',
        specs: {
            'Items': '3 pcs',
            'RGB': 'Yes'
        },
        reviews: [
            { id: 'r19', user: 'RGBFaan', rating: 5, comment: 'More RGB = More FPS. Love it.', date: '2024-02-10' }
        ],
        originalPrice: 4500
    },
    // --- NEW ARRIVALS: HARDWARE (2 New) ---
    {
        id: '19',
        name: 'ASUS ROG Swift OLED 27"',
        description: '1440p 240Hz OLED Gaming Monitor. The endgame for competitive immersive gaming.',
        price: 84999,
        image: '/images/products/rog-oled.jpg',
        rating: 5.0,
        category: 'hardware',
        brand: 'ASUS',
        specs: {
            'Panel': 'OLED',
            'Refresh': '240Hz'
        },
        reviews: [],
        isNew: true
    },
    {
        id: '20',
        name: 'Corsair Dominator Titanium 64GB',
        description: 'DDR5 6000MHz Memory Kit for extreme overclocking performance.',
        price: 28999,
        image: '/images/products/corsair-ram.jpg',
        rating: 4.8,
        category: 'hardware',
        brand: 'Corsair',
        specs: {
            'Speed': '6000MHz',
            'Type': 'DDR5'
        },
        reviews: [],
        isNew: true
    },
    // --- NEW ARRIVALS: GAMES (3 Items, 1 New) ---
    {
        id: '21',
        name: 'Starfield',
        description: 'In this next generation RPG set amongst the stars, create any character you want and explore with unparalleled freedom.',
        price: 4999,
        image: '/images/products/starfield.jpg',
        rating: 4.5,
        category: 'game',
        platform: 'PC / Xbox',
        genre: 'RPG',
        reviews: [],
        isNew: true
    },
    {
        id: '22',
        name: 'Final Fantasy XVI',
        description: 'An epic dark fantasy action RPG where the fate of the land is decided by the Eikons and the Dominants who wield them.',
        price: 5499,
        image: '/images/products/ff16.jpg',
        rating: 4.8,
        category: 'game',
        platform: 'PS5',
        genre: 'Action RPG',
        reviews: []
    },
    {
        id: '23',
        name: 'Diablo IV',
        description: 'The endless battle between the High Heavens and the Burning Hells continues.',
        price: 5999,
        image: '/images/products/diablo4.jpg',
        rating: 4.6,
        category: 'game',
        platform: 'Top 3',
        genre: 'ARPG',
        reviews: []
    },
    // --- NEW ARRIVALS: DEALS (1 New) ---
    {
        id: '24',
        name: 'Elgato Stream Deck MK.2',
        description: '15 LCD keys, fully customizable. The ultimate interface for your setup.',
        price: 13999,
        image: '/images/products/stream-deck.jpg',
        rating: 4.9,
        category: 'deals',
        brand: 'Elgato',
        specs: {
            'Keys': '15 LCD',
            'Custom': 'Yes'
        },
        reviews: [],
        originalPrice: 16999,
        isNew: true
    }
];

export const productService = {
    getProducts: async (): Promise<Product[]> => {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_PRODUCTS);
            }, 500);
        });
    },

    getProductById: async (id: string): Promise<Product | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_PRODUCTS.find(p => p.id === id));
            }, 300);
        });
    },

    getProductsByCategory: async (category: 'hardware' | 'game' | 'deals'): Promise<Product[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_PRODUCTS.filter(p => p.category === category));
            }, 400);
        });
    }
};
