const pp1 = document.querySelector("#pp1"),
    pp2 = document.querySelector("#pp2"),
    pp3 = document.querySelector("#pp3"),
    playerprofile = document.querySelector("#playerprofile"),
    start = document.querySelector("#start"),
    buttonsquare = document.querySelector("#buttonsquare"),
    italicstart = document.querySelector("#italicstart"),
    pause = document.querySelector("#pauseicon"),
    continues = document.querySelector("#continue"),
    newgame = document.querySelector("#newgame"),
    mainmenu = document.querySelector("#mainmenu"),
    bgmMain = document.querySelector("#bgmMain"),
    createnewplayer = document.querySelector("#createnewplayer"),
    create_delete_back = document.querySelector("#create_delete_back"),
    signup_back = document.querySelector("#signup_back"),
    


    mainUI = document.querySelector("#mainUI"),
    playernamesUIbg = document.querySelector("#playernamesUIbg"),
    playernamelist_UI = document.querySelector("#playernamelist_UI"),
    signupUIbg = document.querySelector("#signupUIbg"),
    signup_UI = document.querySelector("#signup_UI");

let audioplay = false;

let select_status = false;
document.addEventListener("mousedown", ()=>{
    audioplay = true;
    if (audioplay){
        bgmMain.play()
    }
    
    
})


function rotate(){
    
    console.log("hi");
    
    pp1.animate(
        [
            {
                top: "0px",
                left: "0px",
                zIndex: "2"
            },

            {
                top: "8px",
                left: "15px",
                zIndex: "1"
            },

            {
                top: "14px",
                left: "0px",
                zIndex: "3"
            },

            {
                top: "0px",
                left: "0px",
                zIndex: "2"
            }
        ],
        {
            duration: 1500, 
            iterations: 1, 
            easing: 'linear' 
        }
    )

    

    pp2.animate(
        [
            

            {
                top: "8px",
                left: "15px",
                zIndex: "1"
            },

            {
                top: "14px",
                left: "0px",
                zIndex: "3"
            },

            {
                top: "0px",
                left: "0px",
                zIndex: "2"
            },

            {
                top: "8px",
                left: "15px",
                zIndex: "1"
            }
        ],
        {
            duration: 1500, 
            iterations: 1, 
            easing: 'linear' 
        }
    )

    pp3.animate(
        [
            
            {
                top: "14px",
                left: "0px",
                zIndex: "3"
            },

            {
                top: "0px",
                left: "0px",
                zIndex: "2"
            },

            {
                top: "8px",
                left: "15px",
                zIndex: "1"
            },

            {
                top: "14px",
                left: "0px",
                zIndex: "3"
            }
        ],
        {
            duration: 1500, 
            iterations: 1,
            easing: 'linear' 
        }
    )

    
    
        
    
    
}

playerprofile.addEventListener("mouseenter", rotate);

let mouseenter = "mouseenter",
    mouseleave = "mouseleave";
    mouseclick = "click";

function buttonhover(buttondiv,mousebehavior){

    let buttonchild = buttondiv.children;

    if (mousebehavior === "mouseenter"){
        buttonchild[0].style.borderRadius = "100%";
        buttonchild[0].style.border = "solid #00FF0A 3px";
        buttonchild[0].style.boxShadow = "0px 0px 10px #00FF0A";

        buttonchild[1].style.background = "linear-gradient(to right, #00FF0A, #0057FF)";
        buttonchild[1].style.webkitBackgroundClip = "text";
        buttonchild[1].style.color = "transparent";
    }
    else{
        buttonchild[0].style.borderRadius = "0%";
        buttonchild[0].style.border = "solid 3px #00D1FF";
        buttonchild[0].style.boxShadow = "none";

        buttonchild[1].style.background = "linear-gradient(to right, #13FFE3, #0057FF)";
        buttonchild[1].style.webkitBackgroundClip = "text";
        buttonchild[1].style.color = "transparent";
    }

}

start.addEventListener(mouseenter, () => {

    buttonhover(start,mouseenter);
})

start.addEventListener(mouseleave, () => {
    
    buttonhover(start,mouseleave);
})

function changeUI(UIout,UIin,bool = false){

    UIinchildren = UIin.children;
    UIoutchildren = UIout.children;

    if (bool === false){
        UIout.style.opacity = "0";
        UIout.style.zIndex = "-1";

        UIin.style.opacity = "1";
        UIin.style.zIndex = "1";
    }
    else if (bool === true){
        
        UIout.style.opacity = "1";
        UIout.style.zIndex = "1";
        
        UIin.style.opacity = "1";
        UIin.style.zIndex = "2";
    }
    else {
        
        UIin.style.opacity = "1";
        UIin.style.zIndex = "1";

        for (const element of UIoutchildren){
            element.style.zIndex = "-1";
            // element.style.opacity = "0";
        }
        UIout.style.zIndex = "-1";
    
    }

    
    
}

function replaceWindow(currentUI,href){

    currentUI.style.opacity = "0";

    setTimeout(() => {
        window.location.replace(href);
    }, 300);
}

start.addEventListener(mouseclick,() => {
    window.location.replace("gameUI.php");
    
});

playerprofile.addEventListener("click", ()=>{
    changeUI(mainUI,playernamesUIbg,true)
})

createnewplayer.addEventListener(mouseenter,() => {
    buttonhover(createnewplayer,mouseenter)
});

createnewplayer.addEventListener(mouseleave,() => {
    buttonhover(createnewplayer,mouseleave)
});

createnewplayer.addEventListener("click", ()=>{
    changeUI(playernamesUIbg,mainUI,true)
    changeUI(mainUI,signupUIbg,true)
})

create_delete_back.addEventListener(mouseenter,() => {
    buttonhover(create_delete_back,mouseenter)
});

create_delete_back.addEventListener(mouseleave,() => {
    buttonhover(create_delete_back,mouseleave)
});

create_delete_back.addEventListener("click", ()=>{
    changeUI(playernamesUIbg,mainUI,true)
})

signup_back.addEventListener(mouseenter,() => {
    buttonhover(signup_back,mouseenter)
});

signup_back.addEventListener(mouseleave,() => {
    buttonhover(signup_back,mouseleave)
});

signup_back.addEventListener("click", ()=>{
    changeUI(signupUIbg,mainUI,true)
})

playernamelist_UI.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = new FormData(this);

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Handle the response from the server
        document.getElementById('response').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
    changeUI(create_delete_back,mainUI,true)
    window.location.reload()
});

signup_UI.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = new FormData(this);

    fetch('signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Handle the response from the server
        document.getElementById('response').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
    changeUI(signup_UI,mainUI,true)
    window.location.reload()
});


    
    








