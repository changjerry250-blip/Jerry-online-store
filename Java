const products = [
    { name: "Dried Mango", price: 30, image: "https://www.luvele.de/blogs/recipe-blog/how-to-dry-mango-in-a-food-dehydrator?srsltid=AfmBOooihz1yNDo00kakt-j3DdN0TaX6wSTFe-IlrqhOCXhLqKT1FRsl" },
    { name: "Instant Noodle", price: 50, image: "https://www.walmart.com/ip/Nissin-Foods-Top-Ramen-Chicken-Flavor-Cup-Noodles-Chicken-2-25-Oz-12-Carton/1628842946" },
    { name: "Chips", price: 40, image: "https://www.lays.com/recipes/lays-cheddar-and-chive-mashed-potatoes" },
    { name: "Coke Cola", price: 25, image: "https://www.istockphoto.com/hk/%E5%9C%96%E7%89%87/coke-can" },
    { name: "Black Tea", price: 60, image: "https://www.joo.com.tw/service026/index.php?action=product_detail&prod_no=P0123400273993" },
    { name: "Orange Juice", price: 60, image: "https://www.healthline.com/nutrition/orange-juice" }
];

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
