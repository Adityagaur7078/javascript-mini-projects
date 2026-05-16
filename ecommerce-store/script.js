const products = [
    { id: 1, name: 'iPhone 15', category: 'phones', price: 999, emoji: '📱' },
    { id: 2, name: 'Samsung Galaxy', category: 'phones', price: 899, emoji: '📱' },
    { id: 3, name: 'MacBook Pro', category: 'laptops', price: 1999, emoji: '💻' },
    { id: 4, name: 'Dell XPS', category: 'laptops', price: 1299, emoji: '💻' },
    { id: 5, name: 'AirPods Pro', category: 'accessories', price: 249, emoji: '🎧' },
    { id: 6, name: 'USB-C Cable', category: 'accessories', price: 19, emoji: '🔌' },
    { id: 7, name: 'iPad Air', category: 'phones', price: 599, emoji: '📱' },
    { id: 8, name: 'Magic Mouse', category: 'accessories', price: 79, emoji: '🖱️' },
    { id: 9, name: 'ASUS VivoBook', category: 'laptops', price: 749, emoji: '💻' },
    { id: 10, name: 'Pixel Phone', category: 'phones', price: 799, emoji: '📱' },
    { id: 11, name: 'Phone Case', category: 'accessories', price: 29, emoji: '📦' },
    { id: 12, name: 'Lenovo ThinkPad', category: 'laptops', price: 899, emoji: '💻' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedFilters = [];

const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const resetFilter = document.getElementById('resetFilter');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');

cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartModal);
priceRange.addEventListener('input', handlePriceChange);
resetFilter.addEventListener('click', resetFilters);

categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCategoryChange);
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCartModal();
});

function handleCategoryChange() {
    selectedFilters = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    if (selectedFilters.includes('all')) {
        selectedFilters = [];
    }

    displayProducts();
}

function handlePriceChange() {
    priceValue.textContent = priceRange.value;
    displayProducts();
}

function resetFilters() {
    categoryCheckboxes.forEach(cb => cb.checked = cb.value === 'all');
    priceRange.value = 2000;
    priceValue.textContent = 2000;
    selectedFilters = [];
    displayProducts();
}

function displayProducts() {
    const maxPrice = parseInt(priceRange.value);

    const filtered = products.filter(product => {
        const categoryMatch = selectedFilters.length === 0 || selectedFilters.includes(product.category);
        const priceMatch = product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });

    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">⭐⭐⭐⭐⭐</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cartCount').textContent = cart.length;
    displayCartItems();
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
        document.getElementById('totalPrice').textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    document.getElementById('totalPrice').textContent = total;
}

function openCart() {
    cartModal.classList.add('show');
}

function closeCartModal() {
    cartModal.classList.remove('show');
}

displayProducts();
updateCart();
