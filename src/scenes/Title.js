class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        console.log("Running preload");
    }

    create() {
        // add title screen text
        this.title = this.add.tileSprite(0, 0, 0, 0, 'Menu').setOrigin(0, 0);
        cursors = this.input.keyboard.createCursorKeys();  
        // check for UP input
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    //this.sound.play('StartGameSFX');
                    this.scene.stop('titleScene');
                    this.scene.start('tutorial1Scene');
                    break;
                case '2':
                    //this.sound.play('StartGameSFX');
                    this.scene.stop('titleScene');
                    this.scene.start('tutorial2Scene');
                    break;
                case '3':
                    //this.sound.play('StartGameSFX');
                    this.scene.stop('titleScene');
                    this.scene.start('tutorial3Scene');
                    break;
                case '4':
                    //this.sound.play('StartGameSFX');
                    this.scene.stop('titleScene');
                    this.scene.start('creditsScene');
                    break;
            }
        });
    }

    update() {
        
    }
}