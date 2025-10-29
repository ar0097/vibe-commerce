const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());



let products = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 129.99,
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 299.99,
        description: 'Advanced fitness tracking and notifications on your wrist',
    },
    {
        id: '3',
        name: 'Leather Backpack',
        price: 89.99,
        description: 'Durable leather backpack with laptop compartment',
    },
    {
        id: '4',
        name: 'Bluetooth Speaker',
        price: 79.99,
        description: 'Portable waterproof speaker with 360° sound',
    },
    {
        id: '5',
        name: 'Designer Sunglasses',
        price: 159.99,
        description: 'UV protection polarized sunglasses with premium frame',
    },
    {
        id: '6',
        name: 'Premium Phone Case',
        price: 39.99,
        description: 'Military-grade protection with sleek design',
    },
];

let cart = [];

const calculateTotal = () => {
    return cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);
};


app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/cart", (req, res) => {
    const detailedCart = cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
            id: item.id,
            productId: item.productId,
            name: product?.name,
            price: product?.price,
            qty: item.qty,
            subtotal: product?.price * item.qty,
        };
    });

    res.json({
        items: detailedCart,
        total: calculateTotal(),
    });
});

app.post("/api/cart", (req, res) => {
    const { productId, qty } = req.body;
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        const newItem = {
            id: cart.length + 1,
            productId,
            qty,
        };
        cart.push(newItem);
    }

    res.status(201).json({ message: "Item added to cart", cart });
});

app.delete("/api/cart/:id", (req, res) => {
    const id = parseInt(req.params.id);
    cart = cart.filter((item) => item.id !== id);
    res.json({ message: "Item removed", cart });
});

app.post("/api/checkout", (req, res) => {
    const { cartItems } = req.body;
    const total = calculateTotal();

    const receipt = {
        orderId: Math.floor(Math.random() * 100000),
        items: cartItems,
        total,
        timestamp: new Date().toISOString(),
    };

    cart = [];

    res.json({ message: "Checkout successful", receipt });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
