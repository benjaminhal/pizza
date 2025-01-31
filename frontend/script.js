let cart = [];

function addToCart(pizza, price) {
    cart.push({ pizza, price });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        cartList.innerHTML += `<li>${item.pizza} - ${item.price}€ <button onclick="removeFromCart(${index})">❌</button></li>`;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('pay-btn').addEventListener('click', async () => {
    if (cart.length === 0) {
        alert("Panier vide !");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const res = await fetch('http://localhost:5000/pay', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, orderId: "testOrder123" })
    });

    const data = await res.json();
    window.location.href = `https://checkout.stripe.com/pay/${data.clientSecret}`;
});
