const url = "https://fakestoreapi.com/products"
const row2 = document.querySelector(".row2")
const addToCart = document.querySelector(".btn-primary")

const datafn = async function () {
    try {
        JSON.parse(localStorage.getItem("productData")) || []

        const result = await fetch(url)
        // console.log(result);
        const data = await result.json()
        // console.log(data);
        localStorage.setItem("productData", JSON.stringify(data))

        function show() {
            const data = JSON.parse(localStorage.getItem("productData"))
            let result = ""
            data.map((product, index) => {
                result += `
                <div class="col">
                    <div class="card shadow-lg border-0">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title text-truncate" title="${product.title}">${product.title}</h5>
                            <p class="card-text text-truncate" title="${product.description}">${product.description}</p>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <span class="price-tag">$${product.price}</span>
                                <span class="badge bg-primary">In Stock</span>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-success btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1" onclick="handleCart(${index})">
                                    <i class="fas fa-cart-plus"></i> Add
                                </button>
                                <button class="btn btn-outline-info btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1" onclick="handleDescription(${index})">
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

        show()
    } catch (error) {
        console.log(error);
    }
}
datafn()


function handleCart(id) {
    const data = JSON.parse(localStorage.getItem('productData'))
    const cartData = JSON.parse(localStorage.getItem("cartData")) || []
    cartData.push(data[id])
    localStorage.setItem("cartData", JSON.stringify(cartData))

    // console.log(cartData);
}

function handleDescription(id) {
    console.log(id);
}

// Function to update cart count
function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    const cartData = JSON.parse(localStorage.getItem("cartData"))
    // Set the count from the length of the array
    let itemCount = cartData.length;

    if (itemCount > 0) {
        cartCountElement.textContent = itemCount; // Update count
        cartCountElement.style.display = "flex"; // Show badge if items exist
    } else {
        cartCountElement.style.display = "none"; // Hide badge if cart is empty
    }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);
