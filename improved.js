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
        this.choice = choice = ["rock", "paper", "scissor"];
        this.userChoice = '';
        this.computerChoice = '';
        this.userScore = 0;
        this.computerScore = 0;
        this.tieScore = 0;
        this.round = 0;
        this.usedPowerUp = false;
        this.powerUpNo = 0;
        this.enableChoice();
        this.enablePower();
    }
    displayHide(){
        document.getElementById('userImg').classList.remove('choice');
        document.getElementById('userImg').classList.add('displayHidden');
        document.getElementById('computerImg').classList.remove('computerChoice');
        document.getElementById('computerImg').classList.add('displayHidden');
        announcer.forEach(element => {element.style.display = "none"});
        wrongImg.forEach(element => {element.classList.add('displayHidden')});
    }

    displayShow(){
        document.getElementById('userImg').classList.remove('displayHidden');
        document.getElementById('userImg').classList.add('choice');
        document.getElementById('computerImg').classList.remove('displayHidden');
        document.getElementById('computerImg').classList.add('computerChoice');
        announcer.forEach(element => {element.style.display = "block"});
        wrongImg.forEach(element => {element.classList.add('wrong1')});
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
    }

    updateScoreDisplay(){
        document.getElementById('tie').textContent = `Tie Score: ${this.tieScore}`;
        document.getElementById('userPoint').textContent = `Your Score: ${this.userPoint}`;
        document.getElementById('computerPoint').textContent = `Computer Score: ${this.computerScore}`;
        document.getElementById('roundCounter').textContent = `Round ${this.round}`;
    }

    resultUpdate(userResult, loserResult){
        userText.textContent = userResult;
        computerText.textContent = loserResult;
    }
    
    result(){
        this.disableChoice();
        this.disablePower();
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
                    this.playVideo('bigVideo', 'bigVideo', this.easterEggVid[0]);
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
                    this.playVideo('memeVid', 'memeVid', this.winVideo[this.userScore]);
                }, 2000);
        }
        else{
            this.computerScore++;
            setTimeout(() => {
                    this.resultUpdate("LoseR", "WinneR");
                    this.displayHide();
                    this.playVideo('memeVid', 'memeVid', this.winVideo[this.userScore]);
                }, 2000);
        }
        this.updateScoreDisplay();
        this.endGame();
    }

    endGame(){
        if(this.userScore >= 3 || this.computerScore >= 3){
            this.disableChoice();
            this.displayHide();
            this.disablePower();
            this.confetti();
            resetButton.classList.remove('displayHidden');
            resetButton.classList.add('reset');
            return;
        }
        else{
            this.result();
        }
    }

    videoEnd(vidSrc){
        this.disableChoice();
        this.disablePower();
        this.displayHide();
        if(this.powerUpNo = 3){
            vidSrc.addEventListener('ended', () =>{
        resetButton.classList.remove('displayHidden');
        resetButton.classList.add('reset');
        return;
        })
        }
        else if(this.usedPowerUp){
            vidSrc.addEventListener('ended', () =>{
        powerUpVid.classList.add('powerUpVideo');
        powerUpVid.classList.remove('displayHidden');
        this.displayHide();
    })
        }
        else if(this.computerScore >= 3){
            this.playVideo('memeVid', 'memeVid', this.loseVideo[2]).addEventListener('ended', ()=>{
                this.endGame();
            });
            this.endGame();
            
        }
        else if(this.userScore >= 3){
            this.playVideo('memeVid', 'memeVid', this.winVideo[2]).addEventListener('ended', ()=>{
                this.endGame();
            });
            
        }
        else{
            this.displayShow();
            this.enablePower();
        }
        this.enableChoice();
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
}