import initBackend from "../backend.js";

let wasm; 

async function init() {
    const Module = {
        print: (text) => {
            console.log(text); 
            document.getElementById("mypp1").textContent=text;
        }
    };
    wasm = await initBackend(Module); 
    let saved_balance = localStorage.getItem("balance");

    if (saved_balance !== null) {
        //  let rest=1000
        saved_balance = parseInt(saved_balance, 10);
        wasm._set_balance(saved_balance); 
        // localStorage.setItem("balance",rest);
    } else {
        saved_balance = wasm._get_balance(); 
        localStorage.setItem("balance", saved_balance);
    }
    document.getElementById("mypp2").textContent = `Your balance is: ${saved_balance}`;
    // localStorage.clear
}

init();

async function run1(event) {
    event.preventDefault(); 
    let amount = document.getElementById("myin2").value;
    wasm._deposit(amount);
    // {print: (text) => {
    //     console.log(text); 
    //     document.getElementById("mypp2").textContent = `Your balance is: ${text}`;
        
    // }}
    if(amount>0){
        let new_balance = wasm._get_balance(); 
        localStorage.setItem("balance", new_balance); 
        wasm._set_balance(new_balance);
    
        document.getElementById("mypp2").textContent = `Your balance is: ${new_balance}`;
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        const date=new Date();
        let hours = date.getHours();
        const meridian = hours >= 12 ? 'PM' : 'AM';  
        hours = hours % 12 || 12; 
        hours = hours.toString().padStart(2, "0");
        const minutes=date.getMinutes().toString().padStart(2,"0");
        const month=(date.getMonth()+1).toString().padStart(2,"0");
        const dates=date.getDate().toString().padStart(2,"0");
        const year=date.getFullYear();
        const toshow=`${hours}:${minutes} ${meridian}`;
        const datetime=` ${dates}-${month}-${year}`;
        transactions.push(`Deposit: ${amount}: ${toshow}:${datetime}`);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        let sound = new Audio("success2.mp3");
        sound.play();
        sound.addEventListener("ended", function() {
            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 200);  
        });
    }
    else{
        let new_balance = wasm._get_balance(); 
        localStorage.setItem("balance", new_balance); 
        wasm._set_balance(new_balance);
        wasm._deposit(new_balance);
        // getTransactionHistory();
        let sound1=new Audio("unsuccess.mp3");
        sound1.play();            
        document.getElementById("mypp2").textContent = `Your remaing balance is: ${new_balance}`; 
        // document.getElementById("mypp1").textContent = "Your amount cannot be negative"; 

    }
   
}   
document.getElementById("myin2").addEventListener("input",()=>{
    let sound1=new Audio("button.mp3");
    sound1.play();           
});
document.getElementById("mybut").addEventListener("click", run1);
