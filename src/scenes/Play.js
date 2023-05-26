class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {

        // Background Music
        // this.bgm = this.sound.add('BackMusic', { 
        //     mute: false,
        //     volume: 0.5,
        //     rate: 1,
        //     loop: true 
        // });
        // this.bgm.play();

        //SFX
        //this.jumppieceSFX = this.sound.add('JumpPieceSFX', {volume: 2, loop : false});
        
        // add tile sprite
        this.background = this.add.tileSprite(0, 0, 0, 0, 'DuelArena').setOrigin(0, 0);

        // set up duelers
        this.readyStance = this.physics.add.sprite(800, 500, 'ReadyStance').setAlpha(1);
        this.duelStance = this.physics.add.sprite(800, 500, 'FightStance').setAlpha(0);

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

        //Black screen (For end/ beginning of round)
        this.blackScreen = this.physics.add.sprite(800, 450, 'BlackScreen').setAlpha(1);

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
    }

    update() {
        if (this.begin == true) {
            this.tweens.add({
                targets: this.blackScreen,
                alpha: 0,
                ease: 'Linear',
                duration: 1000,
                onComplete: () => {
                    this.blackScreen.alpha = 0;
                }
            });
            // New Round, new keys
            this.PrepareRound();

            // next phase
            this.begin = false;
            this.preperation = true;
        }
        else if (this.preperation == true) {
            console.log("Ready");
            this.time.delayedCall(2000, () => { 
                this.preperation = false;
                this.duel = true; 
            });
        }
        else if (this.duel == true) {
            console.log("Duel!");

            // Check
            if (!this.defeat && !this.victory) {
                if (!this.keyPressed) {
                    this.CheckKeyPress();
                }
                this.ResetKeyPress();
            }
            
            // Next phase happens after a delayed time
            this.time.delayedCall(2000, () => { 
                this.duel = false;
                this.end = true; 
            });
        }
        else if (this.end == true) {
            console.log("victory");
            this.tweens.add({
                targets: this.blackScreen,
                alpha: 1,
                ease: 'Linear',
                duration: 1000,
                onComplete: () => {
                    this.blackScreen.alpha = 1;
                }
            });

            this.time.delayedCall(2000, () => { 
                this.end = false;
                
            });
        }
        else { 
            if (this.round < 8) {
                this.begin = true; 
                this.Prepared = false;
            }
            
        }
    }

    changeDifficulty() {      
    }
    
    // new round, new button combination

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

        console.log(this.combination);
    }

    CheckKeyPress() {
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

          if (this.currentKey == this.tempCombination[0]) {
            this.tempCombination.shift();
          } else if (this.tempCombination.length == 0) {
            this.victory = true;
          } else if (this.currentKey != this.tempCombination[0] && this.keyPressed){
            this.defeat = true;
            console.log("defeat!");
          }
          
    }

    ResetKeyPress() {
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

    // Victory Condition

    Victory() {

    }

    // Defeat Condition

    // Defeat() {
    //     this.player.destroyed = true;
    //     this.tweens.add({
    //         targets: this.bgm,
    //         volume: 0,
    //         ease: 'Linear',
    //         duration: 2000,
    //     });

    //     this.player.destroy();
    //     this.time.delayedCall(3000, () => { this.bgm.stop(); });
    //     this.time.delayedCall(3000, () => { this.scene.start('gameOverScene'); });
    // }
}