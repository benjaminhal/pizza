let currentIndex = 0;
const cartItems = [];
const cartList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Fonction pour ajouter une pizza au panier
function addToCart(pizzaName, price) {
    cartItems.push({ name: pizzaName, price: price });
    renderCart();
}

// Fonction pour afficher le panier
function renderCart() {
    cartList.innerHTML = ''; // Vider le panier avant de le réafficher

    let totalPrice = 0;
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}€`;
        cartList.appendChild(li);
        totalPrice += parseFloat(item.price);
    });

    totalPriceElement.textContent = `${totalPrice.toFixed(2)}€`;
}

// Ajouter un exemple de pizza au panier lorsque l'utilisateur clique
document.querySelectorAll('.carousel-item button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const pizzaName = button.parentElement.querySelector('h3').textContent;
        const pizzaPrice = button.parentElement.querySelector('.price').textContent.replace('€', '');
        addToCart(pizzaName, pizzaPrice);
    });
});

// Fonction pour faire défiler les images du carrousel
function moveSlide(direction) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    currentIndex = (currentIndex + direction + totalItems) % totalItems;

    const container = document.querySelector('.carousel-container');
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
}
