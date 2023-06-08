class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {

        // add background sprite
        this.background = this.add.tileSprite(0, 0, 0, 0, 'DuelArena').setOrigin(0, 0);

        // set up duelers
        this.readyStance = this.physics.add.sprite(800, 500, 'ReadyStance').setAlpha(1);
        this.duelStance = this.physics.add.sprite(800, 500, 'FightStance').setAlpha(0);

         //Black screen (For end/ beginning of round)
         this.blackScreen = this.physics.add.sprite(800, 450, 'BlackScreen').setAlpha(1);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // Display Score
        this.round = 0;

        let roundConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#292929',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
                left: 20,
                right: 20,
            },
            fixedWidth: 150
        }
        this.roundLeft = this.add.text(16, 64, "Round " + this.round, roundConfig);

        this.pressKey = this.add.text(16, 128, "Press: ", roundConfig);

        // Display UI
        this.RoundWon = this.physics.add.sprite(800, 450, 'RoundWon').setAlpha(0);
        this.readyUI = this.physics.add.sprite(800, 450, 'ReadyUI').setAlpha(0);
        this.duelUI = this.physics.add.sprite(800, 450, 'DuelUI').setAlpha(0);
        

        // Background sound
        this.bgm = this.sound.add('BackgroundSFX', {volume: 2, loop : true});
        this.bgm.play();

        //SFX
        this.ReadySFX = this.sound.add('ReadySFX', {volume: 0.5, loop : false});
        this.DuelCrySFX1 = this.sound.add('DuelCrySFX1', {volume: 0.5, loop : false});
        this.DuelCrySFX2 = this.sound.add('DuelCrySFX2', {volume: 0.5, loop : false});
        this.DuelCrySFX3 = this.sound.add('DuelCrySFX3', {volume: 0.5, loop : false});
        

        // Phases
        this.begin = true;
        this.preperation = false;
        this.duel = false;
        this.end = false;
        this.Prepared = false;
        this.victory = false;
        this.defeat = false;

        // Key combination during duel
        this.keysToPress = 0;
        this.combination = [];
        this.tempCombination = [];
        this.currentKey = "";
        this.keysToPush = ["up", "down", "left", "right"];
        this.upPressed = true;
        this.downPressed = true;
        this.leftPressed = true;
        this.rightPressed = true;
        this.keyPressed = false;
        this.hasCried = false;
        this.roundFinished = false;
        this.restarted = false;
    }

    update() {
        // The Begin phase begins
        if (!this.restarted) {
            this.GameOver();
            this.restarted = true;
        }
        if (this.begin == true) {
            // fade out the black screen
            this.hasCried = false;
            this.roundFinished = false;
            this.tweens.add({
                targets: this.blackScreen,
                alpha: 0,
                ease: 'Linear',
                duration: 1000,
                onComplete: () => {
                    this.blackScreen.alpha = 0;
                }
            });
            this.RoundWon.setAlpha(0);
            this.readyUI.setAlpha(1);
            // New Round, new keys are displayed on the screen
            this.PrepareRound();

            // next phase
            this.begin = false;
            this.preperation = true;
        }
        // Preparation phase begins
        else if (this.preperation == true) {
            this.ReadySFX.play();
            // fade out "Ready" UI
            this.tweens.add({
                targets: this.readyUI,
                alpha: 0,
                ease: 'Linear',
                duration: 1000,
                onComplete: () => {
                    this.readyUI.alpha = 0;
                }
            });
            // Begin the next phase after 2 seconds.
            this.time.delayedCall(2000, () => { 
                this.preperation = false;
                this.duel = true; 
                this.duelUI.setAlpha(1);
            });
        }
        // Duel phase begins
        else if (this.duel == true) {
            if (!this.hasCried)
            {
                this.RandomCry();
                this.hasCried = true;
            }
            // fade out "Duel!" UI
            this.tweens.add({
                targets: this.duelUI,
                alpha: 0.5,
                ease: 'Linear',
                duration: 1000,
                onComplete: () => {
                    this.duelUI.alpha = 0.5;
                }
            });
            // Checks if the player has already lost or won the round. If so, prevent any action.
            if (!this.defeat && !this.victory) {
                if (!this.keyPressed) {
                    // Checks if the correct keys are being pressed.
                    this.CheckKeyPress();
                }
                // Ensures that holding down a key doesn't input it multiple times.
                this.ResetKeyPress();
            } 
            // Next phase happens after a delayed time
            this.time.delayedCall(2000, () => { 
                this.readyStance.setAlpha(0);
                this.duelStance.setAlpha(1);
                if (this.tempCombination.length > 0) {
                    this.defeat = true;
                } 
                this.duel = false;
                this.end = true; 
            }); 
        }

        // End phase begins
        else if (this.end == true) {
            // Checks to see if the player lost the round. If so, the game ends
            if (this.defeat == true) {
                this.bgm.stop(); // Stop background music
                this.scene.stop('playScene');
                this.scene.start('duelDefeatScene'); // Load Defeat screen
            } else {
                this.duelUI.setAlpha(0);
                this.tweens.add({
                    targets: this.blackScreen,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 1000,
                    onComplete: () => {
                        this.blackScreen.alpha = 1;
                    }
                });
                if (!this.roundFinished)
                {
                    this.time.delayedCall(1000, () => { 
                        this.RoundWon.setAlpha(1);
                        this.time.delayedCall(2000, () => { 
                            this.RoundWon.setAlpha(0);
                            this.end = false; 
                        });
                    });
                    this.roundFinished = true;
                }
                
                }
        }
        else { 
            // Ensures that that the game doesn't go pass 7 rounds.
            if (this.round < 7) {
                this.begin = true; 
                this.Prepared = false;
            } else if (this.round >= 7) { // If the player wins all 7 rounds, they win the game
                this.bgm.stop();
                this.scene.stop('playScene');
                this.scene.start('duelVictoryScene');
            }
            
        }
    }

    RandomCry() { // Randomly plays a screaming sound effect during the duel phase
        const randomCry = ['DuelCrySFX1', 'DuelCrySFX2', 'DuelCrySFX3'];
        const shuffledCry = this.shuffle(randomCry);
      
        this.soundKey = shuffledCry[0];
      
        this.soundToPlay = this[this.soundKey];
        if (!this.soundToPlay.isPlaying) {
            this.soundToPlay.play();
        }
    }

    shuffle(array) { // function for shuffling arrays
        let currentIndex = array.length;
        let temporaryValue, randomIndex;
    
        // While there remain elements to shuffle
        while (currentIndex !== 0) {
    
            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // Swap it with the current element
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }

    // new round, new button combination displayed on the screen
    PrepareRound() {
        let keyConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#292929',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
                left: 20,
                right: 20,
            },
            fixedWidth: 150
        }
        this.round ++;
        this.roundLeft.text = "Round " + this.round;
        this.victory = false;
        this.currentKey = "";
        this.randomKeyIndex =  Math.floor((Math.random() * this.keysToPush.length));
        this.randomKey = this.keysToPush[this.randomKeyIndex];
        this.combination.push(this.randomKey);
        this.tempCombination = this.combination.slice();
        this.add.text(16, 128 + (32 * this.round), this.randomKey, keyConfig);
        this.readyStance.setAlpha(1);
        this.duelStance.setAlpha(0);
        this.restarted = false;

        console.log(this.combination);
    }

    CheckKeyPress() { // Checks if the player has pressed the correct keys
        // Check keyboard input
        if (cursors.up.isDown && this.upPressed == true) {
            // console.log("up");
            this.currentKey = "up";
            this.upPressed = false;
            this.keyPressed = true;
          } else if (cursors.down.isDown && this.downPressed == true) {
            // console.log("down");
            this.currentKey = "down";
            this.downPressed = false;
            this.keyPressed = true;
          } else if (cursors.left.isDown && this.leftPressed == true) {
            // console.log("left");
            this.currentKey = "left";
            this.leftPressed = false;
            this.keyPressed = true;
          } else if (cursors.right.isDown && this.rightPressed == true) {
            // console.log("right");
            this.currentKey = "right";
            this.rightPressed = false;
            this.keyPressed = true;
          }

          // Check if the player pressed the correct keys. Wrong key pressed = defeat. Correct keys pressed = victory.
          if (this.currentKey == this.tempCombination[0]) {
            this.tempCombination.shift();
          } else if (this.tempCombination.length == 0) {
            this.victory = true;
          } else if (this.currentKey != this.tempCombination[0] && this.keyPressed){
            this.defeat = true;
            console.log("defeat!");
          }
          
    }

    ResetKeyPress() { // Ensures that one key press isn't inputted multiple times.
        // Reset keyPressed to false when the key is released
        if (cursors.up.isUp && this.upPressed == false) {
            this.upPressed = true;
          } else if (cursors.down.isUp && this.downPressed == false) {
            this.downPressed = true;
          } else if (cursors.left.isUp && this.leftPressed == false) {
            this.leftPressed = true;
          } else if (cursors.right.isUp && this.rightPressed == false) {
            this.rightPressed = true;
          }
          this.currentKey = "";
          this.keyPressed = false;
    }

    // Victory/Defeat Condition

    GameOver() {
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('playScene');
                    this.scene.start('titleScene');
                    this.bgm.stop();
                    break;
                case '2':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('playScene');
                    this.scene.start('playScene');
                    this.bgm.stop();
                    break;
            }
        });
    }
}