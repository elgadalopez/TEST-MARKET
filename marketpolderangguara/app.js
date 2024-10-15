let cartData = []
let cartInit = 0

let products = [
    {
        id: 1,
        products_name: 'Sport Car BMW Magetan',
        type: 'Sport Car',
        description: 'Sport Car From Magetan ',
        stock: 6,
        price: 2500000000,
        img_url: 'images/product-7.jpeg'
    },
    {
        id: 2,
        products_name: 'Sport Car Lambolotek',
        type: 'Sport Car',
        description: 'Sport Car From Bandung',
        stock: 4,
        price: 3500000000,
        img_url: 'images/product-10.jpeg'
    },
    {
        id: 3,
        products_name: 'Sport Car Toyota Supri',
        type: 'Sport Car',
        description: 'Sport Car From Inhoftank',
        stock: 10,
        price: 1500000000,
        img_url: 'images/product-6.jpeg'
    },
]

const productsId = document.getElementById('products')
const cart = document.getElementById("cart")
const detailOrders = document.getElementById("detail-orders")
const listOrders = document.getElementById("list-orders")
const cartDetailOrdersView = document.getElementById('cart-detail-orders-view')

cartDetailOrdersView.addEventListener('click', function () {
    console.log('cart di pencet')
    let total = 0

    productsId.classList.add("d-none")
    detailOrders.classList.remove("d-none")
    if (cartData.length === 0) {
        listOrders.innerHTML = `<h1 class="text-danger text-center">Product Has Not added to cart!</h1>`
        return
    }00

    const listOrdersNew = cartData?.map((c, _, i) => {
        total += c.stock * c.price
        return `<div class="col-lg-12">
                <div class="card my-2">
                    <div class="d-flex justify-content-between p-4">
                        <img src="${c.img_url}" class="card-img-top" alt="..." style="width: 100px"/>
                        <div>
                        <h5 class="card-title">
                                Product Name: ${c.products_name}
                                </h5>
                                <p class="card-text">Qty: ${c.stock}</p>
                        </div>
                        <div>
                                <h6 class="card-title">Price: ${rupiah(c.price)}</h6>
                                <p class="card-text">SubTotal:  ${rupiah(c.stock * c.price)}</p>
                                <button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            ${_ === (i.length - 1) ? `
            <div class="col-lg-12">
                <div class="card my-2">
                    <div class="d-flex justify-content-between p-4">
                        <h5 class="card-title">
                                Total
                        </h5>
                        <h5 class="card-title">
                                ${rupiah(total)}
                        </h5>
                    </div>
                </div>
            </div>`: ''
            }
            
            `
    }).join(",").replaceAll(",", " ")

    listOrders.innerHTML = listOrdersNew
})

const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

function backToListProduct() {
    productsId.classList.remove("d-none")
    detailOrders.classList.add("d-none")
}

const listProduct = products?.map((product) => `<div class="col-lg-4">
                <div class="card" style="width: 18rem;">
                    <img src="${product.img_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.products_name}</h5>
                        <h6 class="card-title">Price: ${rupiah(product.price)}</h6>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Stock: ${product.stock}</p>
                        <button type="button" class="btn btn-success" onclick="addToCart(${product.id})">Add To Chart</button>
                    </div>
                </div>
            </div>`).join(",").replaceAll(",", " ")

productsId.innerHTML = listProduct
cart.innerHTML = cartInit

function addToCart(id) {
    // check stock masih ada
    const stockZero = products?.filter(product => product.id === id).some(data => data.stock === 0)

    if (stockZero) {
        swal({
            title: "Stock habis!",
            text: "Produk ini sudah dipindahkan kedalam keranjang semua / kosong!",
            icon: "warning",
        });
        return
    }

    let filterBarang = products?.filter(product => product.id === id).map(newProductItem => ({
        ...newProductItem,
        stock: 1
    }))

    stockOfCart(filterBarang, id)
    updateChartStock(id)
}

function updateChartStock(id) {
    let newTotalProduct = products.map(p => {
        if (p.id === id) {
            return {
                ...p,
                stock: p.stock - 1
            }
        }
        return {
            ...p
        }
    })

    products = newTotalProduct

    const listProductNew = products?.map((product) => `<div class="col-lg-4">
                <div class="card" style="width: 18rem;">
                    <img src="${product.img_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.products_name}</h5>
                        <h6 class="card-title">Price: ${rupiah(product.price)}</h6>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Stock: ${product.stock}</p>
                        <button type="button" class="btn btn-success" onclick="addToCart(${product.id})">Add To Chart</button>
                    </div>
                </div>
            </div>`).join(",").replaceAll(",", " ")

    productsId.innerHTML = listProductNew

}

function stockOfCart(filterBarang, id) {
    const isAvailable = cartData.some(data => data.id === id)
    cartInit++
    cart.innerHTML = cartInit;

    if (isAvailable) {
        cartData.map(c => ({
            ...c,
            stock: c?.id === id ? c.stock++ : c.stock
        }))

        return
    }
    let newCartData = cartData.length === 0 ? filterBarang : filterBarang.concat(cartData)
    cartData = newCartData
}
