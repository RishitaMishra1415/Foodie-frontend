const user = JSON.parse(sessionStorage.getItem("user"));

if(!user){

alert("Please login first");

window.location.href="login.html";

}

/* FETCH ORDERS */

fetch("http://localhost:5000/api/my-orders/" + user.id)

.then(res => res.json())

.then(data => {

const container = document.getElementById("ordersList");

container.innerHTML="";

if(data.length===0){

container.innerHTML="<p>No orders found</p>";

return;

}

data.forEach(order => {

const card = document.createElement("div");

card.classList.add("order-card");

card.innerHTML = `

<div class="order-left">

<img src="${order.image}">

<div class="order-info">

<h3>${order.food_name}</h3>

<p>Size : ${order.size}</p>

<p>Quantity : ${order.quantity}</p>

</div>

</div>

<div class="order-right">

<h3>₹${order.price}</h3>

<p>Payment : ${order.payment_method}</p>

<p>Status : ${order.status}</p>

<button class="track-btn" onclick="trackOrder(${order.order_id})">

Track Order

</button>

</div>

`;

container.appendChild(card);

});

});


function trackOrder(id){

window.location.href="trackorder.html?id="+id;

}