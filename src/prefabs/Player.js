class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        scene.physics.add.existing(this);
        this.ACCELERATION = 2000;
        this.MAX_X_VEL = 300;   // pixels/second
        this.MAX_Y_VEL = 1000;
        // this.setMaxVelocity(500, 5000);
        this.setDrag(1000);    // Constant drag. FIXME: Change this behavior?
        this.MAX_JUMPS = 1; // change for double/triple/etc. jumps
        this.JUMP_VELOCITY = -800;
        // scene.physics.world.gravity.y = 2600;
        this.setGravityY(2600);
        this.setFlip(true, false);
    }
    
    update() {
        // left/right movement
        if (keyA.isDown) {
            this.body.setAccelerationX(-this.ACCELERATION);
            this.resetFlip();
        } else if (keyD.isDown) {
            this.body.setAccelerationX(this.ACCELERATION);
            this.setFlip(true, false);
        } else {
            // set acceleration to 0 so DRAG will take over
            this.body.setAccelerationX(0);
        }

        // Sprinting
        if (keySHIFT.isDown) {
            // console.log('Sprinting');
            this.setMaxVelocity(this.MAX_X_VEL + 200, this.MAX_Y_VEL);
        } else {
            this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        }

        // check if player is grounded
	    // this.player.isGrounded = this.player.body.touching.down; // FIXME: not sure why but this doesn't work with how the collisions are set up right now?
        this.isGrounded = this.body.onFloor();        // FIXME: onFloor() from https://labs.phaser.io/view.html?src=src/tilemap/collision/multiple%20tile%20sizes.js
	    
        // if so, we have jumps to spare 
	    if (this.isGrounded) {
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }

        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(keySPACE, 150)) {
	        this.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }

        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if (this.jumping && Phaser.Input.Keyboard.UpDuration(keySPACE)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
    }
}