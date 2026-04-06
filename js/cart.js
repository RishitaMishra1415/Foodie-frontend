let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cartContainer");

function loadCart(){

container.innerHTML="";

let total = 0;

cart.forEach((item,index)=>{

const card = document.createElement("div");

card.classList.add("cart-card");

card.innerHTML = `

<img src="${item.image}" class="cart-img">

<div class="cart-info">

<h3>${item.name}</h3>

<p>Size: ${item.size}</p>

<p class="cart-price">₹${item.price}</p>

<div class="qty-control">

<button class="qty-btn" onclick="decreaseQty(${index})">−</button>

<span class="qty-number">${item.quantity}</span>

<button class="qty-btn" onclick="increaseQty(${index})">+</button>

</div>

<button class="remove-btn" onclick="removeItem(${index})">
Remove
</button>

</div>

`;

container.appendChild(card);

total += item.price * item.quantity;

});

document.getElementById("totalPrice").innerText =
"Total Price : ₹" + total;

localStorage.setItem("cart",JSON.stringify(cart));

}


function increaseQty(index){

cart[index].quantity++;

loadCart();

}

function decreaseQty(index){

if(cart[index].quantity>1){

cart[index].quantity--;

loadCart();

}

}

function removeItem(index){

cart.splice(index,1);

loadCart();

}


document.getElementById("checkoutBtn").addEventListener("click",()=>{

if(cart.length===0){

alert("Cart is empty");

return;

}

window.location.href="payment.html";

});

loadCart();