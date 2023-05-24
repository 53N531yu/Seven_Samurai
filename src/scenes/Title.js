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