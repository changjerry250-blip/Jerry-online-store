const products = [
    { 
        name: "Dried Mango", 
        price: 30, 
        image: "https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/944219dac4912bf5-ZOSn836E-zoom.jpg" 
    },
    { 
        name: "Instant Noodle", 
        price: 50, 
        image: "https://i5.walmartimages.com/asr/6d05dac7-1656-4b3a-8802-23c81616db5e.42e1f9b4f3bc03f29471750f4880d41d.jpeg" 
    },
    { 
        name: "Chips", 
        price: 40, 
        image: "https://cms.lays.com/sites/lays.com/files//2025-12/Lays_XL_Classic_Laydown.png" 
    },
    { 
        name: "Coke Cola", 
        price: 25, 
        image: "https://theheavenlycoffeecompany.co.uk/cdn/shop/products/CDTJCCC_PXYCx_pJU.jpg?v=1706114823" 
    },
    { 
        name: "Black Tea", 
        price: 60, 
        image: "https://rs.joo.com.tw/website/uploads_product/website_1234/P0123400273993_3_1608122.jpeg?_15471" 
    },
    { 
        name: "Orange Juice", 
        price: 60, 
        image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Orangejuice.jpg" 
    }
];

// The rest of your functions (displayProducts, addToCart, etc.) remain the same!

let cart = [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} NTD</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} NTD`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalDisplay.textContent = total;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Thank you for shopping at Big J! Total: ${document.getElementById('total-price').textContent} NTD`);
        cart = [];
        updateCart();
    }
}

// Initialize the store
displayProducts();
