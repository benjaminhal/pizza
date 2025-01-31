const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')('TA_CLE_STRIPE_SECRET'); // Clé Stripe secrète

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/pizzaDB', { 
    useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

// Modèle de commande
const Order = mongoose.model('Order', {
    name: String,
    email: String,
    address: String,
    pizza: String,
    price: Number,
    paymentStatus: String
});

// Route pour commander une pizza
app.post('/order', async (req, res) => {
    const { name, email, address, pizza, price } = req.body;
    try {
        const newOrder = new Order({ name, email, address, pizza, price, paymentStatus: 'pending' });
        await newOrder.save();
        res.status(201).json({ message: "Commande enregistrée", orderId: newOrder._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour le paiement
app.post('/pay', async (req, res) => {
    const { amount, orderId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe utilise les centimes
            currency: 'eur'
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lancer le serveur
app.listen(5000, () => console.log("Serveur en ligne sur http://localhost:5000"));
