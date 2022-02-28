const answer = "UDAAN";
var guess = [];
var guess_;
var currentLevel = 1;
var currentBox = 1;

var colors = ["#54514a","#e0c40b","#359103"];
var textColor = ["#21241f","#f0f8ff"];
const delay = 100;
// elements

var testing = ['U','D','A','A','N'];


// listeners

document.documentElement.addEventListener('keydown',handleKeys,false);

document.addEventListener('DOMContentLoaded', (event) => {
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
});

function handleKeys(e) {


    let inp ="";

    if (typeof e === 'string') {
        inp = e;
    }
    else{
        inp = e.key;
    }

    console.log(inp);

    if (guess_!==answer && currentLevel<=6){
        // document.documentElement.removeEventListener('keydown');
        // console.log("still guessing");
    
        if (isLetter(inp)) {
            if (currentBox<=5) {
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
            currentBox-=1;
        }
        else if (inp === 'Enter') {
            if (currentBox<=5) {
                // display too short message
            }
            else {
                currentBox = 1;
                submit(guess);
                guess_ = guess.join('');
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

// functions

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
    currentBox+=1;
}

function submit(guess) {
    console.log(guess);
    for(let i = 0; i<guess.length; i++) {
        if (guess[i]===answer[i]) {
            colorBox(i, colors[2]);
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
            }
            else{
                colorBox(i, colors[0]);
            }
        }
        // await sleep(delay);
    }
}

function colorBox(boxNum, color) {
    let row = document.querySelector(".row-"+(currentLevel));
    console.log(boxNum,row.children[boxNum]);
    let box = row.children[boxNum];
    if (color === colors[0]) {
        box.style.animation = "grey 0.5s ease";
    }
    else if (color === colors[1]) {
        box.style.animation = "yellow 0.5s ease";
    }
    else {
        box.style.animation = "green 0.5s ease";
    }
    box.style.background = color;
    box.style.color = textColor[1];
}

