// elements

var era = null;
const answer = "SAILAAB";
const num_guesses = 6;
var penalty = 0;
var guess = [];
var guess_;
var currentLevel = 1;
var currentBox = 1;

const colors = ["#54514a","#e0c40b","rgb(125,183,0)"];
const textColor = ["#21241f","#f0f8ff"];
const finished = ["brilliant!","magnificent!","great work!","well done!","spot on!","correct!","no attempts left!","you lost!"];
const delay = 100;

const movies2000 = ["race","jabwemet","faltu","jannat","fanaa","partner","murder2","dhoom2",""]

let cluebox = document.querySelector(".message-box2");

// listeners

document.addEventListener('DOMContentLoaded', (event) => {

    // choose era pop up
    // document.querySelector(".container").style.display = "none";
    // document.querySelector(".era").style.display = "flex";
    // document.querySelector(".era").style.opacity = "1";
    // document.querySelector(".era-1990").addEventListener("click", function() {
    //     setEra("1990");
    //     activateKeyboard();
    // });
    // document.querySelector(".era-2000").addEventListener("click", function() {
    //     setEra("2000");
    //     activateKeyboard();
    // });
    // document.querySelector(".era-2010").addEventListener("click", function() {
    //     setEra("2010");
    //     activateKeyboard();
    // });

    activateKeyboard();

    cluebox.addEventListener("click", async function() {
        clueNeeded(cluebox);
    });

    // choose song


});

// functions

function activateKeyboard() {

    document.documentElement.addEventListener('keydown',handleKeys,false);

    // activate keyboard
    let keyb_rows = document.querySelector(".keyboard").children;
    for (let i=0;i<keyb_rows.length;i++) {
        let keys = (keyb_rows[i].children);
        for(let j=0;j<keys.length;j++) {
            // console.log(keys[j]);
            keys[j].addEventListener("click",function() {
                handleKeys(keys[j].className);
            });
        }
    }
}

async function clueNeeded(cb) {
    cb.style.transform = "scale(0.2,0.17)";
    await sleep(100);
    cb.style.opacity = "0";
    cb.style.display = "none";
    
    if (currentLevel>=num_guesses-penalty) {
        let messageBox = document.querySelector(".message-box");
        let message = messageBox.firstChild;
        message.innerHTML = finished[num_guesses];
        messageBox.style.display = "flex";
        document.documentElement.removeEventListener('keydown',handleKeys,false);
    }
    else {
        document.querySelector(".clue2").style.display = "flex";
        await sleep(100);
        document.querySelector(".clue2").style.opacity = "1";
        document.querySelector(".row-"+num_guesses).style.opacity = "0";
        document.querySelector(".row-"+num_guesses).style.display = "hidden";
        penalty = 1;
    }
}

async function setEra(input_era) {
    era = input_era;
    document.querySelector(".era").style.opacity = "0";
    await sleep(500);
    document.querySelector(".era").style.display = "none";
    document.querySelector(".container").style.display = "flex";
    await sleep(200);
    document.querySelector(".container").style.opacity = "1";
    // document.querySelector(".era-text").innerHTML = "'"+era.slice(2);
    // console.log(era);
}

function handleKeys(e) {

    let messageBox = document.querySelector(".message-box");
    let message = messageBox.firstChild;

    let inp ="";

    if (typeof e === 'string') {
        inp = e;
    }
    else{
        inp = e.key;
    }
    
    console.log(inp);

    if (guess_!==answer && currentLevel<=num_guesses-penalty){
        messageBox.style.display = "none";

        // document.documentElement.removeEventListener('keydown');
        // console.log("still guessing");
    
        if (isLetter(inp)) {
            if (currentBox<=answer.length) {
                let key = inp.toUpperCase();
                guess.push(key);
                updateLevel(key)
            }
        }
        else if (inp === 'Backspace' && currentBox>1) {
            let row = document.getElementsByClassName("row-"+(currentLevel))[0];
            let box = row.children[currentBox-2];
            guess.pop(box.innerHTML);
            box.innerHTML = "";
            box.style.animation = "none";
            currentBox-=1;
        }
        else if (inp === 'Enter') {
            if (currentBox<=answer.length) {
                message.innerHTML = "too short!";
                messageBox.style.display = "flex";
            }
            else {
                currentBox = 1;
                submit(guess);
                guess_ = guess.join('');
                if (guess_ === answer) {
                    message.innerHTML = finished[currentLevel-1];
                    messageBox.style.display = "flex";
                    document.documentElement.removeEventListener('keydown',handleKeys,false);
                }
                else if (currentLevel==num_guesses-penalty){
                    message.innerHTML = finished[num_guesses+1];
                    messageBox.style.display = "flex";
                    // messageBox.before.style.width = messageBox.style.width;
                    document.documentElement.removeEventListener('keydown',handleKeys,false);
                }
                guess = [];
                currentLevel+=1;
            }
        }
    }
    else {
        // console.log("yessir");
        document.documentElement.removeEventListener('keydown',handleKeys,false);
    }
    // console.log(e.key);
}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function isLetter(str) {
    return str.length === 1 && str.match(/[A-Z]/i);
  }

function updateLevel(letter) {
    let row = document.getElementsByClassName("row-"+(currentLevel))[0];
    let box = row.children[currentBox-1];
    box.innerHTML = letter;
    box.style.color = textColor[0];
    box.style.animation = "zoom-in-out 0.1s ease 2 alternate";
    currentBox+=1;
}

function submit(guess) {
    // console.log(guess);
    for(let i = 0; i<guess.length; i++) {
        if (guess[i]===answer[i]) {
            colorBox(i, colors[2]);
            colorKey(guess[i],colors[2]);
        }
        else {
            let count = 0;
            for (let j=0; j<answer.length; j++) {
                if(guess[i] === answer[j]) {
                    count+=1;
                }
            }
            if (count>0) {
                colorBox(i, colors[1]);
                colorKey(guess[i],colors[1]);
            }
            else{
                colorBox(i, colors[0]);
                colorKey(guess[i],colors[0]);
            }
        }
        // await sleep(delay);
    }
}

function colorBox(boxNum, color) {
    let row = document.querySelector(".row-"+(currentLevel));
    // console.log(boxNum,row.children[boxNum]);
    let box = row.children[boxNum];
    if (color === colors[0]) {
        box.style.animation = "grey 0.8s ease";
    }
    else if (color === colors[1]) {
        box.style.animation = "yellow 0.8s ease";
    }
    else {
        box.style.animation = "green 0.8s ease";
    }
    box.style.background = color;
    box.style.color = textColor[1];
}

function colorKey(key, color) {
    let key_ = document.querySelector("."+key.toLowerCase());
    if (color === colors[0]) {
        key_.style.animation = "grey 0.8s ease";
    }
    else if (color === colors[1]) {
        key_.style.animation = "yellow 0.8s ease";
    }
    else {
        key_.style.animation = "green 0.8s ease";
    }
    key_.style.background = color;
    key_.style.color = textColor[1];
}

