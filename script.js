const button = document.getElementById('play');
const options = document.getElementById('options');
const header = document.getElementById('header');

const width = document.getElementById('width');
const height = document.getElementById('height');
const circleSize = document.getElementById('cs');
const approachRate = document.getElementById('ar');
const score = document.getElementById('local-score');
const percentage = document.getElementById('percentage')

const bodyWidth = document.body.getBoundingClientRect().width;
const left = (bodyWidth - width.value) /2;
const right = left + Number(width.value);
const marginTop = 100
const bottom = marginTop + Number(height.value);

const gameTime = 10000;
let targetClicked = 0;

let boolcanSpawn = true

function play(){
    score.innerHTML = 0;
    percentage.innerHTML = 0;
    targetClicked = 0
    button.style.display = "none";
    options.style.display = "none";
    header.style.display = "none";
    const box = document.createElement("div");
    box.classList.add('box');
    box.id = "box";
    box.style.width = `${width.value*1}px`;
    box.style.height = `${height.value*1}px`;
    box.style.marginTop = `${marginTop}px`
    console.log(height.value, width.value);
    document.body.appendChild(box);
    game()
    setInterval(() => {
        document.body.removeChild(box)
        const targ = document.querySelector('.target')
        document.body.removeChild(targ)
    }, gameTime)

}

function display(){
    button.style.display = "flex";
    options.style.display = "flex";
    header.style.display = "flex";

}

function spawn(){
    if (!boolcanSpawn){return;}
    boolcanSpawn = false;
    const target = document.createElement("div");
    target.style.width = `${circleSize.value}px`
    target.style.animationDuration = `${approachRate.value}ms`
    const localleft = Math.floor(Math.random() * (right - left * 1.2) + left*0.8)
    const localtop = Math.floor(Math.random()  * (bottom - marginTop * 1.2) + marginTop*0.8)
    target.classList.add("target");
    target.style.top = `${localtop}px`;
    target.style.left = `${localleft}px`;
    document.body.appendChild(target)
    const clicked = () => {
        removeEventListener('mousedown', clicked);
        document.body.removeChild(target);
        score.innerHTML = Number(score.innerHTML) + 1;
        targetClicked += 1
        percentage.innerHTML = ((Number(score.innerHTML) / targetClicked) * 100).toFixed(1);

        
    }
    target.addEventListener('mousedown', clicked)
    const timeout = setTimeout(() => {
        document.body.removeChild(target);
        targetClicked += 1;
        percentage.innerHTML = ((Number(score.innerHTML) / targetClicked) * 100).toFixed(1);
    }, approachRate.value)
    setInterval(() => {
    }, gameTime)
}


function game(){
    spawn()
    const interval = setInterval(canSpawn, 50)
    setTimeout(() => {
        clearInterval(interval);
        display();
    }, gameTime)
}

function canSpawn(){
    
    const targets = document.querySelectorAll(".target");
    if (targets.length == 0){
        boolcanSpawn = true;
        spawn()
    }
}



