let audio2;
var audio3 = new Audio("/audios/music2.mp3");
var audio4 = new Audio("/audios/angry.mp3");
var audio5 = new Audio("/audios/yay.mp3")
let interval;

function checkInfo(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the password input value
    var username = document.getElementById("usernameText").value;
    var password = document.getElementById("passwordText").value;

    // Check if the password is correct (for demonstration purposes)
    if (username.toLowerCase() != "camila" || password.toLowerCase() != "pochacco") {
        // Password is incorrect, display an error message
        alert("Wrong Username or Password. Try Again You Dummy 👿👿👿.")
    }
    else {
        document.location.href="page2.html";  
    }
}

document.getElementById("start").addEventListener("mousedown", start, false);
document.getElementById("start").addEventListener("touchend", start, false);


function start (e) {
    // audio = new Audio("/audios/rizz.mp3")
    // audio.play();
    // audio2 = new Audio("/audios/music2.mp3")
    // audio2.play();
    document.getElementById("start").remove();
    document.body.style.background = "url(/images/b4.jpg)"
    document.getElementById("q").style.visibility = 'visible'
    document.getElementById("ask").removeAttribute("hidden")
    document.getElementById("yes").removeAttribute("hidden")
    document.getElementById("no").removeAttribute("hidden")
    document.body.style.backgroundSize = "cover"
    // interval = setInterval(music, 30000)


}

function music () {
    // audio3.play();   
}


document.getElementById("yes").addEventListener("mousedown", saidYes, false);
document.getElementById("yes").addEventListener("touchend", saidYes, false);

function saidYes (e) {
    // audio2.pause();
    // audio3.pause();
    audio4.pause();
    clearInterval(interval)
    let audio5 = new Audio("/audios/yay.mp3")
    audio5.play();
    document.getElementById("q").style.visibility = 'hidden'
    document.getElementById("m").style.visibility = 'hidden'
    document.getElementById("y").style.visibility = 'visible'
    document.getElementById("prize").style.visibility = 'visible'
    document.getElementById("prize").innerHTML = "YAY I love you! 😁"
    let num = makeid(7)
}

document.getElementById("no").addEventListener("mousedown", saidNo, false);
document.getElementById("no").addEventListener("touchend", saidNo, false);

function saidNo (e) {
    // audio2.pause();
    // audio3.pause();
    audio5.pause();
    clearInterval(interval)
    let audio4 = new Audio("/audios/angry.mp3")
    audio4.play();
    document.getElementById("q").style.visibility = 'hidden'
    document.getElementById("y").style.visibility = 'hidden'
    // document.getElementById("prize").style.visibility = 'hidden'
    document.getElementById("prize").style.visibility = 'visible'
    document.getElementById("m").style.visibility = 'visible'
    document.getElementById("prize").innerHTML = "I see ☹️"

}



function forgotUser() {
    alert("what do i call you 🙈 (nombre)")
}

function forgotPass() {
    alert("who am i 🙈 (hint left)")
}


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}