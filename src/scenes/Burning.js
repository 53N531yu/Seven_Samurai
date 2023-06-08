class Burning extends Phaser.Scene {
    constructor() {
        super('burningScene');
    }

    create() {

        // add tile sprite
        this.background = this.add.tileSprite(0, 0, 0, 0, 'TheBurningFortress').setOrigin(0, 0).setDepth(0);

        // set up player
        this.readyStance = this.physics.add.sprite(900, 450, 'ReadyStance2').setAlpha(1).setDepth(2);
        this.attack = this.physics.add.sprite(900, 450, 'Attack').setAlpha(0).setDepth(2);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // Display Score
        this.misses = 0;
        this.banditsKilled = 0;

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
            fixedWidth: 320
        }
        this.missesLeft = this.add.text(16, 64, "Misses : " + this.misses + " / 3", missConfig);
        this.banditsKilledDisplay = this.add.text(16, 128, "Bandits : " + this.banditsKilled + " / 10", missConfig);

        // Display UI
        this.womanKilledUI = this.physics.add.sprite(800, 450, 'WomanKilledUI').setAlpha(0);
        this.missedUI = this.physics.add.sprite(800, 450, 'MissedUI').setAlpha(0);

        // Background sound
        this.bgm = this.sound.add('Scene3BackgroundSFX', {volume: 1, loop : true});
        this.bgm.play();

        // SFX
        this.WomanScreamingSFX = this.sound.add('WomanScreamingSFX', {volume: 1, loop : false});
        this.BanditsScreamingSFX = this.sound.add('BanditsScreamingSFX', {volume: 1, loop : false});
        
        // Set up animation for sprites
        this.anims.create({
            key: 'bandit1',
            frames: this.anims.generateFrameNumbers('bandit1', { 
                start: 0, 
                end: 1, 
                first: 0
            }),
            frameRate: 5
        });

        this.anims.create({
            key: 'bandit2',
            frames: this.anims.generateFrameNumbers('bandit2', { 
                start: 0, 
                end: 1, 
                first: 0
            }),
            frameRate: 5
        });

        this.anims.create({
            key: 'womanAnim',
            frames: this.anims.generateFrameNumbers('womanAnim', { 
                start: 0, 
                end: 1, 
                first: 0
            }),
            frameRate: 5
        });

        // Phases
        this.begin = true;
        this.reveal = false;
        this.flee = false;

        // Booleans to prevent things happening 60 times a second
        this.upPressed = true;
        this.keyPressed = false;
        this.isRevealed = false;
        this.isBandit = false;
        this.isWoman = false;
        this.missed = false;
        this.killChecked = false;
        this.victimDead = false;
        this.victimDestroyed = false;
        this.banditEscaped = false;
        this.restarted = false;
        this.isDisplayed = false;
        this.bandit1Revealed = false;
        this.bandit2Revealed = false;
        this.womanRevealed = false;
    }

    update() {
        this.Slice();
        if (!this.restarted) {
            this.GameOver();
            this.restarted = true;
        }
        // The Begin phase begins
        if (this.begin == true) {
            this.Slice();
            this.isRevealed = false;
            this.isBandit = false;
            this.isWoman = false;
            this.missed = false;
            this.killChecked = false;
            this.victimDead = false;
            this.victimDestroyed = false;
            this.banditEscaped = false;
            this.isDisplayed = false;
            this.bandit1Revealed = false;
            this.bandit2Revealed = false;
            this.womanRevealed = false;
            // next phase
            this.time.delayedCall(1000, () => {
                this.womanKilledUI.setAlpha(0);
                this.missedUI.setAlpha(0);
            });
            this.time.delayedCall(2000, () => {
                this.begin = false;
                this.reveal = true;
            });
        }

        // Reveal phase begins
        else if (this.reveal == true) {
            this.Slice();
            if (!this.isRevealed) {
                this.RandomReveal();
                this.isRevealed = true;
            }

            if (!this.killChecked) {
                this.KillCheck();
                this.killChecked = true;
            }
            // Begin the next phase after 2 seconds.
            this.time.delayedCall(1000, () => { 
                this.killChecked = false;
                this.reveal = false;
                this.flee = true; 
            });
        }

        // Flee phase begins
        else if (this.flee == true) {
            this.Slice();
            if (this.victimDestroyed) {
                this.flee = false;
            } else {
                this.victim.setVelocityX(250);
                if (this.bandit1Revealed) {
                    this.victim.anims.play('bandit1', true);
                } else if (this.bandit2Revealed) {
                    this.victim.anims.play('bandit2', true);
                } else if (this.womanRevealed) {
                    this.victim.anims.play('womanAnim', true);
                }
                if (!this.victimDead) {
                    this.KillCheck();
                    this.victimDead = true;
                }
    
                if (this.victim.x > 1600) {
                    this.victim.destroy();
                    this.flee = false;
                }
            }
            
        }
        else { 
            // Ensures that that the game doesn't go pass 7 rounds.
            if (this.misses < 3 && this.banditsKilled < 10) {
                this.begin = true; 
                this.reveal = false;
            } else if (this.banditsKilled >= 10) { // If the player wins all 7 rounds, they win the game
                this.bgm.stop();
                this.scene.stop('playScene');
                this.scene.start('duelVictoryScene');
                console.log("victory");
            } else if (this.misses >= 3) {
                this.bgm.stop();
                this.scene.stop('playScene');
                this.scene.start('duelDefeatScene');
                console.log("defeat");
            }
        }
    }

    KillCheck() {
        if (!this.upPressed && this.isWoman && this.victim.x < 950 && !this.victimDead) {
            this.misses ++;
            this.missesLeft.text = "Misses : " + this.misses + " / 3";
            this.begin = true;
            this.reveal = false;
            this.flee = false;
            this.victim.destroy();
            if (!this.isDisplayed) {
                this.womanKilledUI.setAlpha(1);
                this.WomanScreamingSFX.play();
                this.isDisplayed = true;
            }
            this.victimDestroyed = true;
            this.victimDead = true;
        } else if (this.isBandit && this.victim.x > 950 && !this.banditEscaped) {
            this.misses ++;
            this.missesLeft.text = "Misses : " + this.misses + " / 3";
            if (!this.isDisplayed) {
                this.missedUI.setAlpha(1);
                this.isDisplayed = true;
            }
            console.log("escaped");
            this.banditEscaped = true;
        } else if (!this.upPressed && this.isBandit && this.victim.x < 950 && !this.banditEscaped) {
            this.banditsKilled ++;
            this.banditsKilledDisplay.text = "Bandits : " + this.banditsKilled + " / 10";
            this.begin = true;
            this.reveal = false;
            this.flee = false;
            if (!this.isDisplayed) {
                this.BanditsScreamingSFX.play();
                this.isDisplayed = true;
            }
            this.victim.destroy();
            this.banditEscaped = true;
            this.victimDestroyed = true;
            this.victimDead = true;
        }
    }

    RandomReveal() { // A bandit or a woman is randomly generated
        this.victimSpawn = Math.floor(Math.random() * 3);
        if (this.victimSpawn === 0) {
            this.victim = this.physics.add.sprite(750, 450, 'Bandit1').setDepth(1);
            this.isBandit = true;
            this.bandit1Revealed = true;
        }
        else if (this.victimSpawn === 1) {
            this.victim = this.physics.add.sprite(750, 450, 'Bandit2').setDepth(1);
            this.isBandit = true;
            this.bandit2Revealed = true;
        }
        else {
            this.victim = this.physics.add.sprite(750, 450, 'Woman').setDepth(1);
            this.isWoman = true;
            this.womanRevealed = true;
        }
        this.victim.body.immovable = true;
        //this.victim.body.setAllowGravity(false).setVelocityX(this.difficulty);
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

    Slice() {
        if (!this.keyPressed) {
            this.Attack();
            this.time.delayedCall(500, () => {
                this.keyPressed = true;
            });
        } else if (this.keyPressed){
            this.ResetKeyPress();
            this.time.delayedCall(500, () => {
                this.keyPressed = false;
            });
        }
    }

    Attack() { // Attacks if the key is being pressed
        // Check keyboard input
        if (cursors.up.isDown && this.upPressed == true) {
            // console.log("up");
            this.currentKey = "up";
            this.upPressed = false;
            this.readyStance.setAlpha(0);
            this.attack.setAlpha(1);
        }
    }

    ResetKeyPress() { // Ensures that one key press isn't inputted multiple times.
        // Reset keyPressed to false when the key is released
        if (cursors.up.isUp && this.upPressed == false) {
            this.upPressed = true;
            this.readyStance.setAlpha(1);
            this.attack.setAlpha(0);
          }
    }

    // Victory/Defeat Condition

    GameOver() {
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    // this.sound.play('StartGameSFX');
                    this.bgm.stop();
                    this.scene.stop('burningScene');
                    this.scene.start('titleScene');
                    break;
                case '2':
                    // this.sound.play('StartGameSFX');
                    this.bgm.stop();
                    this.scene.stop('burningScene');
                    this.scene.start('burningScene');
                    break;
            }
        });
    }
}