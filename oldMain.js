const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
const power1 = document.getElementById('power1');
const power2 = document.getElementById('power2');
const power3 = document.getElementById('power3');
const userBox = document.getElementById('userBox');
const announcer = document.querySelectorAll('.annouced');
const imgHandler = document.getElementById('imgHandle');
const computerImg = document.getElementById('computerImg');
const userPoint = document.getElementById('userPoint');
const computerPoint = document.getElementById('computerPoint');
const tiePoint = document.getElementById('tie');
const userText = document.getElementById('userAnnounced');
const bigVideo = document.getElementById('bigVideo');
const memeVid = document.getElementById('meme');
const powerUpVid = document.getElementById('powerUpVid');
const computerText = document.getElementById('computerAnnounced');
const resetButton = document.getElementById('reset');
const wrong1 = document.getElementById('wrong1');
const wrong2 = document.getElementById('wrong2');
const wrong3 = document.getElementById('wrong3');
const explode = document.getElementById('explode');
let choice = ["rock", "paper", "scissor"];


class game{
constructor(userChoice, computerChoice){
    this.userChoice = userChoice;
    this.computerChoice = computerChoice;
    this.userScore = 2;
    this.computerScore = 2;
    this.tieScore = 0;
    this.round = 0;
    this.powerUpNo = 0;
    this.usedPowerUp = false;
    bigVideo.addEventListener('ended', ()=> {
        bigVideo.classList.add('displayHidden');
        bigVideo.classList.remove('bigVideo');
        bigVideo.muted = true;
        if(this.userScore >= 3 || this.computerScore >= 3){
            this.disable();
            this.powerUpDisable();
            this.confettiShow();
            bigVideo.classList.add('displayHidden');
            bigVideo.classList.remove('memeVideo');
            imgHandler.classList.add('displayHidden');
            imgHandler.classList.remove('choice');
            computerImg.classList.add('displayHidden');
            resetButton.classList.add('reset');
            resetButton.classList.remove('displayHidden');
            memeVid.muted = true;
        }
        else {
        imgHandler.classList.remove('displayHidden');
        imgHandler.classList.add('choice');
        computerImg.classList.remove('displayHidden');
        computerImg.classList.add('computerChoice');
        this.enable();
        this.powerUpEnable();
    }
        });
    powerUpVid.addEventListener('ended', ()=> {
        powerUpVid.classList.add('displayHidden');
        powerUpVid.classList.remove('powerUpVideo');
        imgHandler.classList.remove('displayHidden');
        computerImg.classList.remove('displayHidden');
        powerUpVid.muted = true;
        this.enable();
        this.powerUpEnable();
        if (this.userScore >= 3) {
        this.disable();
        memeVid.classList.remove('displayHidden');
        memeVid.classList.add('memeVideo');
        imgHandler.classList.remove('choice');
        imgHandler.classList.add('displayHidden');
        memeVid.src = `Assets/winMeme3.webm`;
        memeVid.muted = false;
        memeVid.play();
    } 
        else if (this.computerScore >= 3) {
        memeVid.classList.remove('displayHidden');
        memeVid.classList.add('memeVideo');
        imgHandler.classList.add('displayHidden');
        memeVid.src = `Assets/winMeme3.webm`;
        memeVid.muted = false;
        memeVid.play();
    } 
        else {
        this.enable();
        this.powerUpEnable();
    }
    })
    explode.addEventListener('ended', () =>{
        resetButton.classList.remove('displayHidden');
        resetButton.classList.add('reset');
    })
    memeVid.addEventListener('ended', ()=>{
        if(this.userScore >= 3 || this.computerScore >= 3){
            this.disable();
            this.powerUpDisable();
            this.confettiShow();
            memeVid.classList.add('displayHidden');
            memeVid.classList.remove('memeVideo');
            imgHandler.classList.add('displayHidden');
            imgHandler.classList.remove('choice');
            computerImg.classList.add('displayHidden');
            resetButton.classList.add('reset');
            resetButton.classList.remove('displayHidden');
            memeVid.muted = true;
            
        }
        else{
        memeVid.classList.add('displayHidden');
        memeVid.classList.remove('memeVideo');
        imgHandler.classList.add('choice');
        imgHandler.classList.remove('displayHidden');
        memeVid.muted = true;
        this.enable();
        this.powerUpEnable();
        }
        
    })
}

restart(){
    this.userScore = 0;
    this.computerScore = 0;
    this.tieScore = 0;
    this.userChoice = '';
    this.computerChoice = '';
    this.usedPowerUp = false;
    this.round = 1;
    this.enable();
    this.powerUpEnable();
    choice = ["rock", "paper", "scissor"];
    explode.classList.add('displayHidden')
    wrong1.classList.remove('wrong1');
    wrong1.classList.add('displayHidden');
    wrong2.classList.remove('wrong2');
    wrong2.classList.add('displayHidden');
    wrong3.classList.remove('wrong3');
    wrong3.classList.add('displayHidden');
    clearInterval(this.confettiInterval);
    document.getElementById('roundCounter').textContent = ``;
    imgHandler.classList.add('displayHidden');
    computerImg.classList.add('displayHidden');
    announcer.forEach(element => {
        element.style.display = "none";
    });
    tiePoint.textContent = `Tie Score: 0`;
    userPoint.textContent = `Your Score: 0`;
    computerPoint.textContent = `Computer Score: 0`;
    setTimeout(() =>{
        rock.disabled = false;
        paper.disabled = false;
        scissor.disabled = false;
    }, 0);
}

checkPower(){
    if(this.powerUpNo === 1){
        choice = ["rock", "rock", "rock", "scissor"];
    }
    else if(this.powerUpNo === 2){
        if(this.tieScore >= 1 && this.computerScore >= 1){
            this.userScore++;
            this.computerScore--;
            this.tieScore--;
        }
        else{
            this.usedPowerUp = false;
        }
    }
    else if(this.powerUpNo === 3){
        document.getElementById('screenHold').style.display = "none";
    }
    else{
        this.usedPowerUp = false;
    }
}

result(){
    if(this.usedPowerUp && this.powerUpNo === 2) {
        userPoint.textContent = `Your Score: ${this.userScore}`;
        computerPoint.textContent = `Computer Score: ${this.computerScore}`;
        tiePoint.textContent = `Tie Score: ${this.tieScore}`;
        this.usedPowerUp = false; 
        this.powerUpNo = 0; 
        return;
    }

    let user = this.userChoice;
    this.computerChoice = choice[Math.floor(Math.random() * choice.length)];
    let computer = this.computerChoice;
    this.round++;
    document.getElementById('roundCounter').textContent = `Round ${this.round}`;
    if(user === computer){
        this.tieScore++;
        this.disable();
        if(this.tieScore <= 1){
        setTimeout(() => {
            tiePoint.textContent = `Tie Score: ${this.tieScore}`;
            userText.textContent = `TIE!`;
            computerText.textContent = `TIE!`;
            this.enable();
        }, 500);
        }
        else if(this.tieScore >= 2){
    this.disable();
    this.powerUpDisable();
    setTimeout(() => {
        tiePoint.textContent = `Tie Score: ${this.tieScore}`;
        userText.textContent = `TIE!`;
        computerText.textContent = `TIE!`;
        imgHandler.classList.add('displayHidden');
        computerImg.classList.add('displayHidden');
        bigVideo.classList.remove('displayHidden');
        bigVideo.classList.add('bigVideo');
        bigVideo.src = 'Assets/memeTie.webm';
        bigVideo.muted = false;
        bigVideo.play();
    }, 2000);
}
    }

    else if(user === "rock" && computer === "scissor"){
        this.disable();
        this.userScore++;
        setTimeout(() => {
            userPoint.textContent = `Your Score: ${this.userScore}`;
            userText.textContent = `WINNER!`;
            computerText.textContent = `LOSER!`;
        }, 500);
        this.memeVideo();
    }

    else if(user === "scissor" && computer === "paper"){
        this.disable();
        this.userScore++;
        setTimeout(() => {
            userPoint.textContent = `Your Score: ${this.userScore}`;
            userText.textContent = `WINNER!`;
            computerText.textContent = `LOSER!`;
        }, 500);
        this.memeVideo();
    }

    else if(user === "paper" && computer === "rock"){
        this.disable();
        this.userScore++;
        setTimeout(() => {
            userPoint.textContent = `Your Score: ${this.userScore}`;
            userText.textContent = `WINNER!`;
            computerText.textContent = `LOSER!`;
        }, 500);
        this.memeVideo();
    }

    else{
        this.computerScore++;
        computerPoint.textContent = `Computer Score: ${this.computerScore}`;
        userText.textContent = `LOSER!`;
        computerText.textContent = `WINNER!`;
        this.disable();
        this.powerUpDisable();
        this.memeLoseVid();
    }
    choice = ["rock", "paper", "scissor"];
}

display(){
        imgHandler.src = `Assets/${this.userChoice}.svg`;
        imgHandler.classList.remove('displayHidden');
        imgHandler.classList.add('choice');
        computerImg.src = `Assets/${this.computerChoice}.svg`;
        computerImg.classList.remove('displayHidden');
        computerImg.classList.add('computerChoice');
        announcer.forEach(element => {
            element.style.display = "block";
        });
}

memeVideo(){
    this.disable();
    this.powerUpDisable();
    if(this.userScore === 3 && this.userChoice === "rock" &&  this.computerChoice === "scissor"){
        this.powerUpDisable();
        this.disable();
        setTimeout(() => {
            bigVideo.classList.remove('displayHidden');
            bigVideo.classList.add('memeVideo');
            imgHandler.classList.add('displayHidden');
            bigVideo.src = `Assets/easterEgg1.webm`;
            bigVideo.muted = false;
            bigVideo.play();
    }, 2500);
    }
    else{
        setTimeout(() => {
            memeVid.classList.remove('displayHidden');
            memeVid.classList.add('memeVideo');
            imgHandler.classList.add('displayHidden');
            memeVid.src = `Assets/winMeme${this.userScore}.webm`;
            memeVid.muted = false;
            memeVid.play();
    }, 2500);
    }
}

memeLoseVid(){
    this.disable();
    this.powerUpDisable();
    if(this.computerScore === 3 && this.computerChoice === "scissor" && this.userChoice === "paper"){
        this.disable();
        setTimeout(() => {
            bigVideo.classList.remove('displayHidden');
            bigVideo.classList.add('memeVideo');
            imgHandler.classList.add('displayHidden');
            bigVideo.src = `Assets/easterEgg2.webm`;
            bigVideo.muted = false;
            bigVideo.play();
        }, 2500);
    }
    else if(this.computerScore === 3){
        this.disable();
        setTimeout(() => {
            bigVideo.classList.remove('displayHidden');
            bigVideo.classList.add('memeVideo');
            imgHandler.classList.add('displayHidden');
            bigVideo.src = `Assets/memeLose3.webm`;
            bigVideo.muted = false;
            bigVideo.play();
        }, 2500)
        
    }
    else{
        setTimeout(() => {
        memeVid.classList.remove('displayHidden');
        memeVid.classList.add('memeVideo');
        imgHandler.classList.add('displayHidden');
        memeVid.src = `Assets/memeLose${this.computerScore}.webm`;
        memeVid.muted = false;
        memeVid.play();
    }, 2500);
    }
}

powerUp(){
    this.disable();
    this.checkPower();
    imgHandler.classList.add('displayHidden');
    imgHandler.classList.remove('choice');
    announcer.forEach(element => {
            element.style.display = "none";
    });
    if(this.usedPowerUp){
        this.enable();
        return;
    }
    else{
        this.usedPowerUp = true;
        this.powerUpDisable();
        this.disable();
        setTimeout(() => {
            powerUpVid.classList.remove('displayHidden');
            powerUpVid.classList.add('powerUpVideo');
            powerUpVid.muted = false;
            powerUpVid.src = `Assets/Power${this.powerUpNo}.webm`;
            powerUpVid.play();
        }, 500)
        wrong1.classList.remove('displayHidden');
        wrong1.classList.add('wrong1');
        wrong2.classList.remove('displayHidden');
        wrong2.classList.add('wrong2');
        wrong3.classList.remove('displayHidden');
        wrong3.classList.add('wrong3');
        tiePoint.textContent = `Tie Score: ${this.tieScore}`;
        userPoint.textContent = `Your Score: ${this.userScore}`;
        computerPoint.textContent = `Computer Score: ${this.computerScore}`;
    }
}

disable(){
    rock.disabled = true;
    paper.disabled = true;
    scissor.disabled = true;
}

enable(){
    rock.disabled = false;
    paper.disabled = false;
    scissor.disabled = false;
}

powerUpDisable(){
    power1.disabled = true;
    power2.disabled = true;
    power3.disabled = true;
}

powerUpEnable(){
    power1.disabled = false;
    power2.disabled = false;
    power3.disabled = false;
}

confettiShow() {
const duration = 2 * 100;
const animationEnd = Date.now() + duration;
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

this.confettiInterval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
    clearInterval(this.confettiInterval);
    }

const particleCount = 50 * (timeLeft / duration);

confetti(Object.assign({}, defaults, {
    particleCount,
    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    }));
    confetti(Object.assign({}, defaults, {
    particleCount,
    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    }));
}, 50);
}


}


