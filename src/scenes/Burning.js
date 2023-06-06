class Burning extends Phaser.Scene {
    constructor() {
        super('burningScene');
    }

    create() {

        // add tile sprite
        this.background = this.add.tileSprite(0, 0, 0, 0, 'TheBurningFortress').setOrigin(0, 0);

        // set up duelers
        this.readyStance = this.physics.add.sprite(0, 0, 'ReadyStance2').setAlpha(1);
        this.duelStance = this.physics.add.sprite(0, 0, 'Attack').setAlpha(0);

        //Black screen (For end/ beginning of round)
        // this.blackScreen = this.physics.add.sprite(800, 450, 'BlackScreen').setAlpha(1);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // Display Score
        this.misses = 0;

        let missConfig = {
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
            fixedWidth: 250
        }
        this.missesLeft = this.add.text(16, 64, "Misses : " + this.misses + " / 3", missConfig);

        // Display UI
        this.womanKilledUI = this.physics.add.sprite(800, 450, 'WomanKilledUI').setAlpha(0);
        this.missedUI = this.physics.add.sprite(800, 450, 'MissedUI').setAlpha(0);

        // Background sound
        // this.bgm = this.sound.add('BackgroundSFX', {volume: 2, loop : true});
        // this.bgm.play();

        // SFX
        // this.DuelCrySFX3 = this.sound.add('DuelCrySFX3', {volume: 0.5, loop : false});
        

        // Phases
        this.begin = true;
        this.reveal = false;
        this.flee = false;

        // Key combination during duel
        this.upPressed = true;
        this.keyPressed = false;
        this.hasCried = false;
        this.roundFinished = false;
    }

    update() {
        // The Begin phase begins
        // if (this.begin == true) {
        //     // fade out the black screen
        //     this.hasCried = false;
        //     this.roundFinished = false;
        //     this.tweens.add({
        //         targets: this.blackScreen,
        //         alpha: 0,
        //         ease: 'Linear',
        //         duration: 1000,
        //         onComplete: () => {
        //             this.blackScreen.alpha = 0;
        //         }
        //     });
        //     this.RoundWon.setAlpha(0);
        //     this.readyUI.setAlpha(1);
        //     // New Round, new keys are displayed on the screen
        //     this.PrepareRound();

        //     // next phase
        //     this.begin = false;
        //     this.preperation = true;
        // }
        // // Prepearation phase begins
        // else if (this.reveal == true) {
        //     this.ReadySFX.play();
        //     // fade out "Ready" UI
        //     this.tweens.add({
        //         targets: this.readyUI,
        //         alpha: 0,
        //         ease: 'Linear',
        //         duration: 1000,
        //         onComplete: () => {
        //             this.readyUI.alpha = 0;
        //         }
        //     });
        //     // Begin the next phase after 2 seconds.
        //     this.time.delayedCall(2000, () => { 
        //         this.preperation = false;
        //         this.duel = true; 
        //         this.duelUI.setAlpha(1);
        //     });
        // }
        // // Duel phase begins
       
        // else if (this.flee == true) {
        //     // Checks to see if the player lost the round. If so, the game ends
        //     if (this.defeat == true) {
        //         console.log("defeat");
        //         this.bgm.stop(); // Stop background music
        //         this.scene.stop('playScene');
        //         this.scene.start('duelDefeatScene'); // Load Defeat screen
        //     } else {
        //         this.duelUI.setAlpha(0);
        //         this.tweens.add({
        //             targets: this.blackScreen,
        //             alpha: 1,
        //             ease: 'Linear',
        //             duration: 1000,
        //             onComplete: () => {
        //                 this.blackScreen.alpha = 1;
        //                 console.log("tween complete");
        //             }
        //         });
        //         if (!this.roundFinished)
        //         {
        //             this.time.delayedCall(1000, () => { 
        //                 this.RoundWon.setAlpha(1);
        //                 console.log("first delay complete");
        //                 this.time.delayedCall(2000, () => { 
        //                     this.RoundWon.setAlpha(0);
        //                     this.end = false; 
        //                     console.log("second delay complete");
        //                 });
        //             });
        //             this.roundFinished = true;
        //         }
                
        //         }
        // }
        // else { 
        //     // Ensures that that the game doesn't go pass 7 rounds.
        //     if (this.misses < 3) {
        //         this.begin = true; 
        //         this.Prepared = false;
        //     } else if (this.misses >= 3) { // If the player wins all 7 rounds, they win the game
        //         this.bgm.stop();
        //         this.scene.stop('playScene');
        //         this.scene.start('duelVictoryScene');
        //     }
            
        // }
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
        this.roundLeft.text = "Round " + this.round;
        this.victory = false;
    }

    Attack() { // Attacks if the key is being pressed
        // Check keyboard input
        if (cursors.up.isDown && this.upPressed == true) {
            // console.log("up");
            this.currentKey = "up";
            this.upPressed = false;
            this.keyPressed = true;
            this.readyStance = this.physics.add.sprite(0, 0, 'ReadyStance2').setAlpha(0);
            this.duelStance = this.physics.add.sprite(0, 0, 'Attack').setAlpha(1);
        }
    }

    ResetKeyPress() { // Ensures that one key press isn't inputted multiple times.
        // Reset keyPressed to false when the key is released
        if (cursors.up.isUp && this.upPressed == false) {
            this.upPressed = true;
            this.readyStance = this.physics.add.sprite(0, 0, 'ReadyStance2').setAlpha(1);
            this.duelStance = this.physics.add.sprite(0, 0, 'Attack').setAlpha(0);
          }
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
                    break;
                case '2':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('playScene');
                    this.scene.start('playScene');
                    break;
            }
        });
    }
}