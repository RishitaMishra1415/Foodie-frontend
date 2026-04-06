document.getElementById("loginForm").addEventListener("submit",function(e){

    e.preventDefault();
    
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    
    const error=document.getElementById("error");
    
    error.innerText="";
    
    if(email==="" || password===""){
    
    error.innerText="Please fill all fields";
    
    return;
    
    }
    
    fetch("http://localhost:5000/api/login",{
    
    method:"POST",
    
    headers:{
    "Content-Type":"application/json"
    },
    
    body:JSON.stringify({
    
    email:email,
    password:password
    
    })
    
    })
    
    .then(res=>res.json())
    
    .then(data=>{
    
    if(data.message==="Email not found"){
    
    error.innerText="Email not registered";
    
    }
    
    else if(data.message==="Wrong password"){
    
    error.innerText="Incorrect password";
    
    }
    
    else if(data.success){
    
    sessionStorage.setItem("user",JSON.stringify(data.user));
    
    alert("Login successful");
    
    window.location.href="index.html";
    
    }
    
    });
    
    });