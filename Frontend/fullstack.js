var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

/*IMPORTERER JQUERY*/

function addToCart(event){
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
   var buttonClicked = event.target
   console.log(buttonClicked.parentElement.child(".productname"))
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

function createProduct(){
    /*lage en funksjon som lager ett produkt.*/
}


function RemoveItem(){

}

function ClearAll(){

}
