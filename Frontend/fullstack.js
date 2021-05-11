var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

/*IMPORTERER JQUERY*/

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
   console.log(document.getElementById("product").querySelector("#productname"))
   let  productname = $("#productname").html() 
   let price = $("#price").html()
   let quantity = $("#quantity1").val()
   /*let quantity = document.getElementById('') */
   const product ={
       productname: productname,
       quantity: quantity,
       price: price,
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
