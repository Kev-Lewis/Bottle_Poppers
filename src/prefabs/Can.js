"use strict";

class Can extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame, pointValue, whichCan) 
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                                  // add to existing scene
        this.points = pointValue;                                  // store pointValue
        this.moveSpeed = game.settings.canSpeed;             // pixels per frame
        this.direction = Phaser.Math.Between(1, 2);                // randomize direction
        this.counter = 0;
        this.hitBool = false;
        this.whichCan = whichCan;
    }

    update() 
    {
        if (this.direction == 1 && this.hitBool == false)
        {
            // move can left  
            this.x -= this.moveSpeed;
            // wrap around from left to right edge
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        }
        else if (this.direction == 2 && this.hitBool == false)
        {
            // move can right
            this.x += this.moveSpeed;
            // wrap from right edge to left edge
            if (this.x >= game.config.width - this.width) {
                this.reset();
            }
        }

        if (this.hitBool == true && this.counter <= 60 && this.direction == 1)
        {
            this.y -= 4;
            this.angle += 1;
            this.counter += 1;
        }
        else if (this.hitBool == true && this.counter >= 60 && this.direction == 1)
        {
            this.hitBool = false;
            this.reset();
            console.log('this worked');
        }
        else if (this.hitBool == true && this.counter <= 60 && this.direction == 2)
        {
            this.y -= 4;
            this.angle -= 1;
            this.counter += 1;
        }
        else if (this.hitBool == true && this.counter >= 60 && this.direction == 2)
        {
            this.hitBool = false;
            this.reset();
            console.log('this worked');
        }


    }

    // position reset
    reset() 
    {
        if (this.direction == 1 && this.whichCan == 1)
        {
            this.angle = 0;
            this.counter = 0;
            this.x = game.config.width;
            this.y = borderUISize*2;
        }
        else if (this.direction == 2 && this.whichCan == 1)
        {
            this.angle = 0;
            this.counter = 0;
            this.x = 0;
            this.y = borderUISize*2;
        }
        else if (this.direction == 1 && this.whichCan == 2)
        {
            this.angle = 0;
            this.counter = 0;
            this.x = game.config.width;
            this.y = borderUISize*4 + borderPadding;
        }
        else if (this.direction == 2 && this.whichCan == 2)
        {
            this.angle = 0;
            this.counter = 0;
            this.x = 0;
            this.y = borderUISize*4 + borderPadding;
        }
        else if (this.direction == 1 && this.whichCan == 3)
        {
            this.angle = 0;
            this.counter = 0;
            this.x = game.config.width;
            this.y = borderUISize*6 + borderPadding*2;
        }
        else if (this.direction == 2 && this.whichCan == 3)
        {
            this.angle = 0;
            this.counter = 0;
            this.x = 0;
            this.y = borderUISize*6 + borderPadding*2;
        }
    }

    hit()
    {
        this.hitBool = true;
    }
}