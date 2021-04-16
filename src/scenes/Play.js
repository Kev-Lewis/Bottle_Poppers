class Play extends Phaser.Scene 
{
    constructor() {
        super("playScene");
    }

    preload() 
    {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() 
    {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // black borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000001).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000001).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000001).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000001).setOrigin(0, 0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*2, 'spaceship', 0, 30, 1).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*4 + borderPadding, 'spaceship', 0, 20, 1).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*2, 'spaceship', 0, 10, 1).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

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
                top: borderPadding/2,
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
                top: borderPadding/2,
                bottom: 1,
            },
            fixedWidth: 100
        }
        this.timerRight = this.add.text(game.config.width - borderPadding*12.4, 0, this.game.settings.gameTimer, timerConfig);
        this.updateTimer();
        
        // play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
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

        this.starfield.tilePositionX -= starSpeed;

        if(!this.gameOver) 
        {
            // update rocket
            this.p1Rocket.update();

            // update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) 
        {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) 
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) 
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        // update timer
        this.timerRight.text = this.countdownTimer/1000;
    }

    checkCollision(rocket, ship) 
    {
        // simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) 
    {
        // temporarily hide ship
        ship.alpha = 0;
        
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.direction = Phaser.Math.Between(1, 2);
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        // play sound
        this.sound.play('sfx_explosion');
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