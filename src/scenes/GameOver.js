class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        this.gameOver = this.add.tileSprite(0, 0, 0, 0, 'GameOver').setOrigin(0, 0);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // wait for UP input to restart game
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // start next scene
            this.sound.play('StartGameSFX');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            console.log(this);
            this.sound.play('StartGameSFX');
            this.scene.stop('gameOverScene');
            this.scene.start('titleScene');
        }
    }
}