# PACMAN
Web Developement Immersive Project 1. 

An attempt at cloning the retro arcade game Pacman. Use the arrow keys to move pacman, and avoid the ghosts! Eat all the dots to win!


Play here: https://mattbedell.github.io/Pacman/
###### Technologies used:
* Javascript
* HTML/CSS

### Design
Mediator design pattern. A 2Dimensional array is constructed that contains an object which holds properties of the grid, corresponding to elements on the page. Ex. grid[0][0] returns an object that holds allowed movement direction, an element on the grid in position row 1 column 1, and whether or not the player character is occupying that grid space.

Animation is accomplished by changing the background image of the grid element on an interval.

Collision between the player character and the computer sprites is determined if both sprites occupy the same grid space.

![alt text](https://github.com/mattBedell/Pacman/blob/master/Screenshots/gameplay.png?raw=true "Gameplay")

Ghosts have a simple AI that detects if a change in direction is allowed, then rolls a random number to determine which direction to go.



![alt text](https://github.com/mattBedell/Pacman/blob/master/Screenshots/pacmanLanding.png?raw=true "Gameplay")

The Landing page uses a form to get the player's name and displays it on the screen.  The player's name is also used when a game condition changes (Win/Loss).


### Issues
Collision detection needs improvement, sometimes when a player and ghost 'collide' they are actually switching grid space at the same moment, which is not detected as a hit, and they simply appear to pass through eachother.

Animating characters sometimes overwrites nearby character's image, resulting in the character disappearing briefly.

### Improvements

* More robust AI
* Better collision detection
* Ghost sprite animations
* Smoother movement


