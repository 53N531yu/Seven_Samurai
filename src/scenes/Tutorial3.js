class Tutorial3 extends Phaser.Scene {
    constructor() {
        super('tutorial3Scene');
    }

    create() {
        // add tutorial 1 screen text
        this.tutorial1 = this.add.tileSprite(0, 0, 0, 0, 'Scene3Tutorial').setOrigin(0, 0);
        
        cursors = this.input.keyboard.createCursorKeys();  
        // check for UP input
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('tutorial3Scene');
                    this.scene.start('titleScene');
                    break;
                case '2':
                    // this.sound.play('StartGameSFX');
                    this.scene.stop('tutorial3Scene');
                    this.scene.start('banditScene');
                    break;
            }
        });
    }

    update() {
        
    }
}