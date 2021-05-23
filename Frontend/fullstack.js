if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
} else {
    ready()
}

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

/*IMPORTERER JQUERY*/
function ready(){
    //Loads when the page loads, every buttons function is ready to go
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('clear-items-button')[0].addEventListener('click', clearCart)
    document.getElementsByClassName('checkout-button')[0].addEventListener('click', proceedToCheckout)
    
    var removeProductButtons = document.getElementsByClassName('remove-product-button')
    for(var i = 0; i <removeProductButtons.length; i++){
        var button = removeProductButtons[i]
        button.addEventListener('click', RemoveItem)
    }

    document.getElementsByClassName('add-product-button')[0].addEventListener('click', createProductButton)
    document.getElementsByClassName('admin-button')[0].addEventListener('click', loginAdmin)

    const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach( modal => {
        closeModal(modal) 
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

}

var productArray = []

//Constructor for Product
function Product(productid, productname, productprice, productquantity, productdescription, productImgSource){
    this.productid = productid
    this.productname = productname
    this.productprice = productprice
    this.productquantity = productquantity
    this.productdescription = productdescription
    this.productImgSource = productImgSource
}

function Product(productname, productprice, productquantity, productdescription, productImgSource){
    this.productname = productname
    this.productprice = productprice
    this.productquantity = productquantity
    this.productdescription = productdescription
    this.productImgSource = productImgSource
}


function addToCartClicked(event){
    /* 
    Button function for adding item to cart. Pure javascript, not in contact with backend
    */
    var button = event.target
    var productin = button.parentElement /* finner diven til produktet som knappen finner seg i*/
    var productname = productin.getElementsByClassName('productname')[0].innerText
    var productprice = productin.getElementsByClassName('productprice')[0].innerText
    var productquantity = productin.getElementsByClassName('quantity')[0].value
    console.log(productname, productprice, productquantity)
    var price = parseFloat(productprice)
    var quantity = parseFloat(productquantity)
    const product ={
        productname: productname,
        productprice: price,
        productquantity: quantity
    }
    let sum= product.productprice * product.productquantity
    addItemToCart(productname, productquantity, sum)
    sumCart()
}



// Function to give more pictures/information about a product(get from database)
function showMoreInformation() {
    console.log('About to fetch information about a product');
    fetch('http://127.0.0.1:5000/webshop/products/get/<product_id>').then(response => {
            console.log(response);
            return response.json();
        }).then(json => {
            console.log(json);
            document.getElementById('')
        });
}

function addItemToCart(productname, productquantity, sum) {
    //Function for adding item to cart
    var cartLinje = document.createElement('div')
    cartLinje.classList.add('cart-row')
    var cartitems = document.getElementsByClassName('list-of-items')[0]  
    var ut = '<span class="product-name-table">'+productname+'</span>    <span class="product-quantity-table">'+productquantity+'</span>    <span class="product-sum-table">'+sum+'</span>'
    cartLinje.innerHTML = ut
    cartitems.append(cartLinje)
    
}




function createProductButton(event){
    /*
    Function for when pressing the create product button, dialouge windows will appear,
    they have defaults as well, for when the user dont give you any input
    Creates a new product with these input
    sending these to various methods such as sending it to the database and adding it to the html
    */
   if(event){
       var productname = prompt("Please enter a product","Grapes")
       var price = prompt("Please enter a price",400)
       var quantity = prompt("Please enter a quantity",20)
       var description = prompt("Please enter description: ","Grapesaredelicious")
       var picturesrc = prompt("Please enter an Image source of the product","https://image.sciencenorway.no/1438480.jpg?imageId=1438480&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630" )
   }

   newProduct = new Product(productname, price, quantity, description, picturesrc)

   addProduct(newProduct)
   postProductToDB(newProduct)
   ready()
}

function postProductToDB(newProduct) {
    // sends the product that we create in createProductButton to the server.py through the api
    //Using fetch 
    const data = newProduct
    fetch(`/webshop/add/${newProduct.productname}/${newProduct.productprice}/${newProduct.productquantity}
    /${newProduct.description}/${newProduct.picturesrc}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json; charset=UTF-8",
        }
      
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('error:', error);
    });
}

/*function deleteProductFromDB(id) {
    fetch(`/webshop/delete/${id}`), {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
            "Content-Type" : "application/json; charset=UTF-8",
        }
    }
    .then(response => response.json())
    .then(json => console.log(json))
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('error:', error);
    });
}

function getProductIdFromDB(name) {
    fetch(`/webshop/getId/${name}`)
        .then(response => response.json())
        .then(data => deleteProductFromDB(data))
}*/
function deleteProductFromDB(name) {
    //Our try of an deletemethod through fetch
    fetch(`/webshop/delete/${name}`, {
        method: "DELETE",
        body: JSON.stringify(name),
        headers: {
            "Content-Type" : "application/json; charset=UTF-8",
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('error:', error);
    });
}

function addProduct(Product){
    //Adds a product to the website through creating a  new dic and inserting it to the html
    var newProduct =  document.createElement('div')
    newProduct.classList.add('product')
    var listofproducts = document.getElementsByClassName('new-products')[0]
    var html = `
    <fieldset>
    <span class="productname">${Product.productname}</span>
    <br>
    <br>
    <button type="button" class="btn remove-product-button" style="visibility : hidden">Remove product</button>
    <img data-modal-target="#modal3" alt="Picture of ${Product.productname}" src="${Product.productImgSource}">
    <div class='modal' id='modal3'>
        <div class='modal-header'>
            <div class='title'>${Product.productname}</div>
            <button data-close-button class='close-button'>&times;</button>
        </div>
        <div class='modal-body'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Fuga pariatur consequuntur consequatur aliquid deserunt 
                aut perferendis eius ea accusamus magni possimus labore 
                optio voluptatum, tempore nobis odit error. Delectus, 
                veritatis aliquam sit placeat in minus veniam eligendi 
                nihil ipsam earum totam, consequatur tempora nam cum 
                magni laboriosam accusantium voluptas quisquam beatae 
                debitis exercitationem. Esse temporibus quia nostrum, 
                quis quidem tempore facilis expedita sint voluptatum 
                mollitia, provident nisi! Ea id mollitia quos molestias, 
                magni ipsam minus natus commodi molestiae ab libero.
        </div>
    </div>
    <div id='overlay'></div>
    <br>
    <br>
    <p>${Product.productdescription}</p>
    <br>
    <br>
    <span>Price for product:  </span><span class="productprice">${Product.productprice}</span>
    <br>
    <br>
    <label for="quantity">Choose a quanity</label>
    <select name="quantity" class="quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
    <button type="button" class="btn shop-item-button">Add to cart</button>
    </fieldset>
    <br>
    <br>
`
    newProduct.innerHTML = html
    console.log(newProduct)
    listofproducts.append(newProduct)
    productArray.push(Product)
    ready()
    
}

function fetchProducts(data){
    /*Fetcing a product*/
    console.log(data)
    var enkeltprodukt = ""
    var newProduct = new Product()
    /*Iterates through the array asserting values to a locally stored element of type product*/
    for(var i=0; i < data.length; i++){
        enkeltprodukt = data[i]
        console.log(enkeltprodukt)
        for(var j=0; j < enkeltprodukt.length; j++){
            newProduct.productid = enkeltprodukt[0]
            newProduct.productname = enkeltprodukt[1]
            newProduct.productprice = enkeltprodukt[2]
            newProduct.productquantity = enkeltprodukt[3]
            newProduct.productdescription = enkeltprodukt[4]
            newProduct.productImgSource = enkeltprodukt[5]
            productArray.push(newProduct)
           
        }
        addProduct(newProduct)
    }
   
}


function RemoveItem(event){
    /* Removing an item from the html*/
    var button = event.target
    var productin = button.parentElement.parentElement
    //var node = productin.getElementsByClassName('productname')[0]
    //var nodetext = node.innerText
    $(productin).remove();
    //deleteProductFromDB(nodetext)
    //console.log(nodetext)
}

function clearCart(){
    /* Clears the cart*/
    alert('Removing all products from cart')
    var listofitemsincart = document.getElementsByClassName('list-of-items')[0]
    while (listofitemsincart.hasChildNodes()){
        listofitemsincart.removeChild(listofitemsincart.firstChild)
    }
    sumCart()
}

function proceedToCheckout() {
    //Button method when pressing proceed to checkout, opening up an alert
    alert('CONGRATULATIONS! You get everything for FREE! HAPPY BIRTHDAY!')
    var listofitemsincart = document.getElementsByClassName('list-of-items')[0]
    while (listofitemsincart.hasChildNodes()){
        listofitemsincart.removeChild(listofitemsincart.firstChild)
    }
    sumCart()
}

function sumCart(){
    //Function for having a total in cart which changes dynamically
    //Finds the sum of each product added in cart using rows and list of items and adding these.
    var listofitemsincart = document.getElementsByClassName('list-of-items')[0]    
    var lineInCart = listofitemsincart.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0; i< lineInCart.length; i++){
        var iteminlist = lineInCart[i]
        var productsum = iteminlist.getElementsByClassName('product-sum-table')[0]
        console.log(productsum.innerText)
        var price= parseFloat(productsum.innerText)
        total = total + price
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-sum')[0].innerText = '$' + total
}


function makeVisible(){
    /* Makes the buttons visible when logged in as admin*/
    document.getElementsByClassName('add-product-button')[0].style.visibility = "visible"
    for(var i = 0; i < productArray.length; i++){
        document.getElementsByClassName('remove-product-button')[i].style.visibility = "visible"
    }
    
}

function makeInvisible(){
    /* Makes the buttons invisible when logged in as user*/
    document.getElementsByClassName('add-product-button')[0].style.visibility = "hidden"
    for(var i = 0; i < 3; i++){
        document.getElementsByClassName('remove-product-button')[i].style.visibility = "hidden"
    }
    
}


function loginAdmin(event){
    if(event){
        if(!loggedIn){
            makeVisible()
            var nyTekst="Log out as Admin"
            document.querySelector('#admin-button').innerHTML=nyTekst   
            var loggedIn = true
            console.log("Logged in")
            return loggedIn
        }
        else {
            ready()
            var nyTekst="Log in as Admin"
            document.querySelector('#admin-button').innerHTML=nyTekst
            console.log("Logged out")
        }
    }
    
    
}


fetch('/webshop/getall')
    .then (response => response.json())
    .then (data => fetchProducts(data));