const loader = document.querySelector(".loader")

function show() {
    loader.style.display = "flex";

    const data = JSON.parse(localStorage.getItem('cartData')) || []
    // console.log(data);

    let result = ""
    data.map((product, index) => {
        result += `
                        <div class="col">
                    <div class="card shadow-lg border-0">
                        <!-- Product Image -->
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">

                        <div class="card-body d-flex flex-column justify-content-between">
                            <!-- Product Title -->
                            <h5 class="card-title text-truncate mb-2" title="${product.title}">
                                ${product.title}
                            </h5>

                            <!-- Product Description -->
                            <p class="card-text text-truncate mb-3" title="${product.description}">
                                ${product.description}
                            </p>

                            <!-- Price and Stock Badge -->
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <span class="price-tag">$${product.price}</span>
                                 <span class="badge bg-primary">Quantity <span class="quantityCount"></span></span>
                            </div>

                            <!-- Updated Details Button -->
                            <button
                                class="btn btn-outline-info btn-sm btn-custom w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
                                onclick="handleDescription(${index})">
                                <i class="fas fa-info-circle"></i> View Details
                            </button>

                            <!-- Remove Button -->
                            <button
                                class="btn btn-outline-danger btn-sm btn-custom w-100 d-flex align-items-center justify-content-center gap-2"
                                onclick="handleRemove(${index})">
                                <i class="fas fa-trash-alt"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
                    `;
    });

    document.querySelector(".row2").innerHTML = result;
    // console.log(data);
    loader.style.display = "none";
}

show()

function handleRemove(id) {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const removedData = JSON.parse(localStorage.getItem("removedData")) || []
    removedData.push(cartData[id])
    localStorage.setItem("removedData", JSON.stringify(removedData))
    cartData.splice(id, 1)
    showAlert("error", "Product removed")

    localStorage.setItem("cartData", JSON.stringify(cartData))
    totalPrice()
    show()
}

function totalPrice() {
    const data = JSON.parse(localStorage.getItem('cartData')) || []
    var totalPrice = 0
    data.map((product) => {
        totalPrice += parseFloat(product.price)
    })
    document.querySelector(".row3").innerHTML = `
             <div class="container d-flex justify-content-between align-items-center py-4 border-top mt-4">
                    <!-- Total Price Section -->
                    <h2 class="total-price mb-0">
                        <span class="text-muted">Total:</span>
                        <span class="text-success fw-bold">$${totalPrice.toFixed(2)}</span>
                    </h2>

                    <!-- Buy Now Button -->
                    <button class="btn btn-checkout d-flex align-items-center gap-2">
                        <i class="fas fa-credit-card fs-6"></i>
                        Checkout
                    </button>
                </div>
                
                `
}

totalPrice()

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

function loginCheck() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const authButtons = document.getElementById("auth-buttons")

    // console.log(currentUser);
    if (currentUser.length > 0) {
        authButtons.style.display = "none"
    } else {
        authButtons.style.display = "flex"
    }

}
loginCheck()

function showAlert(type, message) {
    const alertBox = document.getElementById("custom-alert");
    const alertInnerBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");
    const alertIcon = document.getElementById("alert-icon");

    // Define alert types with SVG icons and colors
    const types = {
        success: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                </svg>`,
            backgroundColor: "#22c55e"
        },
        error: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12" y2="16" />
                </svg>`,
            backgroundColor: "#ef4444"
        },
        warning: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 9v2m0 4h.01" />
                    <path d="M5.05 19h13.9a2 2 0 0 0 1.732-1l6.5-11a2 2 0 0 0-1.732-3H5.05a2 2 0 0 0-1.732 3l6.5 11a2 2 0 0 0 1.732 1z" />
                </svg>`,
            backgroundColor: "#f59e0b"
        },
        info: {
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="16" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                </svg>`,
            backgroundColor: "#3b82f6"
        }
    };

    // Apply alert type styles
    alertMessage.innerText = message;
    alertIcon.innerHTML = types[type].icon;
    alertInnerBox.style.backgroundColor = types[type].backgroundColor;

    // Show alert with animation
    alertBox.classList.remove("hidden");
    alertInnerBox.classList.add("show-alert");

    // Auto close after 3.5 seconds
    setTimeout(closeAlert, 3500);
}

// Close alert with animation
function closeAlert() {
    const alertBox = document.getElementById("custom-alert");
    const alertInnerBox = document.getElementById("alert-box");

    // Hide with animation
    alertInnerBox.classList.remove("show-alert");
    alertInnerBox.classList.add("hide-alert");

    // Wait for animation to complete before hiding
    setTimeout(() => {
        alertBox.classList.add("hidden");
        alertInnerBox.classList.remove("hide-alert");
    }, 300);
}