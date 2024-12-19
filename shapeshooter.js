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
    createnewplayer = document.querySelector(".createnewplayer"),
    create_delete_back = document.querySelector("#create_delete_back"),
    signup_back = document.querySelector("#signup_back"),
    login_player_name = document.querySelector(".login_player_name"),
    login_password = document.querySelector(".login_password"),
    signup_ign = document.querySelector(".signup_ign"),
    signup_player_name = document.querySelector(".signup_player_name"),
    signup_password = document.querySelector(".signup_password"),
    signup_confirm = document.querySelector(".signup_confirm"),
    logout_div = document.querySelector(".logout_div"),
    leaderboard = document.querySelector(".leaderboard"),
    


    mainUI = document.querySelector("#mainUI"),
    playernamesUIbg = document.querySelector("#playernamesUIbg"),
    playernamesUI = document.querySelector(".playernamesUI"),
    playernamelist_UI = document.querySelector(".login_form"),
    leaderboardUIbg = document.querySelector(".leaderboardUIbg"),
    leaderboardUI =document.querySelector(".leaderboardUI"),
    signupUIbg = document.querySelector("#signupUIbg"),
    signup_UI = document.querySelector("#signup_UI");

let audioplay = false;




function rotate(){
    
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

logout_div.addEventListener(mouseenter,() => {
    buttonhover(logout_div,mouseenter)
});

logout_div.addEventListener(mouseleave,() => {
    buttonhover(logout_div,mouseleave)
});

logout_div.addEventListener("click", () => {
    window.location.href = "logout.php";
});


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
    .then(response => {
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response from the server
        document.querySelector('.response').innerHTML = data.message;
        document.querySelector('.response').classList.toggle('hide');
        login_player_name.value = "";
        login_password.value = "";
        logout_div.classList.toggle('hide');
        createnewplayer.classList.toggle('hide');
        playernamelist_UI.classList.toggle('hide');
        playernamesUI.style.justifyContent = 'center';
        playernamesUIbg
        setTimeout(() => {
            document.querySelector('.response').classList.toggle('hide');
        }, 4000);
        if (data.player_name != 'null'){
            document.querySelector('.playername').innerHTML = data.player_name;
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
        // Optionally, display an error message to the user
        document.querySelector('.response').innerHTML = 'An error occurred: ' + error.message;
        document.querySelector('.response').classList.toggle('hide');
    });

    changeUI(create_delete_back,mainUI,true);
});

signup_UI.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = new FormData(this);

    fetch('signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        document.querySelector('.response').innerHTML = data.message;
        document.querySelector('.response').classList.toggle('hide');
        signup_ign.value = "";
        signup_player_name.value = "";
        signup_password.value = "";
        signup_confirm.value = "";
        setTimeout(() => {
            document.querySelector('.response').classList.toggle('hide');
        }, 4000);
    })
    .catch(error => console.error('Error:', error));
    changeUI(signup_UI,mainUI,true);
});


    
    








