// Name : Oscar Tiong
// Game Title : Seven Samurai
// Hours spent : 50 hours

// 5 of Phaser's major components : 
/* 
 - Physics System is used for the movement of enemies in scene 2 and 3.
 - A camera is used to display the scene.
 - Text objects are used to keep track of the player's progress.
 - The animation manager is used to animated the bandits and women running away in scene 2.
 - The tween manager was used to make the UI of the scenes fade in and out of the screen.
*/

'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 900,
    width: 1600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Tutorial1, Tutorial2, Tutorial3, Play, DuelDefeat, DuelVictory, BurningDefeat, BurningVictory, BanditDefeat, BanditVictory, Burning, Bandits, GameOver, Credits, Title ]
}

// uncomment the following line if you need to purge local storage data
//localStorage.clear();


// define game
let game = new Phaser.Game(config);

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let paddle = null;
let level;
let highScore;
let newHighScore = false;
let cursors;