class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add title screen text
        this.credits = this.add.tileSprite(0, 0, 0, 0, 'Credits').setOrigin(0, 0);
        
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.sound.play('StartGameSFX');
            this.scene.stop('creditsScene');
            this.scene.start('titleScene');
        }
    }
}