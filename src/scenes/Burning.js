class Burning extends Phaser.Scene {
    constructor() {
        super('burningScene');
    }

    create() {

        // Background Music
        // this.bgm = this.sound.add('BackMusic', { 
        //     mute: false,
        //     volume: 0.5,
        //     rate: 1,
        //     loop: true 
        // });
        // this.bgm.play();

        //SFX
        //this.jumppieceSFX = this.sound.add('JumpPieceSFX', {volume: 2, loop : false});
        
        // add tile sprite
        // this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'Player').setOrigin(0, 0);

        // set up player
        // this.player = this.physics.add.sprite(256, 300, 'Player').setScale(1);
        // this.player.setFlip(true, false);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider

        // Player Animation

        // this.anims.create({
        //     key: 'walk',
        //     frames: this.anims.generateFrameNumbers('walk', { 
        //         start: 0, 
        //         end: 6, 
        //         first: 0
        //     }),
        //     frameRate: 13
        // });

        // Display Score

        // let scoreConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#292929',
        //     color: '#ffffff',
        //     align: 'left',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //         left: 20,
        //         right: 20,
        //     },
        //     fixedWidth: 200
        // }
        // this.scoreLeft = this.add.text(128, 64, "Round " + this.points, scoreConfig);

        // let jumpConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#292929',
        //     color: '#ffffff',
        //     align: 'left',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //         left: 20,
        //         right: 30,
        //     },
        //     fixedWidth: 350
        // }
        // this.scoreRight = this.add.text(576, 64, "Jump Pieces : " + this.jump + " / 3", jumpConfig);
    }

    update() {
        // if (!this.player.destroyed) {
        //     if (cursors.left.isDown) {
        //         this.player.body.setVelocityX(this.velocity * -1);
        //         this.player.anims.play('walk', true);
        //         this.player.resetFlip();
        //     } else if (cursors.right.isDown) {
        //         this.player.body.setVelocityX(this.velocity);
        //         this.player.anims.play('walk', true);
        //         this.player.setFlip(true, false);
        //     } else {
        //         this.player.body.setVelocityX(0);
        //     }
        //     if (cursors.down.isDown) {
        //         this.ignore = true;
        //     } else {
        //         this.ignore = false;
        //     }
        //     if (!this.ignore && this.player.body.touching.down && (this.bounceCollision(this.player, this.bounce1) || this.bounceCollision(this.player, this.bounce2))) {
        //         this.sound.play("BounceSFX");
        //         this.player.body.setVelocityY(this.JUMP_VELOCITY);
        //     }
        //     if (this.jumpbool && this.bounceCollision(this.player, this.jumpPiece)) {
        //         this.jump ++;
        //         this.scoreRight.text = "Jump Pieces : " + this.jump + " / 3";
        //         this.jumpbool = false;
        //         this.jumpPiece.destroy();
        //         this.jumpTut.destroy();
        //         this.AddJumpPiece(this.spike.x + 1152);
        //         this.jumppieceSFX.play()
        //         console.log(this.jump);
        //     }
        //     if (this.coinbool && this.bounceCollision(this.player, this.coin)) {
        //         this.points ++;
        //         this.scoreLeft.text = "points : " + this.points;
        //         this.coinbool = false;
        //         this.coin.destroy();
        //         this.sound.play('CoinSFX');
        //         console.log(this.points);
        //         if (this.difficulty < (this.velocity * -1))
        //         {
        //             this.difficulty -= 20;
        //             this.changeDifficulty();
        //         }
        //     }
        //     if (this.jump >= 3) {
        //         this.tempJump(this.player);
        //     }
        // }
    }

    changeDifficulty() {      
    }

    // Defeat Condition

    // playerDeath() {
    //     this.player.destroyed = true;
    //     this.tweens.add({
    //         targets: this.bgm,
    //         volume: 0,
    //         ease: 'Linear',
    //         duration: 2000,
    //     });

    //     this.player.destroy();
    //     this.time.delayedCall(3000, () => { this.bgm.stop(); });
    //     this.time.delayedCall(3000, () => { this.scene.start('gameOverScene'); });
    // }
}