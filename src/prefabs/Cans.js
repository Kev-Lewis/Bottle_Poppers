"use strict";

class Spaceship extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame, pointValue, direction) 
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                                  // add to existing scene
        this.points = pointValue;                                  // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;             // pixels per frame
        this.direction = Phaser.Math.Between(1, 2);                // randomize direction
    }

    update() 
    {
        if (this.direction == 1)
        {
            // move spaceship left  
            this.x -= this.moveSpeed;
            // wrap around from left to right edge
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        }
        else
        {
            // move spaceship right
            this.x += this.moveSpeed;
            // wrap from right edge to left edge
            if (this.x >= game.config.width - this.width) {
                this.reset();
            }
        }
    }

    // position reset
    reset() 
    {
        if (this.direction == 1)
        {
            this.x = game.config.width;
        }
        else
        {
            this.x = 0;
        }
    }
}