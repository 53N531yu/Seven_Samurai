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
        // load graphics assets :
        // Sprites :
        this.load.image('ReadyStance', 'img/ReadyStance.png');
        this.load.image('FightStance', 'img/FightStance.png');

        // Backgrounds :
        this.load.image('BlackScreen', 'img/BlackScreen.png');
        this.load.image('DuelArena', 'img/DuelArena.png');

        // Screens :
        this.load.image('Menu', 'img/MainMenu.png');
        this.load.image('Credits', 'img/Credits.png');
        this.load.image('DuelTutorial', 'img/DuelInstructions.png');
        this.load.image('Scene2Tutorial', 'img/Scene2Instructions.png');
        this.load.image('Scene3Tutorial', 'img/Scene3Instructions.png');

        // UI :
        this.load.image('DuelUI', 'img/DuelUI.png');
        this.load.image('ReadyUI', 'img/ReadyUI.png');

        //this.load.spritesheet('walk', 'img/walkAnimation.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 6});
        // load audio assets
        //this.load.audio('BackMusic', ['audio/NocturneOP27NO2.wav']);
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