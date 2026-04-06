const params = new URLSearchParams(window.location.search);

const orderId = params.get("id");

fetch("http://localhost:5000/api/orders/"+orderId)

.then(res=>res.json())

.then(order=>{

console.log(order);

document.getElementById("orderDetails").innerHTML=`

<img src="${order.image}">

<div>

<h3>${order.food_name}</h3>

<p>Quantity : ${order.quantity}</p>

<p>Payment : ${order.payment_method}</p>

<p>Total Amount : ₹${order.total_amount}</p>

</div>

`;

updateTracking(order.status);

});



function updateTracking(status){

const bike=document.getElementById("bike");

const steps=document.querySelectorAll(".step");

let stepIndex=0;

if(status==="pending") stepIndex=0;
else if(status==="preparing") stepIndex=1;
else if(status==="out for delivery") stepIndex=2;
else if(status==="delivered") stepIndex=3;

steps.forEach(step=>step.classList.remove("active"));

for(let i=0;i<=stepIndex;i++){

steps[i].classList.add("active");

}

bike.style.left=((stepIndex+1)/steps.length)*100+"%";

}



const time=Math.floor(Math.random()*10)+30;

document.getElementById("arrivalTime").innerText=

"Arriving in "+time+" minutes";