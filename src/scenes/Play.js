"use strict";

class Play extends Phaser.Scene 
{
    constructor() {
        super("playScene");
    }

    preload() 
    {
        // load images/tile sprites
        this.load.image('can1', './assets/Can1.png');
        this.load.image('can2', './assets/Can2.png');
        this.load.image('background', './assets/BottlePoppersBG.png');
        
        // load cap animations
        this.load.atlas('CapAnimation', './assets/CapAnimation.png', './assets/CapAnimation.json');

        // load hand animations
        this.load.atlas('HandAnimation', './assets/HandAnimation.png', './assets/HandAnimation.json');
    }

    create() 
    {
        // place background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        // add bottle and cap
        this.BottlePopper = new BottleCap(this, game.config.width/2 + 1, game.config.height - borderUISize - borderPadding, 'CapAnimation', 'CapFrame2').setOrigin(0.5, 0);
        this.BottlePopper.alpha = 0;
        this.Hand = new Hand(this, game.config.width/2, game.config.height - borderUISize - borderPadding*4, 'HandAnimation', 'HandFrame1').setOrigin(0.5, 0);

        // add cans (x3)
        this.can1 = new Can(this, game.config.width + borderUISize*6, borderUISize*2, 'can1', 0, 5, 1).setOrigin(0, 0);
        this.can2 = new Can(this, game.config.width + borderUISize*3, borderUISize*4 + borderPadding, 'can2', 0, 3, 2).setOrigin(0, 0);
        this.can3 = new Can(this, game.config.width, borderUISize*6 + borderPadding*2, 'can1', 0, 1, 3).setOrigin(0, 0);

        // borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000001).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000001).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000001).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000001).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#696969',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: borderPadding - 5,
                bottom: 1,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderPadding*3, 0, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        
        // timer variable
        this.countdownTimer = this.game.settings.gameTimer;
        
        // display timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#696969',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: borderPadding - 5,
                bottom: 1,
            },
            fixedWidth: 100
        }
        this.timerRight = this.add.text(game.config.width - borderPadding*12.4, 0, this.game.settings.gameTimer, timerConfig);
        this.updateTimer();

        // game over text config
        let gameoverConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: borderPadding - 5,
                 bottom: 1,
            },
            fixedWidth: 600
        }

        // play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer + 60, () => {
            this.add.text(game.config.width/2 - 220, game.config.height/2, 'GAME OVER', gameoverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2 - 15, game.config.height/2 + 64, 'Press (R) to Restart,(<-) for Menu', gameoverConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // game title
        let gameConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#000001',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: borderPadding - 5,
                bottom: 1,
            },
            fixedWidth: 200
        }
        this.titleMiddle = this.add.text(game.config.width/2 - 85, 0, 'Bottle Poppers!', gameConfig);

        // random sound selector
        this.soundSelect = 1;
    }

    update() 
    {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) 
        {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) 
        {
            this.scene.start("menuScene");
        }

        this.background.tilePositionX -= bgSpeed;

        if(!this.gameOver) 
        {
            // update Bottle
            this.BottlePopper.update();
            this.Hand.update();

            // update cans (x3)
            this.can1.update();
            this.can2.update();
            this.can3.update();
        }
        
        // check collisions
        if(this.checkCollision(this.BottlePopper, this.can3, this.Hand)) 
        {
            this.BottlePopper.reset();
            this.Hand.reset();
            this.canHit(this.can3);
        }
        if(this.checkCollision(this.BottlePopper, this.can2, this.Hand)) 
        {
            this.BottlePopper.reset();
            this.Hand.reset();
            this.canHit(this.can2);
        }
        if(this.checkCollision(this.BottlePopper, this.can1, this.Hand)) 
        {
            this.BottlePopper.reset();
            this.Hand.reset();
            this.canHit(this.can1);
        }

        // update timer
        this.timerRight.text = this.countdownTimer/1000;
    }

    checkCollision(BottleCap, can, Hand) 
    {
        // simple AABB checking
        if( BottleCap.x < can.x + can.width - 10 &&
            BottleCap.x + BottleCap.width - 26 > can.x &&
            BottleCap.y < can.y + can.height - 20 &&
            BottleCap.height + BottleCap.y > can.y) {
                BottleCap.x = Hand.x - 1;
                return true;
            } else {
                BottleCap.x = Hand.x - 1;
                return false;
            }
    }

    canHit(can) 
    {  
        // score add and repaint
        this.p1Score += can.points;
        this.scoreLeft.text = this.p1Score;

        // play sound
        this.soundSelect = Phaser.Math.Between(1, 3);
        if (this.soundSelect == 1)
        {
            this.sound.play('CanHit1');
            can.moveSpeed += 0.01;
        }
        else if (this.soundSelect == 2)
        {
            this.sound.play('CanHit2');
            can.moveSpeed += 0.05;
        }
        else if (this.soundSelect == 3)
        {
            this.sound.play('CanHit3');
            can.moveSpeed += 0.1;
        }
        
        //reset can
        can.direction = Phaser.Math.Between(1, 2);
        can.hit();
    }

    updateTimer()
    {
        if (this.countdownTimer > 0)
        {
            this.clock = this.time.delayedCall(1000, () => {
                this.countdownTimer -= 1000;
                this.updateTimer();
            }, null, this);
        }
    }
}