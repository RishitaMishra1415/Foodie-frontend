const adminForm = document.getElementById("adminLoginForm");

// Predefined Admin Credentials
const ADMIN_ID = "foodieAdmin";
const ADMIN_PASSWORD = "Foodie@123";

adminForm.addEventListener("submit", function(e){
    e.preventDefault();

    const usernameInput = document.getElementById("adminUsername");
    const passwordInput = document.getElementById("adminPassword");
    const errors = document.querySelectorAll(".error");

    // Clear old errors
    errors.forEach(error => error.innerText = "");

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    if(username === ""){
        errors[0].innerText = "Admin ID is required";
        isValid = false;
    }

    if(password === ""){
        errors[1].innerText = "Password is required";
        isValid = false;
    }

    if(!isValid) return;

    // Check Credentials
    if(username === ADMIN_ID && password === ADMIN_PASSWORD){

        // Set Admin Session
        localStorage.setItem("isAdminLoggedIn", "true");

        // Redirect to Dashboard
        window.location.href = "admin-dashboard.html";

    } else {
        alert("Invalid Admin ID or Password");
    }
});