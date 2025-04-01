import initBackend from "../backend.js";
// run();
// Run the function when the page loads

function datetime(){
    const date=new Date();
    // let date = new Date();
    let hours = date.getHours();
    const meridian = hours >= 12 ? 'PM' : 'AM';  
    hours = hours % 12 || 12; 
    hours = hours.toString().padStart(2, "0");
    const minutes=date.getMinutes().toString().padStart(2,"0");
    const month=(date.getMonth()+1).toString().padStart(2,"0");
    const dates=date.getDate().toString().padStart(2,"0");
    const year=date.getFullYear();
    const datetime=` ${dates}-${month}-${year}`;
    const toshow=`${hours}:${minutes} ${meridian}`;
    document.getElementById("myp1").textContent=`${toshow}`;
    document.getElementById("myp2").textContent=datetime;
    // console.log("works");
}
document.querySelector(".actions").addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;

    let action = event.target.textContent.toLowerCase();
    action = action.split(" ").join("");
    console.log(action);
    let sound=new Audio("sounds/buttonclick.mp3");
    // sound.play()
    switch(action){
        case "withdraw":
            sound.play();
            sound.addEventListener("ended", function() {
                window.location.href="withdraw.html";
            });
            break
        case "deposit":
            sound.play();
            sound.addEventListener("ended", function() {
                window.location.href="deposit.html";
            });
            
            break
        case "checkbalance":
            sound.play();
            sound.addEventListener("ended", function() {
                window.location.href="checkbalance.html";
            });
         
            break
        case "transactionhistory":
            sound.play();
            sound.addEventListener("ended", function() {
                window.location.href="transactionhistory.html";
            });
          
            break
        case "pinchange":
            sound.play();
            sound.addEventListener("ended", function() {
                window.location.href="pinchange.html";

            });
            break
        case "logout":
            sound.play();
            sound.addEventListener("ended", function() {
                window.location.href="index.html";
            });
           
            break
    }
});

    
datetime();
setInterval(datetime, 1000);
  
