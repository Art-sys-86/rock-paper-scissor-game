class game{
    constructor(){
        this.userChoice = "";
        this.computerChoice = "";
        this.userScore = 0;
        this.computerScore = 0;
        this.tieScore = 0;
        this.round = 0;
        this.usedPowerUp = false;
        this.powerUpNo = 0;
        this.choice = ["rock", "paper","scissor"];
        this.wrongImg = document.querySelectorAll('.wrong');
        this.winVideo = [
            'assets/winMeme1.webm',
            'assets/winMeme2.webm',
            'assets/winMeme3.webm'
        ];
        this.loseVideo = [
            'assets/memeLose1.webm',
            'assets/memeLose2.webm',
            'assets/memeLose3.webm'
        ];
        this.easterEggVid = [
            'assets/memeTie.webm',
            'assets/easterEgg1.webm',
            'assets/easterEgg2.webm'
        ]
        this.powerUpVid = [
            'assets/power1.webm',
            'assets/power2.webm',
            'assets/power3.webm',
            'assets/explode.webm'
        ]
    
    }

    restart(){
        this.displayHide();
        this.choice = ["rock", "paper", "scissor"];
        this.userChoice = '';
        this.computerChoice = '';
        this.userScore = 0;
        this.computerScore = 0;
        this.tieScore = 0;
        this.round = 0;
        this.usedPowerUp = false;
        this.powerUpNo = 0;
        this.wrongImg.forEach(element => {element.classList.add('displayHidden')});
        this.enableChoice();
        this.enablePower();
    }
    displayHide(){
        document.getElementById('userImg').classList.remove('choice');
        document.getElementById('userImg').classList.add('displayHidden');
        document.getElementById('computerImg').classList.remove('computerChoice');
        document.getElementById('computerImg').classList.add('displayHidden');
        announcer.forEach(element => {element.style.display = "none"});
    }

    displayShow(){
        const userImg = document.getElementById('userImg');
        userImg.classList.add('choice');
        userImg.classList.remove('displayHidden');
        userImg.src = `Assets/${this.userChoice}.svg`; 
        const computerImg = document.getElementById('computerImg');
        computerImg.classList.remove('displayHidden');
        computerImg.classList.add('computerChoice')
        computerImg.src = `Assets/${this.computerChoice}.svg`;
        announcer.forEach(element => {element.style.display = "block"});
    }

    playVideo(videoRef, videoclass, videoSrc){
        this.disableChoice();
        this.disablePower();
        videoRef.classList.remove('displayHidden');
        videoRef.classList.add(videoclass);
        this.displayHide();
        videoRef.src = videoSrc;
        videoRef.muted = false;
        videoRef.play();

        videoRef.onended = () => {
        videoRef.classList.add('displayHidden');
        videoRef.classList.remove(videoclass);
        if (this.userScore >= 3 || this.computerScore >= 3) {
            this.endGame();
        } else {
            this.displayShow();
            this.enableChoice();
            this.enablePower();
        }
    }
    }

    updateScoreDisplay(){
        document.getElementById('tie').textContent = `Tie Score: ${this.tieScore}`;
        document.getElementById('userPoint').textContent = `Your Score: ${this.userScore}`;
        document.getElementById('computerPoint').textContent = `Computer Score: ${this.computerScore}`;
        document.getElementById('roundCounter').textContent = `Round ${this.round}`;
    }

    resultUpdate(userResult, loserResult){
        document.getElementById('userAnnounced').textContent = userResult;
        document.getElementById('computerAnnounced').textContent = loserResult;
    }
    
    result(){
        this.disableChoice();
        this.disablePower();
        this.checkPower();
        this.round++;
        this.computerChoice = this.choice[Math.floor(Math.random() * this.choice.length)]
        if(this.userChoice === this.computerChoice){
            this.tieScore++;
            if(this.tieScore <= 1){
            setTimeout(() => {
                this.resultUpdate("Tie", "Tie");
                this.enableChoice();
                this.enablePower();
            }, 500)
            }
            else if(this.tieScore >= 2){
                setTimeout(() => {
                    this.resultUpdate("Tie", "Tie");
                    this.displayHide();
                    this.playVideo(bigVideo, 'bigVideo', this.easterEggVid[0]);
                }, 2000)
            }
        }
        else if (
        (this.userChoice === "rock" && this.computerChoice === "scissor") ||
        (this.userChoice === "paper" && this.computerChoice === "rock") ||
        (this.userChoice === "scissor" && this.computerChoice === "paper")
        ) {
            this.userScore++;
            setTimeout(() => {
                    this.resultUpdate("WinneR", "LoseR");
                    this.displayHide();
                    this.playVideo(memeVid, 'memeVid', this.winVideo[this.userScore - 1]);
                }, 2000);
        }
        else{
            this.computerScore++;
            setTimeout(() => {
                    this.resultUpdate("LoseR", "WinneR");
                    this.displayHide();
                    this.playVideo(memeVid, 'memeVid', this.loseVideo[this.computerScore - 1]);
                }, 2000);
        }
        this.updateScoreDisplay();
        this.easterEgg();
        this.endGame();
    }
    
    checkPower(){
    this.disableChoice();
    this.disablePower();
    this.wrongImg.forEach(element => {element.classList.add('wrong')});
    const powerUpVideo = document.getElementById('powerUpVid');
    if(this.usedPowerUp && this.powerUpNo === 2) {
        this.updateScoreDisplay();
        this.usedPowerUp = false; 
        this.powerUpNo = 0; 
        return;
    }

    if(this.powerUpNo === 1){
        this.choice = ["rock", "rock", "rock", "scissor"];
        this.playVideo(powerUpVideo, 'powerUpVideo', this.powerUpVid[0])
    }
    else if(this.powerUpNo === 2){
        if(this.tieScore >= 1 && this.computerScore >= 1){
            this.userScore++;
            this.computerScore--;
            this.tieScore--;
            this.playVideo(powerUpVideo, 'powerUpVideo', this.powerUpVid[1])
        }
        else{
            this.usedPowerUp = false;
            this.wrongImg.forEach(element => {element.classList.add('displayHidden')});
        }
    }
    else if(this.powerUpNo === 3){
        this.playVideo(powerUpVideo, 'powerUpVideo', this.powerUpVid[2])
        document.getElementById('screenHold').style.display = "none";
        resetButton.classList.remove('displayHidden');
        resetButton.classList.add('reset');
    }
    else{
        this.usedPowerUp = false;
        this.wrongImg.forEach(element => {element.classList.add('displayHidden')});
        this.enableChoice();
        this.enablePower();
    }
}
    
    easterEgg(){
        if(this.userScore === 3 && this.userChoice === "rock" && this.computerChoice === "scissor"){
            this.playVideo(bigVideo, 'bigVideo', this.easterEggVid[1]);
            this.endGame();
        }
        else if(this.computerScore === 3 && this.userChoice === "paper" && this.computerChoice === "scissor"){
            this.playVideo(bigVideo, 'bigVideo', this.easterEggVid[2]);
            this.endGame();
        }
    }
    
    endGame(){
        if(this.userScore >= 3 || this.computerScore >= 3){
            this.disableChoice();
            this.displayHide();
            this.disablePower();
            this.confettiShow();
            resetButton.classList.remove('displayHidden');
            resetButton.classList.add('reset');
            return;
        }
    }
    
    disableChoice(){
        rock.disabled = true;
        paper.disabled = true;
        scissor.disabled = true;
    }

    enableChoice(){
        rock.disabled = false;
        paper.disabled = false;
        scissor.disabled = false;
    }

    disablePower(){
        power1.disabled = true;
        power2.disabled = true;
        power3.disabled = true;
    }

    enablePower(){
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
    videogame.displayShow();
})

paper.addEventListener('click', ()=> {
    videogame.userChoice = "paper";
    videogame.result();
    videogame.displayShow();
})
scissor.addEventListener('click', ()=> {
    videogame.userChoice = "scissor";
    videogame.result();
    videogame.displayShow();
})

resetButton.addEventListener('click', () => {
    resetButton.classList.add('displayHidden');
    videogame.restart();
})

power1.addEventListener('click', ()=> {
    videogame.powerUpNo = 1;
    videogame.checkPower();
})

power2.addEventListener('click', ()=> {
    if(videogame.tieScore <= 0 || videogame.computerScore <= 0){
        return;
    }
    else{
    videogame.powerUpNo = 2;
    videogame.checkPower();
    }
    
})

power3.addEventListener('click', ()=> {
    videogame.disableChoice();
    videogame.disablePower();
    videogame.playVideo(explode, 'explode', videogame.powerUpVid[3]);
})