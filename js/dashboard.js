if(localStorage.getItem("isAdminLoggedIn") !== "true"){
    window.location.href = "admin-login.html";
}

let foods = JSON.parse(localStorage.getItem("foods")) || [];
let editIndex = null;

function saveFood(){

    const name = document.getElementById("foodName").value;
    const category = document.getElementById("foodCategory").value;
    const price = document.getElementById("foodPrice").value;
    const image = document.getElementById("foodImage").value;
    const desc = document.getElementById("foodDesc").value;

    if(name === "" || category === "" || price === "" || image === ""){
        alert("Please fill all fields");
        return;
    }

    const foodData = {name, category, price, image, desc};

    if(editIndex === null){
        foods.push(foodData);
    } else {
        foods[editIndex] = foodData;
        editIndex = null;
    }

    localStorage.setItem("foods", JSON.stringify(foods));
    clearForm();
    displayFoods();
}

function displayFoods(){

    const table = document.getElementById("foodTable");
    table.innerHTML = "";

    foods.forEach((food, index)=>{

        const div = document.createElement("div");
        div.classList.add("food-card");

        div.innerHTML = `
            <img src="${food.image}">
            <div>
                <h4>${food.name}</h4>
                <p>${food.desc}</p>
                <p><strong>${food.category}</strong> | ₹${food.price}</p>
            </div>
            <div class="food-actions">
                <button onclick="editFood(${index})">Edit</button>
                <button onclick="deleteFood(${index})">Delete</button>
            </div>
        `;

        table.appendChild(div);
    });
}

function editFood(index){
    const food = foods[index];

    document.getElementById("foodName").value = food.name;
    document.getElementById("foodCategory").value = food.category;
    document.getElementById("foodPrice").value = food.price;
    document.getElementById("foodImage").value = food.image;
    document.getElementById("foodDesc").value = food.desc;

    editIndex = index;
}

function deleteFood(index){
    foods.splice(index,1);
    localStorage.setItem("foods", JSON.stringify(foods));
    displayFoods();
}

function clearForm(){
    document.getElementById("foodName").value="";
    document.getElementById("foodCategory").value="";
    document.getElementById("foodPrice").value="";
    document.getElementById("foodImage").value="";
    document.getElementById("foodDesc").value="";
}

function logout(){
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href="admin-login.html";
}

displayFoods();