import initBackend from "../backend.js";

let saved_password;
async function run() {
    let messageElement;
    const Module = {
        print: (text) => {
            console.log(text); 
            messageElement=text;
        }
    };
    const wasm = await initBackend(Module);
    saved_password= localStorage.getItem("pin");
    console.log(saved_password)

    if (saved_password !== null) {
        //  let rest=1000
        saved_password = parseInt(saved_password, 10);
        wasm._changepass(saved_password); 
        // localStorage.setItem("balance",rest);
    } else {
        saved_password = wasm._get_password(); 
        localStorage.setItem("pin", saved_password);
    }
    
    let input = parseInt(document.getElementById("myin").value, 10);
    let currentPassword = wasm._get_password();
    console.log(currentPassword);

    const password=input;
    let result = wasm._pin_authentication(password);
    
    
    if(result==1){
        let sound = new Audio("success2.mp3");
        sound.play();
        sound.addEventListener("ended", function() {
            window.location.href = "dashboard.html";
        });
    }
    else{
        document.getElementById("myh2").textContent=messageElement;
        document.getElementById("myh2").style.color="red";
        let sound=new Audio("incorrect.mp3");
        sound.play();

    }
}
document.getElementById("myin").addEventListener("input",()=>{
    let sound1=new Audio("sounds/button.mp3");
    sound1.play();           
});
document.getElementById("myButton").addEventListener("click", run);
