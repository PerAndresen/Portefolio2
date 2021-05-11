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
   let  productname = $("#productname").html() 
   let price = $("#price").html()
   /*let quantity = document.getElementById('') */
   const product ={
       productname: productname,
       quantity: null,
       price: price,
   }
   let sum= product.price * product.quantity
   let ut = + "<tr><td>"+ product.productname +"</td><td>" + product.quantity + "</td><td>" + sum + "</td>"
   return $("#listOfItems").html(ut)     
}



function SaveItem(){


}

function ChangeItem(){

}

function RemoveItem(){

}

function ClearAll(){

}
