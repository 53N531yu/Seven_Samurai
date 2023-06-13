class Bandits extends Phaser.Scene {
    constructor() {
        super('banditScene');
    }

    create() {

        // add background and foreground sprite
        this.background = this.add.tileSprite(0, 0, 0, 0, 'VillageEntrance').setOrigin(0, 0).setDepth(0);
        this.foreground = this.add.tileSprite(0, 0, 0, 0, 'VEForeground').setOrigin(0, 0).setDepth(3);

        // set up player
        this.readyStance = this.physics.add.sprite(800, 500, 'ReadyStance3').setAlpha(1).setDepth(1);
        this.duelStance = this.physics.add.sprite(800, 500, 'Attack3').setAlpha(0).setDepth(1);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // Display Bandits remaining, misses, and the keys to press
        this.banditsRemaining = 20;
        this.misses = 0

        let banditsConfig = {
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
            fixedWidth: 410
        }

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
            fixedWidth: 350
        }

        let pressConfig = {
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

        this.banditsLeftDisplay = this.add.text(16, 64, "Bandits Remaining : " + this.banditsRemaining, banditsConfig).setDepth(5);

        this.missesDisplay = this.add.text(16, 128, "Misses : " + this.misses + " / 5", missConfig).setDepth(5);
        
        this.pressKey = this.add.text(16, 192, "Press: ", pressConfig).setDepth(5);
        

        // Background sound
        this.bgm = this.sound.add('Scene3BackgroundSFX', {volume: 1, loop : true});
        this.bgm.play();

        // Phases
        this.prepare = true;
        this.fight = false;

        // Key combination during duel
        this.keysToPress = 4;
        this.combination = [];
        this.tempCombination = [];
        this.currentKey = "";
        this.keysToPush = ["up", "down", "left", "right"];
        this.upPressed = true;
        this.downPressed = true;
        this.leftPressed = true;
        this.rightPressed = true;
        this.keyPressed = false;

        // Attack or Pass
        this.isAttack = false;
        this.isPass = false;
        this.hasPressed = false;

        // Booleans to prevent things from happening 60 times a second
        this.restarted = false;
        this.displayedKeys = false;
        this.defeat = false;
        this.victory = false;
    }

    update() {
        if (!this.restarted) { // Allow the player to restart the scene or quit to main menu
            this.GameOver();
            this.restarted = true;
        }

        // The prepare phase begins
        if (this.prepare == true) {
            this.combination = [];
            this.tempCombination = [];

            this.displayedKeys = false;
            this.hasPressed = false;
            this.victory = false;
            this.defeat = false;
            this.displayedKeys = false;
            
            // next phase
            this.time.delayedCall(1500, () => {
                this.prepare = false;
                this.fight = true;
                this.readyStance.setAlpha(1);
                this.duelStance.setAlpha(0);
            });
        }

        // fight phase begins
        else if (this.fight == true) {
            // New Round, new keys are displayed on the screen
            if (!this.displayedKeys) {
                this.displayKeys();
                this.spawnBandit();
                this.AttackOrPass();
                this.displayedKeys = true;
            }

            if (!this.defeat) {
                if (!this.keyPressed) { // Ensures that holding down a key doesn't input it multiple times.
                    // Checks if the correct keys are being pressed.
                    this.CheckKeyPress();
                }
                this.ResetKeyPress();
            }
            
            if (this.bandit.x < 100 && this.victory) { // Silce animation when player inputs keys correctly
                this.readyStance.setAlpha(0);
                this.duelStance.setAlpha(1);
                this.killBandit();
            }

            if (this.bandit.x < -500 && this.isPass && !this.keyPressed && !this.hasPressed) { // Bandit dies in the village if player lets it pass
                this.killBandit();
                this.banditsRemaining--;
                this.banditsLeftDisplay.text = "Bandits Remaining : " + this.banditsRemaining;
            }
            
            if (this.bandit.x < -500 && this.isPass && this.hasPressed) { // Miss if the player tries to kill the bandit when they're supposed to let it pass.
                this.killBandit();
                this.misses++;
                this.missesDisplay.text = "Misses : " + this.misses + " / 5";
            }

            if (this.bandit.x < -500 && this.isAttack) { // Miss if the player doesn't press all the keys on time
                this.killBandit();
                this.misses++;
                this.missesDisplay.text = "Misses : " + this.misses + " / 5";
            }
        }

        // Check for victory or defeat
        else { 
            // Ensures that that the game doesn't go pass 5 misses or less than 1 bandit left remaining
            if (this.banditsRemaining > -1 && this.misses < 5) {
                this.fight = true; 
                this.prepare = true;

            } else if (this.banditsRemaining < 1) { // If the player kills all bandits, victory
                this.bgm.stop();
                this.scene.stop('banditScene');
                this.scene.start('banditVictoryScene');
            } else if (this.misses > 4) {  // If the playing misses 5 times, defeat
                this.bgm.stop();
                this.scene.stop('banditScene');
                this.scene.start('banditDefeatScene');
            }
            
        }
    }

    killBandit() { // function to destroy bandit and move onto the next phase
        this.bandit.destroy();
        this.AttackorPassUI.destroy();
        this.fight = false;
        this.isAttack = false;
        this.isPass = false;
    }

    AttackOrPass() { // Randomly tell the player if they should let the bandit pass or kill it
        this.AttackOrPassRandom = Math.floor(Math.random() * 2);
        if (this.AttackOrPassRandom === 0) {
            this.AttackorPassUI = this.physics.add.sprite(800, 450, 'AttackUI').setDepth(5);
            this.isAttack = true;
        }
        else {
            this.AttackorPassUI = this.physics.add.sprite(800, 450, 'PassUI').setDepth(5);
            this.isPass = true;
        }
    }

    // Spawn mounted bandit
    spawnBandit() {
        this.bandit = this.physics.add.sprite(1000, 450, 'HorsebackBandit').setAlpha(1).setDepth(2).setVelocityX(-250).setVelocityY(44);
    }

    // new bandit, new button combination displayed on the screen
    displayKeys() {
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

        this.currentKey = "";

        for (let i = 1; i < 5; i++) { 
            this.randomKeyIndex =  Math.floor((Math.random() * this.keysToPush.length));
            this.randomKey = this.keysToPush[this.randomKeyIndex];
            this.combination.push(this.randomKey);
            this.tempCombination = this.combination.slice();
            this.add.text(16, 192 + (32 * i), this.randomKey, keyConfig).setDepth(5);
        }

        console.log(this.combination);
    }

    CheckKeyPress() { // Checks if the player has pressed the correct keys
        // Check keyboard input
        if (cursors.up.isDown && this.upPressed == true) {
            // console.log("up");
            this.currentKey = "up";
            this.upPressed = false;
            this.keyPressed = true;
            this.hasPressed = true;
          } else if (cursors.down.isDown && this.downPressed == true) {
            // console.log("down");
            this.currentKey = "down";
            this.downPressed = false;
            this.keyPressed = true;
            this.hasPressed = true;
          } else if (cursors.left.isDown && this.leftPressed == true) {
            // console.log("left");
            this.currentKey = "left";
            this.leftPressed = false;
            this.keyPressed = true;
            this.hasPressed = true;
          } else if (cursors.right.isDown && this.rightPressed == true) {
            // console.log("right");
            this.currentKey = "right";
            this.rightPressed = false;
            this.keyPressed = true;
            this.hasPressed = true;
          }

          // Check if the player pressed the correct keys. Wrong key pressed = defeat. Correct keys pressed = victory.
          if (this.isAttack == true) {
              if (this.currentKey == this.tempCombination[0]) {
                this.tempCombination.shift();
              } else if (this.tempCombination.length == 0) {
                if (!this.victory) {
                    this.banditsRemaining--;
                    this.banditsLeftDisplay.text = "Bandits Remaining : " + this.banditsRemaining;
                    this.victory = true
                }
              } else if (this.currentKey != this.tempCombination[0] && this.keyPressed){
                this.defeat = true;
              }
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

    GameOver() { // Victory/Defeat Condition
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    // this.sound.play('StartGameSFX');
                    this.bgm.stop();
                    this.scene.stop('banditScene');
                    this.scene.start('titleScene');
                    break;
                case '2':
                    // this.sound.play('StartGameSFX');
                    this.bgm.stop();
                    this.scene.stop('banditScene');
                    this.scene.start('banditScene');
                    break;
            }
        });
    }
}
