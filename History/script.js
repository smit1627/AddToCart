const loader = document.querySelector(".loader")

function show() {
    loader.style.display = "flex";
    const removedData = JSON.parse(localStorage.getItem('removedData'))
    let result = ""
    removedData.map((product, index) => {
        result += `
                        <div class="col">
                    <div class="card shadow-lg border-0">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">

                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title text-truncate" title="${product.title}">
                                ${product.title}
                            </h5>
                            <p class="card-text text-truncate" title="${product.description}">
                                ${product.description}
                            </p>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <span class="price-tag">$${product.price}</span>
                                <span class="badge">In Stock</span>
                            </div>
                            <div class="d-flex gap-2">
                                <button
                                    class="btn btn-outline-success btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1"
                                    onclick="handleCart(${index})">
                                    <i class="fas fa-cart-plus"></i> Add
                                </button>
                                <button
                                    class="btn btn-outline-info btn-sm btn-custom w-50 d-flex align-items-center justify-content-center gap-1"
                                    onclick="handleDescription(${index})">
                                    <i class="fas fa-info-circle"></i> Details
                                </button>
                            </div>
                            <button
                                class="btn btn-outline-danger btn-sm btn-custom mt-2 w-100 d-flex align-items-center justify-content-center gap-1"
                                onclick="handlePermanentRemove(${index})">
                                <i class="fas fa-trash"></i> Permanently Remove
                            </button>
                        </div>
                    </div>
                </div>
                    `;
    });
    document.querySelector(".row2").innerHTML = result;
    loader.style.display = "none";
}

show()

function handlePermanentRemove(id) {
    console.log(id);
    const removedData = JSON.parse(localStorage.getItem("removedData"))
    removedData.splice(id, 1)
    localStorage.setItem("removedData", JSON.stringify(removedData))
    show()
    location.reload()
}

function handleCart(id) {
    const removedData = JSON.parse(localStorage.getItem("removedData"))
    const cartData = JSON.parse(localStorage.getItem("cartData")) || []
    cartData.push(removedData[id])
    localStorage.setItem("cartData", JSON.stringify(cartData))
    removedData.splice(id, 1)
    localStorage.setItem("removedData", JSON.stringify(removedData))
    show()
    location.reload()
}