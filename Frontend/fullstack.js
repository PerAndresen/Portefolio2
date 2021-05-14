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
    let ut = '<tr><td class="product-name-table">'+ product.productname +'</td><td class="product-quantity-table">'+ product.productquantity + '</td><td class="product-sum-table">' + sum + '</td>'
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
    alert('Removing all products from cart')
    var listofitemsincart = document.getElementsByClassName('list-of-items')[0]
    while (listofitemsincart.hasChildNodes()){
        listofitemsincart.removeChild(listofitemsincart.firstChild)
    }
}

function sumCart(){
    var listofitemsincart = document.getElementsByClassName('list-of-items')[0]
    var cartRows = listofitemsincart.getElementsByClassName('')
    var total = 0
    for(var i = 0; i< listofitemsincart.length; i++){
        console.log(listofitemsincart.getElementsByClassName('product-sum-table')[0])
        sum = listofitemsincart.getElementsByClassName('product-sum-table').value
        total = total + sum
    }
    document.getElementsByClassName('total-sum').innerText ='$' + total
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
