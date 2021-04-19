/*-------------------------------------------------
Name:   Kevin Lewis
Title:  Bottle Poppers!
Class:  CMPM-120
Date:   4/18/21
Completion Time:  Around 12 hours

--------------------
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

---------
CITATIONS
---------
All sprite assets were pictures that were taken and edited by me. The water bottle is an aquafina bottle and the soda cans are Pepsi and A&W.
The sounds were all recorded by me using an aquafina bottle and the soda cans to make the sounds.
The background is an edited photo of my ceiling, since it was the only 3D thing that I could make loop well as a background.
The background music was made by me in the garageband app.
A lot of code used in this assignment was reused code from the original Rocket Patrol tutorial assignment with me adding or changing code to add the new mods and themes.

-------------
OTHER DETAILS
-------------
When modding this game, I wanted to try and use real-life 3D assets rather than 2D assets
since I had never done that before, as well as try to use those 3D assets in a small little animated loop
to simulate movement when being used. I wanted to try and attempt something unique and something that I haven't tried before.
This was my first time using Phaser and Javascript so I was able to learn a lot from this assignment, and I think that it was a 
good experience overall.
-------------------------------------------------*/

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