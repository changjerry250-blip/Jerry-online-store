const products = [
    { id: 1, name: "Dried Mango", price: 30, img: "https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/944219dac4912bf5-ZOSn836E-zoom.jpg" },
    { id: 2, name: "Instant Noodle", price: 50, img: "https://i5.walmartimages.com/asr/6d05dac7-1656-4b3a-8802-23c81616db5e.42e1f9b4f3bc03f29471750f4880d41d.jpeg" },
    { id: 3, name: "Chips", price: 40, img: "https://cms.lays.com/sites/lays.com/files//2025-12/Lays_XL_Classic_Laydown.png" },
    { id: 4, name: "Coke Cola", price: 25, img: "https://theheavenlycoffeecompany.co.uk/cdn/shop/products/CDTJCCC_PXYCx_pJU.jpg?v=1706114823" },
    { id: 5, name: "Black Tea", price: 60, img: "https://rs.joo.com.tw/website/uploads_product/website_1234/P0123400273993_3_1608122.jpeg?_15471" },
    { id: 6, name: "Orange Juice", price: 60, img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Orangejuice.jpg" }
];

let cart = {};

function renderProducts(items) {
    const list = document.getElementById('product-list');
    list.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price} NTD</p>
            <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (cart[id]) {
        cart[id].qty += 1;
    } else {
        cart[id] = { ...product, qty: 1 };
    }
    updateUI();
}

function changeQty(id, delta) {
    if (cart[id]) {
        cart[id].qty += delta;
        if (cart[id].qty <= 0) delete cart[id];
    }
    updateUI();
}

function updateUI() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('total-price');
    container.innerHTML = '';
    
    let total = 0;
    const items = Object.values(cart);

    if (items.length === 0) {
        container.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        items.forEach(item => {
            total += item.price * item.qty;
            container.innerHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>${item.price} NTD</small>
                    </div>
                    <div class="qty-controls">
                        <button onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
        });
    }
    totalEl.textContent = total;
}

function clearCart() {
    cart = {};
    updateUI();
}

// Modal Controls
function openCheckout() {
    if (Object.keys(cart).length === 0) return alert("Add items first!");
    document.getElementById('checkout-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function processOrder() {
    const email = document.getElementById('customer-email').value;
    const payMethod = document.getElementById('payment-method').value;
    const total = document.getElementById('total-price').textContent;

    if (!email.includes('@')) return alert("Please enter a valid email!");

    alert(`Order for Big J Received!\nReceipt: ${email}\nTotal: ${total} NTD\nMethod: ${payMethod}`);
    clearCart();
    closeModal();
}

// Initial Load
renderProducts(products);
