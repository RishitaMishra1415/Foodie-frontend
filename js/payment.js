const item = JSON.parse(localStorage.getItem("orderItem"));

const orderDiv = document.getElementById("orderDetails");

if(!item){

alert("No order found");

window.location.href="index.html";

}

/* ORDER SUMMARY */

orderDiv.innerHTML = `

<div class="order-item">

<img src="${item.image}" class="food-img">

<div>

<h3>${item.name}</h3>

<p><b>Size :</b> ${item.size}</p>

<p><b>Quantity :</b> ${item.quantity}</p>

<p><b>Price :</b> ₹${item.price}</p>

</div>

</div>

`;

let total = item.price * item.quantity;

/* UPDATE PRICE */

function updatePrice(){

const method =
document.querySelector('input[name="payment"]:checked').value;

let finalPrice = total;

if(method === "cod"){

finalPrice += 15;

}

document.getElementById("finalAmount").innerText =
"Final Amount : ₹" + finalPrice;

}

updatePrice();

document.querySelectorAll('input[name="payment"]').forEach(el=>{

el.addEventListener("change",updatePrice);

});


/* PLACE ORDER */

function placeOrder(){

const user = JSON.parse(sessionStorage.getItem("user"));

if(!user){

alert("Please login first");

window.location.href="login.html";

return;

}

const method =
document.querySelector('input[name="payment"]:checked').value;

let finalPrice = total;

if(method === "cod"){

finalPrice += 15;

}

fetch("http://localhost:5000/api/place-order",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

userId:user.id,

foodId:item.id,

foodName:item.name,

size:item.size,

quantity:item.quantity,

price:item.price,

total:finalPrice,

payment:method

})

})

.then(res=>res.json())

.then(data=>{

alert("Order placed successfully");

localStorage.removeItem("orderItem");

window.location.href="myorders.html";

})

.catch(err=>{

console.log(err);

alert("Order failed");

});

}