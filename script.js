const popup =document.querySelector(".popup"),
wifiIcon =document.querySelector(".icon i"),
popupTitle =document.querySelector(".popup .title"),
popupDesc =document.querySelector(".desc"),
reconnectBtn=document.querySelector(".reconnect");

let isOnline=true, intervalId, timer=10;

const checkConnection = async () => { 
    try{
        // Try to fetch random data from the API
        // 200 and 300 the network connection is consdred online
        const response=await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline=response.status >= 200 && response.status < 300;
        //console.log(response);
    }catch (error) {
      //  console.log(error);
        isOnline=false;  // If there is an error, the connection is cosidered offline
    }

    //console.log(isOnline)
    timer=10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup=(status)=>{
    if(status){                                     // if the status is true(online), update icon, title,and description accordingly
        wifiIcon.className="uil uil-wifi";
        popupTitle.innerText="Restored Connection";
        popupDesc.innerHTML="Your device is now successfully conneted to the internet";
        popup.classList.add("online");
        return setTimeout(()=> popup.classList.remove("show"),2000);
    }

    //If the status is false (offline)
    wifiIcon.className="uil uil-wifi-slash";
    popupTitle.innerText="Lost Connection";
    popupDesc.innerHTML="Your network is unavailabel. We will attempt to reconnect you in 10 seconds";
    popup.className="popup show";

   // popup.classList.add("show");

    intervalId=setInterval(()=>{        // set an interval to decrease the timer by 1 every second
        	timer--;
            if(timer===0) checkConnection();
            popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

// only if isonline is true, Check the connection status every 3 seconds
setInterval(()=> isOnline && checkConnection(),3000);
reconnectBtn.addEventListener("click",checkConnection);
