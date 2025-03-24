const url = 'https://dummyjson.com/products'
const row2 = document.querySelector(".row2")
const addToCart = document.querySelector(".btn-primary")
const loader = document.querySelector(".loader")
const datafn = async function () {
    try {
        loader.style.display = "flex";
        JSON.parse(localStorage.getItem("productData")) || []
        const result = await fetch(url)
        // console.log(result);
        const data = await result.json()
        const productData = data.products
        console.log(productData);

        // console.log(data);
        localStorage.setItem("productData", JSON.stringify(productData))
        show()
        loader.style.display = "none";
    } catch (error) {
        console.log(error);
    }
}
datafn()

function show() {
    const data = JSON.parse(localStorage.getItem("productData"))
    let result = ""
    data.map((product, index) => {
        result += `
        <div class="col">
            <div class="card shadow-lg border-0">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-truncate" title="${product.title}">${product.title}</h5>
                    <p class="card-text text-truncate" title="${product.description}">${product.description}</p>
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <span class="price-tag">$${product.price}</span>
                        <span class="badge bg-primary">In Stock</span>
                    </div>
                    <div class="d-flex gap-2 modal-body">
                        <button class="btn btn-outline-success btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1" onclick="handleCart(${index})">
                            <i class="fas fa-cart-plus"></i> Add
                        </button>
                 
                        <button type="button" class="btn btn-outline-info btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1" onclick="handleDescription(${index})" >
                            <i class="fas fa-info-circle"></i> Details
                        </button>            
                    </div>
                </div>
            </div>
        </div>
            `;
    });
    document.querySelector(".row2").innerHTML = result;
    // console.log(data);
}

function handleCart(id) {
    const data = JSON.parse(localStorage.getItem('productData'))
    const cartData = JSON.parse(localStorage.getItem("cartData")) || []
    cartData.push(data[id])
    localStorage.setItem("cartData", JSON.stringify(cartData))

    updateCartCount()
    alert("Product added to cart")
    // console.log(cartData);
}

function handleDescription(id) {
    const data = JSON.parse(localStorage.getItem("productData"));
    const product = data[id];

    // Populate modal with product details
    document.getElementById("modalProductImage").src = product.thumbnail;
    document.getElementById("modalProductTitle").textContent = product.title;
    document.getElementById("modalProductDescription").textContent = product.description;
    document.getElementById("modalProductPrice").textContent = `$${product.price}`;
    document.getElementById("modalProductRating").textContent = `${product.rating} / 5`;
    document.getElementById("modalProductWarranty").textContent = product.warranty || "1 Year Warranty";
    document.getElementById("modalProductDiscount").textContent = `${product.discountPercentage}% Off`;
    document.getElementById("modalProductReturnPolicy").textContent = product.returnPolicy || "30 Days Return Policy";

    // Handle Add to Cart button
    const addToCartButton = document.getElementById("modalAddToCart");
    addToCartButton.onclick = () => handleCart(id);

    // Handle Buy Now button
    const buyNowButton = document.getElementById("modalBuyNow");
    buyNowButton.onclick = () => {
        alert("Redirecting to checkout...");
    };

    const productModal = new bootstrap.Modal(document.getElementById("productModal"));
    productModal.show();
}

// Function to update cart count
function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    const cartData = JSON.parse(localStorage.getItem("cartData"))
    let itemCount;
    itemCount = cartData.length;

    if (cartData == null || itemCount === 0) {
        cartCountElement.style.display = "none";
    } else {
        cartCountElement.textContent = itemCount;
        cartCountElement.style.display = "flex";
    }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

window.onload = function () {
    datafn();
};

