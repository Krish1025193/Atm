import initBackend from "./backend.js";
let wasm; 
let saved_password;
async function load() {
    const Module = {
        print: (text) => {
            console.log(text); 
            document.getElementById("message").textContent=text;
            console.log(text)
        }
    };
    wasm = await initBackend(Module);
    saved_password= localStorage.getItem("pin");
    console.log(saved_password)

    if (saved_password !== null) {
        saved_password = parseInt(saved_password, 10);
        wasm._changepass(saved_password); 
    } else {
        saved_password = wasm._get_password(); 
        localStorage.setItem("pin", saved_password);
    }
}

async function change(event) {
    event.preventDefault(); 
   
    let currentPin = parseInt(document.getElementById("current-pin").value, 10);
    let newPin = parseInt(document.getElementById("new-pin").value, 10);
    let confirmPin = parseInt(document.getElementById("confirm-pin").value, 10);
    let result=wasm._changePin(newPin,confirmPin,currentPin);


    if(result==1 &&!isNaN(newPin)){
        let new2= wasm._changepass(confirmPin);
        localStorage.setItem("pin", confirmPin);  
        console.log(new2);
        let sound = new Audio("success2.mp3");
        sound.play();
        document.getElementById("message").textContent="";
        
        sound.addEventListener("ended", function() {
            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 200);  
        });

    }
    if(isNaN(newPin)&&!isNaN(currentPin)){
        document.getElementById("message").textContent="New pin cannot be empty";
        let sound1=new Audio("unsuccess.mp3");
        sound1.play(); 
    }
    
    else{
        // document.getElementById('message').textContent="hello"
        let sound1=new Audio("unsuccess.mp3");
        sound1.play();           
    }
}
document.addEventListener("DOMContentLoaded", () => {
    load();
    
    document.getElementById("current-pin").addEventListener("input", () => {
        new Audio("button.mp3").play();
    });

    document.getElementById("new-pin").addEventListener("input", () => {
        new Audio("button.mp3").play();
    });

    document.getElementById("confirm-pin").addEventListener("input", () => {
        new Audio("button.mp3").play();
    });

    document.getElementById("change-pin-btn").addEventListener("click", change);
});
