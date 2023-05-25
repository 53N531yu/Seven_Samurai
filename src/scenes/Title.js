class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        console.log("Running preload");
    }

    create() {
        // add title screen text
        this.title = this.add.tileSprite(0, 0, 0, 0, 'TitleScreen').setOrigin(0, 0);
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for UP input
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    this.scene.start('velocityScene');
                    break;
                case '2':
                    this.scene.start('accelerationScene');
                    break;
                case '3':
                    this.scene.start('fixedJumpScene');
                    break;
                case '4':
                    this.scene.start('variableJumpScene');
                    break;
            }
        });
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // start next scene
            this.sound.play('StartGameSFX');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.sound.play('StartGameSFX');
            this.scene.stop('titleScene');
            this.scene.start('creditsScene');
        }
    }
}