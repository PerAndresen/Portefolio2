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
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('clear-items-button')[0].addEventListener('click', clearCart)
    
    var removeProductButtons = document.getElementsByClassName('remove-product-button')
    for(var i = 0; i <removeProductButtons.length; i++){
        var button = removeProductButtons[i]
        button.addEventListener('click', RemoveItem)
    }

    document.getElementsByClassName('add-product-button')[0].addEventListener('click', createProductButton)

}

function addToCartClicked(event){
    /* 
    Knappfunksjon ved hvert produkt for å legge det til i handlelisten
    Tar inn det som er tilhørende objekt
    Lagre dette inn i APIet?
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

function addItemToCart(productname, productquantity, sum) {
    var cartLinje = document.createElement('div')
    cartLinje.classList.add('cart-row')
    var cartitems = document.getElementsByClassName('list-of-items')[0]  
    var ut = '<span class="product-name-table">'+productname+'</span>    <span class="product-quantity-table">'+productquantity+'</span>    <span class="product-sum-table">'+sum+'</span>'
    cartLinje.innerHTML = ut
    cartitems.append(cartLinje)
}




function createProductButton(event){
    /*lage en funksjon som lager ett produkt.
     Trykker på en knapp, så dukker det opp ett input vindu. Med input for produkt, pris, beskrivelse og bilde. 
     Skal også være hidden, kun synlig for admin
    */
   if(event){
       var productname = prompt("Please enter a product","")
       var price = prompt("Please enter a price","")
       var description = prompt("Please enter description: ","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non sollicitudin eros. Nunc ut augue lacinia, ultrices ipsum vel, viverra.")
       var picturesrc = prompt("Please enter an Image source of the product","https://image.sciencenorway.no/1438480.jpg?imageId=1438480&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630" )
       console.log(productname, price, description)
   }
   newProduct = new Product(productname,price,description,picturesrc)
   addProduct(newProduct)
   ready()

}

function addProduct(Product){
    var newProduct =  document.createElement('div')
    newProduct.classList.add('product')
    var listofproducts = document.getElementsByClassName('new-products')[0]
    var html = `
    <fieldset>
    <span class="productname">${Product.productname}</span>
    <br>
    <br>
    <button type="button" class="btn remove-product-button">Remove product</button>
    <img alt="Picture of the Fruit" src="${Product.productImgSource}">
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
`
    newProduct.innerHTML = html
    console.log(newProduct)
    listofproducts.append(newProduct)
}


function addImage(){

    

}


function RemoveItem(event){
    /* ha en removeknapp ved hvert produkt, som admin har tilgjengelig*/
    var button = event.target
    var productin = button.parentElement.parentElement
    $(productin).remove();
}

function clearCart(event){
    /* Sletter alt fra handlelisten
    kaller på apiet?
    Tømmer listen*/
    alert('Removing all products from cart')
    var listofitemsincart = document.getElementsByClassName('list-of-items')[0]
    while (listofitemsincart.hasChildNodes()){
        listofitemsincart.removeChild(listofitemsincart.firstChild)
    }
    sumCart()
}

function sumCart(){
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

function adminAddProduct(){
    /*Knappefunksjon som kun skal være tilgjengelig for admin
    Som legger til ett nytt produkt på listen
    Requirements for det som blir lagt til:
    Produktnavn, Kort beskrivelse, lang beskrivelse, photo, ?pris?
    Setter inn ett stockbilde hvis ingenting blir providet
    Da må knappene være usynlige vanligvis, 
    */
}

/*Constructor for Product*/

function Product(productname, productprice, productdescription, productImgSource){
    this.productname = productname
    this.productprice = productprice
    this.description = productdescription
    this.productImgSource = productImgSource
}

productInn={

}