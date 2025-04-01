import initBackend from "./backend.js"; 

let wasm;

async function init() {
    wasm = await initBackend();

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
    function display(){
    document.getElementById("balanceDisplay").textContent = `Your balance is: ${saved_balance}`;
    }
    document.getElementById("checkBalanceBtn").addEventListener("click",display);
    
}
init();


