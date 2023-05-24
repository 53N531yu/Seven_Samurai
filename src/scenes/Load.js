class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        this.load.image('Player', 'img/MainCharacter.png');
        this.load.image('Platform', 'img/Platform.png');
        this.load.image('Bounce', 'img/BouncePad.png');
        this.load.image('Spike', 'img/Spike.png');
        this.load.image('Coin', 'img/Coin.png');
        this.load.image('JumpPiece', 'img/JumpPiece.png');
        this.load.image('MoveTutorial', 'img/MoveTutorial.png');
        this.load.image('SpikesTutorial', 'img/SpikesTutorial.png');
        this.load.image('BounceTutorial', 'img/BounceTutorial.png');
        this.load.image('JumpTutorial', 'img/JumpTutorial.png');
        this.load.image('PointsTutorial', 'img/PointsTutorial.png');
        this.load.image('JumpGlow', 'img/JumpGlow.png');
        this.load.image('cross', 'img/white_cross.png');
        this.load.image('TitleScreen', 'img/TitleScreen.png');
        this.load.image('Credits', 'img/Credits.png');
        this.load.image('GameOver', 'img/GameOver.png');
        this.load.image('Background', 'img/Background.png');
        this.load.spritesheet('walk', 'img/walkAnimation.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 6});
        // load audio assets
        this.load.audio('BackMusic', ['audio/NocturneOP27NO2.wav']);
        this.load.audio('BounceSFX', ['audio/BounceSFX.wav']);
        this.load.audio('JumpPieceSFX', ['audio/JumpPieceSFX.wav']);
        this.load.audio('CoinSFX', ['audio/CoinSFX.wav']);
        this.load.audio('JumpSFX', ['audio/JumpSFX.wav']);
        this.load.audio('StartGameSFX', ['audio/StartGameSFX.wav']);
        this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('titleScene');
    }
}