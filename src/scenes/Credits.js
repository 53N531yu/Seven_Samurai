class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add title screen text
        this.credits = this.add.tileSprite(0, 0, 0, 0, 'Credits').setOrigin(0, 0);
        
        cursors = this.input.keyboard.createCursorKeys();  

        // check for UP input
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('creditsScene');
                    this.scene.start('titleScene');
                    break;
            }
        });
    }

    update() {
    }
}