/*
Name:   Kevin Lewis
Title:  Bottle Poppers!
Class:  CMPM-120
Date:   4/18/21
Completion Time:  Around 10 hours

MOD/POINTS BREAKDOWN
--------------------
1.) Redesign the game's artwork, UI, and sound to change theme/aesthetic (60)
2.) Speed for individual Cans increases incrementally each time that they are hit (5)
3.) Randomized direction movement for Cans upon start of game and each time the Can is hit (5)
4.) One of 3 SFX is played randomly when the can is hit (5)
5.) Displays the time remaining on screen (10)
6.) Title Screen animation, bottle firing animated sprite, cap projectile animated sprite (10)
7.) Upon the Can getting hit, the Can spins off the screen **new 'explosion' animation** (5)
8.) Added background music to play scene (5)

TOTAL: 105

CITATIONS
---------
All sprite assets were pictures that were taken and edited by me. The water bottle is an aquafina bottle and the soda cans are Pepsi and A&W.
The sounds were all recorded by me using an aquafina bottle and the soda cans to make the sounds.
The background music was made by me in the garageband app.
*/

"use strict";

// game configurations
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let bgSpeed = 1;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;