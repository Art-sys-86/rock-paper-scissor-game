const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
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
const computerText = document.getElementById('computerAnnounced');
const resetButton = document.getElementById('reset');
const choice = ["rock", "paper", "scissor"];


class game{
constructor(userChoice, computerChoice){
    this.userChoice = userChoice;
    this.computerChoice = computerChoice;
    this.userScore = 0;
    this.computerScore = 0;
    this.tieScore = 0;
    this.round = 0;
    bigVideo.addEventListener('ended', ()=> {
        bigVideo.classList.add('displayHidden');
        bigVideo.classList.remove('bigVideo');
        bigVideo.muted = true;
        this.enable();
        })
    memeVid.addEventListener('ended', ()=>{
        if(this.userScore >= 3 || this.computerScore >= 3){
            this.disable();
            memeVid.classList.add('displayHidden');
            memeVid.classList.remove('memeVideo');
            imgHandler.classList.add('choice');
            imgHandler.classList.remove('displayHidden');
            resetButton.classList.add('reset');
            memeVid.muted = true;
        }
        else{
        memeVid.classList.add('displayHidden');
        memeVid.classList.remove('memeVideo');
        imgHandler.classList.add('choice');
        imgHandler.classList.remove('displayHidden');
        memeVid.muted = true;
        this.enable();
        }
        
    })
}

restart(){
    this.userScore = 0;
    this.computerScore = 0;
    this.tieScore = 0;
    this.userChoice = '';
    this.computerChoice = '';
    this.round = 1;
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
    }, 3000);
}

result(){
    let user = this.userChoice;
    this.computerChoice = choice[Math.floor(Math.random() * choice.length)];
    let computer = this.computerChoice;
    this.round++;
    document.getElementById('roundCounter').textContent = `Round ${this.round}`;
    if(user === computer){
        this.disable();
        setTimeout(() => {
            this.tieScore++;
            tiePoint.textContent = `Tie Score: ${this.tieScore}`;
            userText.textContent = `TIE!`;
            computerText.textContent = `TIE!`;
        }, 500)
        setTimeout(() => {
            bigVideo.classList.remove('displayHidden');
            bigVideo.classList.add('bigVideo');
            bigVideo.muted = false;
            bigVideo.play();
        }, 1500)
    }
    else if(user === "rock" && computer === "scissor"){
        this.disable();
        setTimeout(() => {
            this.userScore++;
            userPoint.textContent = `Your Score: ${this.userScore}`;
            userText.textContent = `WINNER!`;
            computerText.textContent = `LOSER!`;
        }, 500);
        this.memeVideo();
        if(this.userScore >= 3){
        this.disable();
        this.confettiShow();
        return;
        }
    }
    else if(user === "scissor" && computer === "paper"){
        this.disable();
        setTimeout(() => {
            this.userScore++;
            userPoint.textContent = `Your Score: ${this.userScore}`;
            userText.textContent = `WINNER!`;
            computerText.textContent = `LOSER!`;
        }, 500);
        this.memeVideo();
        if(this.userScore >= 3){
        this.disable();
        this.confettiShow();
        return;
        }
    }
    else if(user === "paper" && computer === "rock"){
        this.disable();
        setTimeout(() => {
            this.userScore++;
            userPoint.textContent = `Your Score: ${this.userScore}`;
            userText.textContent = `WINNER!`;
            computerText.textContent = `LOSER!`;
        }, 500);
        this.memeVideo();
        if(this.userScore >= 3){
        this.disable();
        this.confettiShow();
        return;
        }
        
    }
    else{
        this.computerScore++;
        computerPoint.textContent = `Computer Score: ${this.computerScore}`;
        userText.textContent = `LOSER!`;
        computerText.textContent = `WINNER!`;
        this.disable();
        this.memeLoseVid();
        if (this.computerScore >= 3) {
        this.confettiShow();
        this.disable();
    }
    }
    
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
        setTimeout(() => {
            memeVid.classList.remove('displayHidden');
            memeVid.classList.add('memeVideo');
            imgHandler.classList.add('displayHidden');
            memeVid.src = `Assets/winMeme${this.userScore}.webm`;
            memeVid.muted = false;
            memeVid.play();
    }, 1500);
}

memeLoseVid(){
    this.disable();
    setTimeout(() => {
        memeVid.classList.remove('displayHidden');
        memeVid.classList.add('memeVideo');
        imgHandler.classList.add('displayHidden');
        memeVid.src = `Assets/memeLose${this.computerScore}.webm`;
        memeVid.muted = false;
        memeVid.play();
    }, 1500);
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