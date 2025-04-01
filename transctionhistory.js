import initBackend from "./backend.js";
let wasm;

async function getTransactionHistory() {
    
    // const Module = {
    //     print: (text) => {
    //         console.log(text); 
    //         document.getElementById("hi").textContent = text;
    //     }
    // };
    wasm = await initBackend();
    // Load transactions from localStorage
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    console.log("Transactions:", transactions);
    let parts = transactions.map(transactions=>transactions.split(": "));
    console.log(parts.length);
    console.log(parts);
    let tbody = document.getElementById("transaction-history");

    for(let i = 0; i < parts.length; i++){
        let row = document.createElement("tr");
        let typeCell = document.createElement("td");
        let amountCell = document.createElement("td");
        let datecell = document.createElement("td");
        let timecell = document.createElement("td");
        amountCell.textContent = parts[i][1]; 
        typeCell.textContent = parts[i][0]; 
        datecell.textContent = parts[i][2]; 
        timecell.textContent=parts[i][3]; 
        
        row.appendChild(timecell);
        row.appendChild(datecell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);
        tbody.appendChild(row);
    }
    }
   


document.getElementById("dash").addEventListener("click",()=>window.location.href="dashboard.html");
function clear_history(){
    location.reload();
    localStorage.setItem("transactions",0);
}
document.getElementById("clear").addEventListener("click",clear_history);

getTransactionHistory();