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

    var clearItemsbutton = document.getElementsByClassName('clear-items-button')
    clearItemsbutton.addEventListener('click', clearCart)

}


function addToCart(){
    /* 
    Knappfunksjon ved hvert produkt for å legge det til i handlelisten
    Tar inn det som er tilhørende objekt
    */
   /* Får bare inn for første produkt, går det ann å få for de to andre på en enkel måte.
   var thisproduct = document.querySelector("product")
   var thisproductname = thisproduct.closest("h1")
   var thisproductname = thisproduct.val
   console.log(thisproductname)
   */ 
    /*parent().find('product').getElementById("#productname")) */
   /* var that=div */
   console.log(document.getElementById("listofproducts").getElementsByClassName(".productname"))
   /*console.log($(that).parent().siblings(".productname").show())
   /*let  productname = $("#productname").html() 
   let price = $("#price").html()
   let quantity = $("#quantity1").val()
   /*let quantity = document.getElementById('') */
   const product ={
       productname: productname.text(),
       quantity: quantity.text(),
       price: price.text(),
   }
   /*lagre det som ett produkt, som sendes til APIet?*/
   console.log(product.productname+" "+product.quantity+" "+product.price)
   let sum= product.price * product.quantity
   let ut = "<tr><td>"+ product.productname +"</td><td>" + product.quantity + "</td><td>" + sum + "</td>"
   return $("#listOfItems").append(ut)     
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
    let ut = "<tr><td>"+ product.productname +"</td><td>" + product.productquantity + "</td><td>" + sum + "</td>"
    return $("#listOfItems").append(ut) 
}






function createProduct(){
    /*lage en funksjon som lager ett produkt.*/
}


function RemoveItem(){
    /* ha en removeknapp ved hvert item som dukker opp i listen*/
}

function clearCart(event){
    /* Sletter alt fra handlelisten
    kaller på apiet?
    Tømmer listen*/
    return null
}
