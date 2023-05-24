class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    AddPlat1() {
        this.plat1 = this.physics.add.sprite(1280, 448, 'Platform');
        this.plat1.body.immovable = true;
        this.plat1.body.setAllowGravity(false).setVelocityX(this.difficulty);
        this.physics.add.collider(this.player, this.plat1);
    }

    AddPlat2() {
        this.plat2 = this.physics.add.sprite(1280, 256, 'Platform');
        this.plat2.body.immovable = true;
        this.plat2.body.setAllowGravity(false).setVelocityX(this.difficulty);
        this.physics.add.collider(this.player, this.plat2);
    }

    AddPlat3() {
        this.plat3 = this.physics.add.sprite(1280, 576, 'Platform');
        this.plat3.body.immovable = true;
        this.plat3.body.setAllowGravity(false).setVelocityX(this.difficulty);
        this.physics.add.collider(this.player, this.plat3);
    }

    AddBounce1() {
        this.bounce1 = this.physics.add.sprite(1280, 400, 'Bounce');
        this.bounce1.body.immovable = true;
        this.bounce1.body.setAllowGravity(false).setVelocityX(this.difficulty);
    }

    AddBounce2() {
        this.bounce2 = this.physics.add.sprite(1280, 528, 'Bounce');
        this.bounce2.body.immovable = true;
        this.bounce2.body.setAllowGravity(false).setVelocityX(this.difficulty);
    }

    AddSpike() {
        this.spikeSpawn = Math.floor(Math.random() * 2);

        if (this.spikeSpawn === 0) {
            this.spike = this.physics.add.sprite(1280, 192, 'Spike');
            this.coin = this.physics.add.sprite(1280, 64, 'Coin');
        }
        else if (this.spikeSpawn === 1) {
            this.spike = this.physics.add.sprite(1280, 512, 'Spike');
            this.coin = this.physics.add.sprite(1280, 368, 'Coin');
        }
        this.spike.body.immovable = true;
        this.spike.body.setAllowGravity(false).setVelocityX(this.difficulty);
        this.coin.body.immovable = true;
        this.coin.body.setAllowGravity(false).setVelocityX(this.difficulty);
        
    }

    AddJumpPiece(x) {
        this.jumpPieceSpawn = Math.floor(Math.random() * 3);
        if (this.jumpPieceSpawn === 0) {
            this.jumpPiece = this.physics.add.sprite(x, 192, 'JumpPiece');
        }
        else if (this.jumpPieceSpawn === 1) {
            this.jumpPiece = this.physics.add.sprite(x, 496, 'JumpPiece');
        }
        else {
            this.jumpPiece = this.physics.add.sprite(x, 1100, 'JumpPiece');
        }
        this.jumpbool = true;
        this.jumpPiece.body.immovable = true;
        this.jumpPiece.body.setAllowGravity(false).setVelocityX(this.difficulty);
    }

    AddGlow(player) {
        this.jumpGlow = this.physics.add.sprite(player.x, player.y, 'JumpGlow');
    }

    create() {
        this.JUMP_VELOCITY = -1300;
        this.velocity = 250;
        this.difficulty = -100;
        this.SCROLL_SPEED = 0;
        this.physics.world.gravity.y = 2600;

        this.bgm = this.sound.add('BackMusic', { 
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        this.jumppieceSFX = this.sound.add('JumpPieceSFX', {volume: 2, loop : false});

        this.ignore = false;
        
        this.jump = 0;
        this.jumpbool = true;

        this.points = 0;
        this.coinbool = true;

        // add tile sprite
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'Background').setOrigin(0, 0);

        this.plat1 = this.physics.add.sprite(256, 448, 'Platform');
        this.plat1.body.immovable = true;
        this.plat1.body.setAllowGravity(false).setVelocityX(this.difficulty);

        this.moveTut = this.physics.add.sprite(448, 320, 'MoveTutorial');
        this.moveTut.body.immovable = true;
        this.moveTut.body.setAllowGravity(false).setVelocityX(-70);

        this.bounceTut = this.physics.add.sprite(1344, 320, 'BounceTutorial');
        this.bounceTut.body.immovable = true;
        this.bounceTut.body.setAllowGravity(false).setVelocityX(-100);

        this.spikeTut = this.physics.add.sprite(1792, 362, 'SpikesTutorial');
        this.spikeTut.body.immovable = true;
        this.spikeTut.body.setAllowGravity(false).setVelocityX(-100);

        this.jumpTut = this.physics.add.sprite(768, 192, 'JumpTutorial');
        this.jumpTut.body.immovable = true;
        this.jumpTut.body.setAllowGravity(false);

        this.pointsTut = this.physics.add.sprite(2816, 192, 'PointsTutorial');
        this.pointsTut.body.immovable = true;
        this.pointsTut.body.setAllowGravity(false).setVelocityX(-70);

        this.plat2 = this.physics.add.sprite(768, 256, 'Platform');
        this.plat2.body.immovable = true;
        this.plat2.body.setAllowGravity(false).setVelocityX(this.difficulty);
        
        this.plat3 = this.physics.add.sprite(768, 576, 'Platform');
        this.plat3.body.immovable = true;
        this.plat3.body.setAllowGravity(false).setVelocityX(this.difficulty);

        this.bounce1 = this.physics.add.sprite(416, 400, 'Bounce');
        this.bounce1.body.immovable = true;
        this.bounce1.body.setAllowGravity(false).setVelocityX(this.difficulty);

        this.bounce2 = this.physics.add.sprite(928, 528, 'Bounce');
        this.bounce2.body.immovable = true;
        this.bounce2.body.setAllowGravity(false).setVelocityX(this.difficulty);

        // Spike Spawn
        this.spikeSpawn = Math.floor(Math.random() * 2);

        if (this.spikeSpawn === 0) {
            this.spike = this.physics.add.sprite(768, 192, 'Spike');
        }
        else if (this.spikeSpawn === 1) {
            this.spike = this.physics.add.sprite(768, 512, 'Spike');
        }
        this.spike.body.immovable = true;
        this.spike.body.setAllowGravity(false).setVelocityX(this.difficulty);

        // Coin Spawn
        if (this.spikeSpawn === 0) {
            this.coin = this.physics.add.sprite(768, 64, 'Coin');
        }
        else if (this.spikeSpawn === 1) {
            this.coin = this.physics.add.sprite(768, 368, 'Coin');
        }
        this.coin.body.immovable = true;
        this.coin.body.setAllowGravity(false).setVelocityX(this.difficulty);

        // Jump Piece Spawn
        this.jumpPieceSpawn = Math.floor(Math.random() * 3);
        if (this.jumpPieceSpawn === 0) {
            this.jumpPiece = this.physics.add.sprite(896, 192, 'JumpPiece');
        }
        else if (this.jumpPieceSpawn === 1) {
            this.jumpPiece = this.physics.add.sprite(896, 496, 'JumpPiece');
        }
        else {
            this.jumpPiece = this.physics.add.sprite(896, 1100, 'JumpPiece');
        }
        this.jumpPiece.body.immovable = true;
        this.jumpPiece.body.setAllowGravity(false).setVelocityX(this.difficulty);

        // set up player
        this.player = this.physics.add.sprite(256, 300, 'Player').setScale(1);
        this.player.setFlip(true, false);
        this.player.destroyed = false;
        this.playerX = this.player.body.x;
        this.playerY = this.player.body.y;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.player, this.plat1);
        this.physics.add.collider(this.player, this.plat2);
        this.physics.add.collider(this.player, this.plat3);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('walk', { 
                start: 0, 
                end: 6, 
                first: 0
            }),
            frameRate: 13
        });

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#292929',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
                left: 20,
                right: 20,
            },
            fixedWidth: 200
        }
        this.scoreLeft = this.add.text(128, 64, "points : " + this.points, scoreConfig);

        let jumpConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#292929',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
                left: 20,
                right: 30,
            },
            fixedWidth: 350
        }
        this.scoreRight = this.add.text(576, 64, "Jump Pieces : " + this.jump + " / 3", jumpConfig);
    }

    update() {
        this.background.tilePositionX += 0.5;
        if (!this.player.destroyed) {
            if (cursors.left.isDown) {
                this.player.body.setVelocityX(this.velocity * -1);
                this.player.anims.play('walk', true);
                this.player.resetFlip();
            } else if (cursors.right.isDown) {
                this.player.body.setVelocityX(this.velocity);
                this.player.anims.play('walk', true);
                this.player.setFlip(true, false);
            } else {
                this.player.body.setVelocityX(0);
            }
            if (cursors.down.isDown) {
                this.ignore = true;
            } else {
                this.ignore = false;
            }
            if (!this.ignore && this.player.body.touching.down && (this.bounceCollision(this.player, this.bounce1) || this.bounceCollision(this.player, this.bounce2))) {
                this.sound.play("BounceSFX");
                this.player.body.setVelocityY(this.JUMP_VELOCITY);
            }
            if (this.jumpbool && this.bounceCollision(this.player, this.jumpPiece)) {
                this.jump ++;
                this.scoreRight.text = "Jump Pieces : " + this.jump + " / 3";
                this.jumpbool = false;
                this.jumpPiece.destroy();
                this.jumpTut.destroy();
                this.AddJumpPiece(this.spike.x + 1152);
                this.jumppieceSFX.play()
                console.log(this.jump);
            }
            if (this.coinbool && this.bounceCollision(this.player, this.coin)) {
                this.points ++;
                this.scoreLeft.text = "points : " + this.points;
                this.coinbool = false;
                this.coin.destroy();
                this.sound.play('CoinSFX');
                console.log(this.points);
                if (this.difficulty < (this.velocity * -1))
                {
                    this.difficulty -= 20;
                    this.changeDifficulty();
                }
            }
            if (this.jump >= 3) {
                this.tempJump(this.player);
            }
        }

	    if (this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

        if (this.plat1.x <= 256) {
            this.AddPlat1();
            if (this.plat1.x <= -256) {
                this.plat1.destroy();
            }
        }

        if (this.plat2.x <= 256) {
            this.AddPlat2();
            this.AddPlat3();
            if (this.plat2.x <= -256) {
                this.plat2.destroy();
            }
            if (this.plat3.x <= -256) {
                this.plat3.destroy();
            }
        }
        
        if (this.bounce1.x <= 256) {
            this.AddBounce1();
            if (this.bounce1.x <= -256) {
                this.bounce1.destroy();
            }
        }

        if (this.bounce2.x <= 256) {
            this.AddBounce2();
            if (this.bounce2.x <= -256) {
                this.bounce2.destroy();
            }
        }

        if (this.spike.x <= 256) {
            this.AddSpike();
            this.coinbool = true;
            if (this.spike.x <= -256) {
                this.spike.destroy();
            }
        }

        if (this.jumpPiece.x <= 256) {
            this.AddJumpPiece(1280);
        }

        if (this.moveTut.x <= -256) {
            this.moveTut.destroy();
        }

        if (this.spikeTut.x <= -256) {
            this.spikeTut.destroy();
        }

        if (this.spikeTut.x <= -256) {
            this.spikeTut.destroy();
        }

        if (this.player.y >= 1088 || this.player.x <= -64 || this.bounceCollision(this.player, this.spike)) {
            this.playerDeath();
        }
    }

    bounceCollision(player, bounce) {
        if (player.x < bounce.x + bounce.width / 16 && 
            player.x + player.width / 16 > bounce.x && 
            player.y < bounce.y + bounce.height &&
            player.height + player.y > bounce.y) {
            return true;
          } else {
            return false;
          }
    }

    changeDifficulty() {
        this.plat2.body.setVelocityX(this.difficulty);
        this.plat3.body.setVelocityX(this.difficulty);
        this.plat1.body.setVelocityX(this.difficulty);
        this.bounce1.body.setVelocityX(this.difficulty);
        this.bounce2.body.setVelocityX(this.difficulty);
        this.spike.body.setVelocityX(this.difficulty);
        if (this.jumpPiece.body != undefined)
            this.jumpPiece.body.setVelocityX(this.difficulty);        
    }

    tempJump(player) {
        if (player.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            player.body.setVelocityY(-1000);
            this.sound.play('JumpSFX');
        }
        this.time.delayedCall(25000, () => { 
            this.jump = 0;
            this.scoreRight.text = "Jump Pieces : " + this.jump + " / 3";
         });
    }

    playerDeath() {
        this.player.destroyed = true;
        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
        });

        this.player.destroy();
        this.time.delayedCall(3000, () => { this.bgm.stop(); });
        this.time.delayedCall(3000, () => { this.scene.start('gameOverScene'); });
    }
}