const videogame = new game();

rock.addEventListener('click', ()=> {
    videogame.userChoice = "rock";
    videogame.result();
    videogame.display();
})

paper.addEventListener('click', ()=> {
    videogame.userChoice = "paper";
    videogame.result();
    videogame.display();
})
scissor.addEventListener('click', ()=> {
    videogame.userChoice = "scissor";
    videogame.result();
    videogame.display();
})

resetButton.addEventListener('click', () => {
    resetButton.classList.add('displayHidden');
    videogame.restart();
})

power1.addEventListener('click', ()=> {
    videogame.powerUpNo = 1;
    videogame.checkPower();
    videogame.powerUp();
})

power2.addEventListener('click', ()=> {
    if(videogame.tieScore <= 0 || videogame.computerScore <= 0){
        return;
    }
    else{
    videogame.powerUpNo = 2;
    videogame.checkPower();
    videogame.powerUp();
    }
    
})

power3.addEventListener('click', ()=> {
    videogame.disable();
    videogame.powerUpDisable();
    wrong1.classList.remove('displayHidden');
    wrong1.classList.add('wrong1');
    wrong2.classList.remove('displayHidden');
    wrong2.classList.add('wrong2');
    wrong3.classList.remove('displayHidden');
    wrong3.classList.add('wrong3');
    setTimeout(() => {
            powerUpVid.classList.remove('displayHidden');
            powerUpVid.classList.add('powerUpVideo');
            powerUpVid.muted = false;
            powerUpVid.src = `Assets/Power3.webm`;
            powerUpVid.play();
        }, 50);
    setTimeout(() => {
            explode.classList.remove('displayHidden');
            explode.classList.add('bomb');
            explode.muted = false;
            explode.src = `Assets/explode.webm`;
            explode.play();
        }, 6000)
        
})