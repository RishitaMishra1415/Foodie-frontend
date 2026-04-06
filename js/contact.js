const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const message = document.getElementById("contactMessage");
    const errors = document.querySelectorAll(".error");

    let isValid = true;
    errors.forEach(error => error.innerText = "");

    if(name.value.trim().length < 3){
        errors[0].innerText = "Name must be at least 3 characters";
        isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.value.match(emailPattern)){
        errors[1].innerText = "Enter valid email";
        isValid = false;
    }

    if(message.value.trim().length < 5){
        errors[2].innerText = "Message must be at least 5 characters";
        isValid = false;
    }

    if(isValid){
        alert("Message Sent Successfully!");
        contactForm.reset();
    }
}); 