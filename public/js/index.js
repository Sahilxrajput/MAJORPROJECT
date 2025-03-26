 
 let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click",() =>{
    let taxInfo = document.getElementsByClassName("tax-info");
    let listingPrice = document.getElementsByClassName("title-price");

    for(price of listingPrice) {
      if(price.style.display != "inline") {
      price.style.display = "inline"; 
    } else {
      price.style.display = "none"; 
    }
  }
    for(info of taxInfo) {
      if(info.style.display != "inline") {
      info.style.display = "inline"; 
    } else {
      info.style.display = "none"; 
    }
  }


});


 