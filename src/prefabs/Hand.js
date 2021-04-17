"use strict";

// Hand (player) prefab
class Hand extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;                              // track bottle firing status
        this.moveSpeed = 2;                                 // pixels per frame
        this.currentFrame = 0;
        this.counter = 0;
        this.counter2 = 0;
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } 
            else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if(keyF.isDown && !this.isFiring) {
            this.isFiring = true;
        }

        if (this.isFiring == true)
        {
            if (this.counter < 15)
            {
                
                this.counter += 1;
            }
            else if (this.counter >= 15 && this.currentFrame < 3)
            {
                this.updateFrame();
            }
        }

        if (this.counter2 < 203 && this.isFiring && this.currentFrame == 3)
        {
            this.counter2 += 1;
        }
        else if (this.counter2 >= 203 && this.isFiring && this.currentFrame == 3)
        {
            this.reset();
        }
    }

    updateFrame()
    {
        if (this.currentFrame == 0)
        {
            this.setFrame('HandFrame2');
            this.currentFrame = 1;
            this.counter = 0;
        }
        else if (this.currentFrame == 1)
        {
            this.setFrame('HandFrame3');
            this.currentFrame = 2;
            this.counter = 0;
        }
        else if (this.currentFrame == 2)
        {
            this.setFrame('HandFrame4');
            this.currentFrame = 3;
            this.counter = 0;
        }
    }

    // reset cap to "ground"
    reset() 
    {
        this.isFiring = false;
        this.setFrame('HandFrame1');
        this.currentFrame = 0;
        this.counter = 0;
        this.counter2 = 0;
    }
}