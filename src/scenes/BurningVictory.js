class BurningVictory extends Phaser.Scene {
    constructor() {
        super('burningVictoryScene');
    }

    create() {
        // add tutorial 1 screen text
        this.victory1 = this.add.tileSprite(0, 0, 0, 0, 'VictoryScreen').setOrigin(0, 0);
        
        cursors = this.input.keyboard.createCursorKeys();  
        // check for UP input
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('burningVictoryScene');
                    this.scene.start('titleScene');
                    break;
                case '2':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('burningVictoryScene');
                    this.scene.start('burningScene');
                    break;
            }
        });
    }

    update() {
        
    }
}