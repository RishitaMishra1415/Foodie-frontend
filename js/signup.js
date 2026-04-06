document.getElementById("signupForm").addEventListener("submit",function(e){

    e.preventDefault();
    
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const phone=document.getElementById("phone").value;
    const password=document.getElementById("password").value;
    const confirmPassword=document.getElementById("confirmPassword").value;
    const address=document.getElementById("address").value;
    const city=document.getElementById("city").value;
    const pincode=document.getElementById("pincode").value;
    
    const error=document.getElementById("error");
    
    error.innerText="";
    
    if(password!==confirmPassword){
    
    error.innerText="Passwords do not match";
    return;
    
    }
    
    fetch("http://localhost:5000/api/signup",{
    
    method:"POST",
    
    headers:{
    "Content-Type":"application/json"
    },
    
    body:JSON.stringify({
    
    name:name,
    email:email,
    phone:phone,
    password:password,
    address:address,
    city:city,
    pincode:pincode
    
    })
    
    })
    
    .then(res=>res.json())
    
    .then(data=>{
    
    if(data.success){
    
    alert("Signup successful");
    
    window.location.href="login.html";
    
    }else{
    
    error.innerText=data.message;
    
    }
    
    });
    
    });