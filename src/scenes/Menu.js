"use strict";

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('menu_noise', './assets/MenuScreenNoise.wav');
        this.load.audio('CanHit1', './assets/CanHit1.wav');
        this.load.audio('CanHit2', './assets/CanHit2.wav');
        this.load.audio('CanHit3', './assets/CanHit3.wav');
        this.load.audio('cap_pop', './assets/CapPop.wav');
        this.load.audio('BGmusic', './assets/BGmusic.wav');

        // load menu screen asset
        this.load.atlas('MenuScreen', './assets/BottlePlayScreen.png', './assets/BottlePlayScreen.json');
    }

    create() {
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // add menu screen
        this.add.sprite(game.config.width/2, game.config.height/2, 'MenuScreen', 'BottleFrame1');

        // menu screen animation variable
        this.animationPlayed = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && this.animationPlayed == 0) {
            // normal mode
            this.animationPlayed = 1;
            this.sound.play('menu_noise');

            // start playing bottle animation
            this.clock = this.time.delayedCall(400, () => {
                this.add.sprite(game.config.width/2, game.config.height/2, 'MenuScreen', 'BottleFrame2');
                this.clock = this.time.delayedCall(400, () => {
                    this.add.sprite(game.config.width/2, game.config.height/2, 'MenuScreen', 'BottleFrame3');
                    this.clock = this.time.delayedCall(400, () => {
                        this.add.sprite(game.config.width/2, game.config.height/2, 'MenuScreen', 'BottleFrame4');
                        this.clock = this.time.delayedCall(400, () => {
                            game.settings = {
                                canSpeed: 3,
                                gameTimer: 60000
                            }

                            // start game
                            this.scene.start('playScene');
                        }, null, this);
                    }, null, this);
                }, null, this);
            }, null, this);
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.animationPlayed == 0) {
            // hard mode
            this.animationPlayed = 1;
            this.sound.play('menu_noise');
            
            // start playing bottle animation
            this.clock = this.time.delayedCall(400, () => {
                this.add.sprite(game.config.width/2, game.config.height/2, 'MenuScreen', 'BottleFrame2');
                this.clock = this.time.delayedCall(400, () => {
                    this.add.sprite(game.config.width/2, game.config.height/2, 'MenuScreen', 'BottleFrame3');
                    this.clock = this.time.delayedCall(400, () => {
                        this.add.sprite(game.config.width/2, game.config.height/2, 'MenuScreen', 'BottleFrame4');
                        this.clock = this.time.delayedCall(400, () => {
                            game.settings = {
                                canSpeed: 4,
                                gameTimer: 45000
                            }

                            // start game
                            this.scene.start('playScene');
                        }, null, this);
                    }, null, this);
                }, null, this);
            }, null, this);
        }
    }
}