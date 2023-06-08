class BurningDefeat extends Phaser.Scene {
    constructor() {
        super('burningDefeatScene');
    }

    create() {
        // add tutorial 1 screen text
        this.defeat1 = this.add.tileSprite(0, 0, 0, 0, 'DefeatScreen').setOrigin(0, 0);
        
        cursors = this.input.keyboard.createCursorKeys();  
        // check for UP input
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('burningDefeatScene');
                    this.scene.start('titleScene');
                    break;
                case '2':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('burningDefeatScene');
                    this.scene.start('burningScene');
                    break;
            }
        });
    }

    update() {
        
    }
}