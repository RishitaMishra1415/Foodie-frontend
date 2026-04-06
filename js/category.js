fetch("http://localhost:5000/api/foods/" + category)

.then(res => res.json())

.then(data => {

const container = document.getElementById("foodContainer");

container.innerHTML = "";

data.forEach(food => {

const card = document.createElement("div");

card.classList.add("food-card");

let sizeOptions = "";

/* CAKE */

if(category === "cake"){

sizeOptions = `

<label>Select Size</label>

<select class="size">

<option value="1">0.5 Pound</option>
<option value="1.5">1 Pound</option>
<option value="2">2 Pound</option>

</select>

`;

}

/* PIZZA */

else if(category === "pizza"){

sizeOptions = `

<label>Select Size</label>

<select class="size">

<option value="1">Small</option>
<option value="1.3">Medium</option>
<option value="1.6">Large</option>

</select>

`;

}

/* JUICE */

else if(category === "juice"){

sizeOptions = `

<label>Select Size</label>

<select class="size">

<option value="1">250 ml</option>
<option value="1.4">500 ml</option>
<option value="1.8">1 Litre</option>

</select>

`;

}

/* SHAKE */

else if(category === "shake"){

sizeOptions = `

<label>Select Size</label>

<select class="size">

<option value="1">Regular</option>
<option value="1.5">Large</option>

</select>

`;

}

/* VEG / NONVEG / LUNCH / DINNER / BREAKFAST */

else{

sizeOptions = `

<label>Select Plate</label>

<select class="size">

<option value="1">1 Plate</option>
<option value="2">2 Plate</option>
<option value="3">3 Plate</option>

</select>

`;

}

card.innerHTML = `

<img src="../${food.image}" class="food-img">

<h3>${food.name}</h3>

<p>${food.description}</p>

<h4 class="price">₹${food.price}</h4>

${sizeOptions}

<label>Quantity</label>

<input type="number" value="1" min="1" class="qty">

<button class="cart-btn">Add to Meal</button>

<button class="order-btn">Order Now</button>

`;

container.appendChild(card);

/* SIZE PRICE CHANGE */

const sizeSelect = card.querySelector(".size");

const priceText = card.querySelector(".price");

if(sizeSelect){

sizeSelect.addEventListener("change", () => {

const multiplier = parseFloat(sizeSelect.value);

priceText.innerText = "₹" + (food.price * multiplier);

});

}

/* ADD TO CART */

const cartBtn = card.querySelector(".cart-btn");

cartBtn.addEventListener("click", () => {

const user =
JSON.parse(sessionStorage.getItem("user"));

if(!user){

alert("Please login first");

window.location.href="../login.html";

return;

}

const qty = parseInt(card.querySelector(".qty").value);

let multiplier = 1;

let size = "";

if(sizeSelect){

multiplier = parseFloat(sizeSelect.value);

size = sizeSelect.options[sizeSelect.selectedIndex].text;

}

const finalPrice = food.price * multiplier;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const existingItem = cart.find(item =>
item.id === food.id && item.size === size
);

if(existingItem){

existingItem.quantity += qty;

}else{

cart.push({

id: food.id,
name: food.name,
image: food.image,
price: finalPrice,
quantity: qty,
size: size

});

}

localStorage.setItem("cart", JSON.stringify(cart));

window.location.href="../cart.html";

});


/* ORDER NOW */

const orderBtn = card.querySelector(".order-btn");

orderBtn.addEventListener("click", () => {

const user =
JSON.parse(sessionStorage.getItem("user"));

if(!user){

alert("Please login first");

window.location.href="../login.html";

return;

}

const qty = parseInt(card.querySelector(".qty").value);

let multiplier = 1;

let size = "";

if(sizeSelect){

multiplier = parseFloat(sizeSelect.value);

size = sizeSelect.options[sizeSelect.selectedIndex].text;

}

const finalPrice = food.price * multiplier;

const orderItem = {

id: food.id,
name: food.name,
image: food.image,
price: finalPrice,
quantity: qty,
size: size

};

localStorage.setItem("orderItem", JSON.stringify(orderItem));

window.location.href="../payment.html";

});

});

});