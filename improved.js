const resetButton = document.getElementById('reset');
const announcer = document.querySelectorAll('.annouced');
const bigVideo = document.getElementById('bigVideo');
const memeVid = document.getElementById('meme');
const powerUpVid = document.getElementById('powerUpVid');

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
        this.choice = ["rock", "paper", "scissor"];
        this.wrongImg = document.querySelectorAll('.wrong');
        this.wrongImg.forEach(element => {
            element.classList.add('displayHidden')
        }); //Hides the wrong image on the powerups
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

    //Hides the win lose texts and the choice image displayed. Used when the video is playing.

    displayHide(){
        document.getElementById('userImg').classList.remove('choice');
        document.getElementById('userImg').classList.add('displayHidden');
        document.getElementById('computerImg').classList.remove('computerChoice');
        document.getElementById('computerImg').classList.add('displayHidden');
        announcer.forEach(element => {element.style.display = "none"});
    }

    //As name suggest, it displays the win Lose and the choice images. Used in after the video ends

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

    //Below can be called to playVideo with the video reference, what class to add and where the source is

    playVideo(videoRef, videoclass, videoSrc){
        this.disableChoice();
        this.disablePower();
        videoRef.classList.remove('displayHidden');
        videoRef.classList.add(videoclass);
        this.displayHide();
        videoRef.src = videoSrc;
        videoRef.muted = false;
        videoRef.play();
        videoRef.addEventListener('ended', () =>{
            videoRef.classList.add('displayHidden');
            videoRef.classList.remove(videoclass);
        if (this.userScore >= 3 || this.computerScore >= 3) {
            this.endGame();
        } else {
            this.displayShow();
            this.enableChoice();
            this.enablePower();
        }
        });
    }
    
    //The code below update the score display by accessing the score defined at the top

    updateScoreDisplay(){
        document.getElementById('tie').textContent = `Tie Score: ${this.tieScore}`;
        document.getElementById('userPoint').textContent = `Your Score: ${this.userScore}`;
        document.getElementById('computerPoint').textContent = `Computer Score: ${this.computerScore}`;
        document.getElementById('roundCounter').textContent = `Round ${this.round}`;
    }

    //Below code is used to annouce the winner and loser text

    resultUpdate(userResult, loserResult){
        document.getElementById('userAnnounced').textContent = userResult;
        document.getElementById('computerAnnounced').textContent = loserResult;
    }

    //The code below, calculate the result and then play videos accordingly!

    result(){
        //Disabling and updating datas before calculations
        this.disableChoice();
        this.disablePower();
        this.round++;
        this.computerChoice = this.choice[Math.floor(Math.random() * this.choice.length)]
        let outcome = "";

        //Below calculate the result and send it to the constructor

        if(this.userChoice === this.computerChoice){
            this.tieScore++;
            outcome = "Tie";
        }
        else if (
        (this.userChoice === "rock" && this.computerChoice === "scissor") ||
        (this.userChoice === "paper" && this.computerChoice === "rock") ||
        (this.userChoice === "scissor" && this.computerChoice === "paper")
        ) {
            this.userScore++;
            outcome = "Win";
        }
        else{
            this.computerScore++;
            outcome = "Lose";
        }

        //This is where Video Playing logics goes based on result

        if(this.easterEgg()){
            return;
        }
        else if(outcome === "Tie"){
            if(this.tieScore >= 2){
        this.resultUpdate("Tie", "Tie");
            setTimeout(() => {
        this.playVideo(bigVideo, 'bigVideo', this.easterEggVid[0]);
        }, 2000);
            }
            else{
                this.resultUpdate("Tie", "Tie");
                this.displayShow();
                this.enableChoice();
            }
        }
        else if(outcome === "Win"){
        this.resultUpdate("Winner", "Loser");
            setTimeout(() => {
        this.playVideo(memeVid, 'memeVideo', this.winVideo[this.userScore - 1]);
            }, 2000)
        }
        else{
        this.resultUpdate("Loser", "Winner");
            setTimeout(() => {
        this.playVideo(memeVid, 'memeVideo', this.loseVideo[this.computerScore - 1]);
            }, 2000)
        }

        this.updateScoreDisplay();
        this.endGame();
        this.choice = ["rock", "paper", "scissor"];
    }

    showAllWrongs() {
    this.usedPowerUp = true;
    this.wrongImg.forEach(img => {
        img.classList.remove('displayHidden');
        img.classList.add('wrong');
    });
    this.disablePower();
    }

    checkPower(){
    if(this.usedPowerUp){
        return;
    }
    this.disableChoice();
    this.disablePower();
    const powerUpVideo = document.getElementById('powerUpVid');
    if(this.usedPowerUp && this.powerUpNo === 2) {
        this.updateScoreDisplay();
        this.usedPowerUp = false; 
        this.powerUpNo = 0; 
        return;
    }

    if(this.powerUpNo === 1){
        this.showAllWrongs();
        this.choice = ["rock", "rock", "rock", "scissor"];
        this.playVideo(powerUpVid, 'powerUpVideo', this.powerUpVid[0]);
        this.usedPowerUp = true;
    }
    else if(this.powerUpNo === 2){

        if(this.tieScore >= 1 && this.computerScore >= 1){
            this.showAllWrongs();
            this.userScore++;
            this.computerScore--;
            this.tieScore--;
            this.updateScoreDisplay();
            this.playVideo(powerUpVid, 'powerUpVideo', this.powerUpVid[1]);
        }
        else{
            this.enableChoice();
            this.enablePower();
        }
    }
    else if(this.powerUpNo === 3){
        this.showAllWrongs();
        this.playVideo(powerUpVid, 'powerUpVideo', this.powerUpVid[2])
        document.getElementById('screenHold').style.display = "none";
        
    }
    else{
        this.usedPowerUp = false;
        this.wrongImg.forEach(element => {element.classList.add('displayHidden')});
        this.enableChoice();
        this.enablePower();
    }
}
    
    easterEgg(){
        this.updateScoreDisplay();
        if(this.userScore === 3 && this.userChoice === "rock" && this.computerChoice === "scissor"){
            this.playVideo(bigVideo, 'memeVideo', this.easterEggVid[1]);
            return true;
        }
        else if(this.computerScore === 3 && this.userChoice === "paper" && this.computerChoice === "scissor"){
            this.playVideo(bigVideo, 'memeVideo', this.easterEggVid[2]);
            return true;
        }
        else{
            return false;
        }
    }
    
    endGame(){
        if(this.userScore >= 3 || this.computerScore >= 3){
            this.disableChoice();
            this.displayHide();
            this.disablePower();
            this.confettiShow();
            this.playVideo.onended = () => {
                resetButton.classList.remove('displayHidden');
                resetButton.classList.add('reset');
            }
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
    videogame.playVideo(explode, 'bomb', videogame.powerUpVid[3]);
})