class GridProperties {
  constructor(gridRow, gridColumn, totalId) {
    this.canMove = {
      //Allowable moves the sprite can make, these are changed when the map is drawn, if there are walls nearby
      dUp: true,
      dDown: true,
      dLeft: true,
      dRight: true
    }
    //Element corresponding to this objects place in the grid array
    this.elmnt;
    //This objects row and column
    this.row = gridRow;
    this.col = gridColumn;
    //This objects unique grid peice number
    this.gridId = totalId;

    //Whether there is dot occupying this gri space for pacman to eat
    this.hasDot = true;

    //Whether pacman is occupying the grid space
    this.hasPac = false;
    //Creates grid blocks corresponding to this object
    this.addElmnts();
  }
  addElmnts() {
    //Creating strings to append as classes to an html element corresponding to this objects row and column
    let appendToThisRowElmntClass = '.r' + this.row;
    let defaultGridClass = 'gridBlock';
    let gridIdNumClass = 'gb' + this.gridId;
    let newElmntClasses = defaultGridClass + ' ' + gridIdNumClass;
    let gridElmntToAppend = '<div class="' + newElmntClasses + '"></div>';
    //Appending grid element to its proper row
    $(appendToThisRowElmntClass).append(gridElmntToAppend);

    let setJqueryElmntPointerClass = '.' + gridIdNumClass;
    //Setting this objects associated element for easy lookup of elements on the page
    this.elmnt = $(setJqueryElmntPointerClass);
    //Gives all grid elements a dot for pacman to eat
    this.addDot();
  }
  addDot() {
    //Gives grid element a dot for pacman to eat
    this.hadDot = true;

    let dotClasses = 'dot ' + 'dotID' + this.gridId;
    let dotElmnt = '<div class="' + dotClasses + '"></div>';
    //Appends dot element to grid peice
    $(this.elmnt).append(dotElmnt);
  }
}
class GameBoard {
  constructor(numRows, numColumns, borderStyle) {
    //Array to hold objects in a row/column format
    this.grid = [];
    //Total grid objects created for Id puprposes
    let idCounter = 0;
    //Creates row arrays inside the grid array, as well as row elements on the page
    for(let i = 0; i < numRows; i++) {
      //Setting up strings to append as classes to the row elements
      let rowDefaultClass = 'row';
      let rowIdClass = 'r' + i;
      let newRowClasses = rowDefaultClass + ' ' + rowIdClass;
      let rowElmntToAppend = '<div class="' + newRowClasses + '"></div>';
      //Append numbered row to the game board element
      $('.gameBoard').append(rowElmntToAppend);
      //Adds a row array to the grid array, to store grid objects in each row
      this.grid[i] = [];

      for(let j = 0; j < numColumns; j++) {
        //Creates new grid objects in each row
        this.grid[i][j] = new GridProperties(i, j, idCounter);
        idCounter++;
      }
    }
    //Draws outer borders of the game board
    this.drawBorders(borderStyle);
  }
  drawBorders(borderProp) {
    //Draws top border and sets the grid properties of top row, movement up to false
    for(let i = 0; i < this.grid[0].length; i++) {
      this.grid[0][i].elmnt.css('border-top', borderProp);//Top Border
      this.grid[0][i].canMove.dUp = false;
      //Draws bottom border and sets the grid properties of bottom row, movement down to false
      this.grid[this.grid.length - 1][i].elmnt.css('border-bottom', borderProp);//Bottom Border
      this.grid[this.grid.length - 1][i].canMove.dDown = false;
    }
    //Draws left border and sets the grid properties of left row, movement left to false
    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i][0].elmnt.css('border-left', borderProp);//Left Border
      this.grid[i][0].canMove.dLeft = false;
      //Draws right border and sets the grid properties of right row, movement right to false
      this.grid[i][this.grid[0].length - 1].elmnt.css('border-right', borderProp);//Right Border
      this.grid[i][this.grid[0].length - 1].canMove.dRight = false;
    }
  }
  //Sets the background images of the grid peices to simulate movement, takes sprite position and direction as arguments
  updateGrid(mySprite, direction) {
    //Sets grid background to the sprites current image
    this.grid[mySprite.row][mySprite.column].elmnt.css('background-image', mySprite.assets.current);
    this.grid[mySprite.row][mySprite.column].hasPac = true;
    switch(direction) {
      case 'right':
        //If the sprite is moving right, removes the image from the sprites previous postition
        this.grid[mySprite.row ][mySprite.column - 1].elmnt.css('background-image', '');
        this.grid[mySprite.row ][mySprite.column - 1].hasPac = false;
        break;
      case 'left':
        //If the sprite is moving left, removes the image from the sprites previous postition
        this.grid[mySprite.row][mySprite.column + 1].elmnt.css('background-image', '');
        this.grid[mySprite.row ][mySprite.column + 1].hasPac = false;
        break;
      case 'up':
        //If the sprite is moveing up, removes the image from the sprites previous postition
        this.grid[mySprite.row + 1][mySprite.column ].elmnt.css('background-image', '');
          this.grid[mySprite.row + 1][mySprite.column].hasPac = false;
        break;
      case 'down':
        //If the sprite is moveing down, removes the image from the sprites previous postition
        this.grid[mySprite.row - 1][mySprite.column ].elmnt.css('background-image', '');
          this.grid[mySprite.row - 1][mySprite.column].hasPac = false;
        break;
      case 'reset':
        //Clears the sprites current position of image, for when sprite is teleported somwhere else
        this.grid[mySprite.row][mySprite.column].elmnt.css('background-image', '');
    }
  }
  //Updates the sprites correct position image when the sprite telports from one side of the map to the other
  updateTeleport(mySprite, direction){
    switch(direction){
      case 'left':
      //Clears the image when sprite teleports from left to right
      this.grid[10][0].elmnt.css('background-image', '');
      break;

      case 'right':
      //Clears image when sprite teleports for right to left
        this.grid[10][20].elmnt.css('background-image', '');
        break;
      case 'start':
      //Clears sprites image  from all grid peices
        for(let i = 0; i < this.grid.length; i ++) {
          for(let j = 0; j < this.grid[i].length; j ++) {
            if(this.grid[i][j].hasPac === true && i != mySprite.row && j != mySprite.column) {
              this.grid[i][j].elmnt.css('background-image', '');
          }
        }
      }
    }
  }
}
class Sprite {
  constructor(spriteType, startingRow, startingColumn, gBoard) {
    //If player character or which color ghost is being created
    this.spriteType = spriteType;
    //Initial movement direction for AI
    this.aiDirection = 'right';
    //Intial postion of sprite when created
    this.row = startingRow;
    this.column = startingColumn;
    //Grid, so the sprite can read the grid properties and determine if movement is allowed
    this.readGrid = gBoard;
    this.assets = {
      //Animation counter and current image, cycles through a list of image to simulate movement and animation
      counter: 0,
      current: undefined,
      list: undefined,
    }
    switch(this.spriteType) {
      case 'pacman':
      //List of sprite images to use if a player character is made
        this.assets.list = {
          aRight: ['url(assets/pacStart.png)', 'url(assets/pacRight2.png)', 'url(assets/pacRight3.png)'],
          aLeft: ['url(assets/pacStart.png)', 'url(assets/pacLeft2.png)', 'url(assets/pacLeft3.png)'],
          aUp: ['url(assets/pacStart.png)', 'url(assets/pacUp2.png)', 'url(assets/pacUp3.png)'],
          aDown: ['url(assets/pacStart.png)', 'url(assets/pacDown2.png)', 'url(assets/pacDown3.png)']
        }
        break;
        //Images to use for ghosts, depending on the color
      case 'ghostRed':
        this.assets.list = 'url(assets/ghostRed.png)';
        break;
      case 'ghostBlue':
        this.assets.list = 'url(assets/ghostBlue.png)';
        break;
      case 'ghostPink':
        this.assets.list = 'url(assets/ghostPink.png)';
        break;
      case 'ghostOrange':
        this.assets.list = 'url(assets/ghostOrange.png)';
        break;
    }
  }
  ghostMove() {
    //Ghost AI movement, checks if movement is allowed by reading grid properties, then rolls a random number to determine which way to go
     switch(this.aiDirection) {
       //This is pretty self explanatory, checks if the move is allowed, rolls a random number and moves in the direction asscociated with that number
       case 'right'://RIGHT MASTER
         if (this.readGrid[this.row][this.column].canMove.dRight === true || this.readGrid[this.row][this.column].canMove.dUp === true || this.readGrid[this.row][this.column].canMove.dDown === true) {
           let randomDirection = Math.floor(Math.random() * 3);
           switch(randomDirection){
             case 0://UP
               if(this.readGrid[this.row][this.column].canMove.dUp === true) {
                 this.row -= 1;
                 this.aiDirection = 'up';
                 this.updateAsset();
               } else if(this.readGrid[this.row][this.column].canMove.dDown === true){
                 this.row += 1;
                 this.aiDirection = 'down';
                 this.updateAsset();
               } else if (this.readGrid[this.row][this.column].canMove.dRight === true) {
                 this.column += 1;
                 this.aiDirection = 'right';
                 this.updateAsset();
               }
             break;

             case 1://DOWN
               if(this.readGrid[this.row][this.column].canMove.dDown === true){
                 this.row += 1;
                 this.aiDirection = 'down';
                 this.updateAsset();
               } else if (this.readGrid[this.row][this.column].canMove.dUp === true) {
                 this.row -= 1;
                 this.aiDirection = 'up';
                 this.updateAsset();
               } else if (this.readGrid[this.row][this.column].canMove.dRight === true) {
                 this.column += 1;
                 this.aiDirection = 'right';
                 this.updateAsset();
               }
             break;

             default:
              if(this.readGrid[this.row][this.column].canMove.dRight === true) {
                this.column += 1;
                this.aiDirection = 'right';
                this.updateAsset();
              }
           }
         } else if (this.readGrid[this.row][this.column].canMove.dLeft === true) {
           this.column -= 1;
           this.aiDirection = 'left';
           this.updateAsset();
         }
         break;

       case 'left'://LEFT MASTER
       if (this.readGrid[this.row][this.column].canMove.dLeft === true || this.readGrid[this.row][this.column].canMove.dUp === true || this.readGrid[this.row][this.column].canMove.dDown === true) {
         let randomDirection = Math.floor(Math.random() * 3);
         switch(randomDirection){
           case 0://UP
             if(this.readGrid[this.row][this.column].canMove.dUp === true) {
               this.row -= 1;
               this.aiDirection = 'up';
               this.updateAsset();
             } else if (this.readGrid[this.row][this.column].canMove.dDown === true){
               this.row += 1;
               this.aiDirection = 'down';
               this.updateAsset();
             } else if(this.readGrid[this.row][this.column].canMove.dLeft === true){
               this.column -= 1;
               this.aiDirection = 'left';
               this.updateAsset();
             }
           break;

           case 1://DOWN
             if(this.readGrid[this.row][this.column].canMove.dDown === true){
               this.row += 1;
               this.aiDirection = 'down';
               this.updateAsset();
             } else if(this.readGrid[this.row][this.column].canMove.dUp === true) {
               this.row -= 1;
               this.aiDirection = 'up';
               this.updateAsset();
             } else if (this.readGrid[this.row][this.column].canMove.dLeft === true){
               this.column -= 1;
               this.aiDirection = 'left';
               this.updateAsset();
             }
           break;

           default:
           if(this.readGrid[this.row][this.column].canMove.dLeft === true){
              this.column -= 1;
              this.aiDirection = 'left';
              this.updateAsset();
            }
         }
       } else if (this.readGrid[this.row][this.column].canMove.dRight === true){
         this.column += 1;
         this.aiDirection = 'right';
         this.updateAsset();
       }
       break;

       case 'up'://UP MASTER
       if (this.readGrid[this.row][this.column].canMove.dUp === true || this.readGrid[this.row][this.column].canMove.dLeft === true || this.readGrid[this.row][this.column].canMove.dRight === true) {
         let randomDirection = Math.floor(Math.random() * 3);
         switch(randomDirection){
           case 0://LEFT
             if(this.readGrid[this.row][this.column].canMove.dLeft === true) {
               this.column -= 1;
               this.aiDirection = 'left';
               this.updateAsset();
             } else if (this.readGrid[this.row][this.column].canMove.dRight === true) {
               this.column += 1;
               this.aiDirection = 'right';
               this.updateAsset();
             } else if(this.readGrid[this.row][this.column].canMove.dUp === true){
               this.row -= 1;
               this.aiDirection = 'up';
               this.updateAsset();
             }
           break;

           case 1://RIGHT
             if(this.readGrid[this.row][this.column].canMove.dRight === true){
               this.column += 1;
               this.aiDirection = 'right';
               this.updateAsset();
             } else if (this.readGrid[this.row][this.column].canMove.dLeft === true) {
               this.column -= 1;
               this.aiDirection = 'left';
               this.updateAsset();
             } else if(this.readGrid[this.row][this.column].canMove.dUp === true){
               this.row -= 1;
               this.aiDirection = 'up';
               this.updateAsset();
             }
           break;

           default:
            if(this.readGrid[this.row][this.column].canMove.dUp === true){
              this.row -= 1;
              this.aiDirection = 'up';
              this.updateAsset();
            }
         }
       } else if (this.readGrid[this.row][this.column].canMove.dDown === true) {
         this.row += 1;
         this.aiDirection = 'down';
         this.updateAsset();
       }
       break;

       case 'down'://DOWN MASTER
       if (this.readGrid[this.row][this.column].canMove.dDown === true || this.readGrid[this.row][this.column].canMove.dLeft === true || this.readGrid[this.row][this.column].canMove.dRight === true) {
         let randomDirection = Math.floor(Math.random() * 3);
         switch(randomDirection){
           case 0://LEFT
             if(this.readGrid[this.row][this.column].canMove.dLeft === true) {
               this.column -= 1;
               this.aiDirection = 'left';
               this.updateAsset();
             } else if (this.readGrid[this.row][this.column].canMove.dRight === true) {
               this.column += 1;
               this.aiDirection = 'right'
               this.updateAsset();
             } else if(this.readGrid[this.row][this.column].canMove.dDown === true) {
               this.row += 1;
               this.aiDirection = 'down';
               this.updateAsset();
             }
           break;

           case 1://RIGHT
             if(this.readGrid[this.row][this.column].canMove.dRight === true){
               this.column += 1;
               this.aiDirection = 'right';
               this.updateAsset();
             } else if (this.readGrid[this.row][this.column].canMove.dLeft === true) {
               this.column -= 1;
               this.aiDirection = 'left';
               this.updateAsset();
             } else if(this.readGrid[this.row][this.column].canMove.dDown === true){
               this.row += 1;
               this.aiDirection = 'down';
               this.updateAsset();
             }
           break;

           default:
            if(this.readGrid[this.row][this.column].canMove.dDown === true){
              this.row += 1;
              this.aiDirection = 'down';
              this.updateAsset();
            }
         }
       } else if(this.readGrid[this.row][this.column].canMove.dUp === true){
         this.row -= 1;
         this.aiDirection = 'up';
         this.updateAsset();
       }
       break;
     }
  }
  checkMove(direction) {
    //Checks if the player character can move in the direction inputed by user, then cycles the bacground image for that movement direction, to be passed to the grid for background image change
    switch(direction) {
      case 'right':
        if (this.readGrid[this.row][this.column].canMove.dRight === true) {
          this.column += 1;
          this.updateAsset(direction);
        }
        break;
      case 'left':
        if (this.readGrid[this.row][this.column].canMove.dLeft === true) {
          this.column -= 1;
          this.updateAsset(direction);
        }
        break;
      case 'up':
        if (this.readGrid[this.row][this.column].canMove.dUp === true) {
          this.row -= 1;
          this.updateAsset(direction);
        }
        break;
      case 'down':
        if (this.readGrid[this.row][this.column].canMove.dDown === true) {
          this.row += 1;
          this.updateAsset(direction);
        }
        break;
    }
  }
  updateAsset(direction) {
    //Cycles through a list of movement images for the character, then is red by the grid to put it on the board
    switch(direction){
      case 'right':
        if(this.assets.counter < this.assets.list.aRight.length) {
          this.assets.current = this.assets.list.aRight[this.assets.counter];
          this.assets.counter++;
        } else {
          this.assets.counter = 0;
          this.assets.current = this.assets.list.aRight[this.assets.counter];
          this.assets.counter++;
        }
      break;
      case 'left':
        if(this.assets.counter < this.assets.list.aLeft.length) {
          this.assets.current = this.assets.list.aLeft[this.assets.counter];
          this.assets.counter++;
        } else {
          this.assets.counter = 0;
          this.assets.current = this.assets.list.aLeft[this.assets.counter];
          this.assets.counter++;
        }
      break;
      case 'up':
        if(this.assets.counter < this.assets.list.aUp.length) {
          this.assets.current = this.assets.list.aUp[this.assets.counter];
          this.assets.counter++;
        } else {
          this.assets.counter = 0;
          this.assets.current = this.assets.list.aUp[this.assets.counter];
          this.assets.counter++;
        }
      break;
      case 'down':
        if(this.assets.counter < this.assets.list.aDown.length) {
          this.assets.current = this.assets.list.aDown[this.assets.counter];
          this.assets.counter++;
        } else {
          this.assets.counter = 0;
          this.assets.current = this.assets.list.aDown[this.assets.counter];
          this.assets.counter++;
        }
      break;
      default:
        this.assets.current = this.assets.list;
    }
  }
  flashPlayer () {
    //toggles the characters current image off and on when run, to flash when death
    if(this.assets.current != '') {
      this.assets.current = '';
    } else {
      this.assets.current = this.assets.list.aRight[0];
    }
  }
}


class GameController {
  //Controls interaction between game objects, checks win/lose conditions
  constructor() {
    //Adds listener to the reset button to reset game
    this.resetBtn = $('.resetButton');
    let that = this;
    this.resetBtn.on('click', function(){
      //resets player, AI positions, score, dots on board
      that.resetGame();
    })
    //Which direction the player wants to move
    this.playerInput = 'right';
    //Creates new gameboard objects and constructs grid
    this.board = new GameBoard(21, 21, '1px solid blue');
    //New player sprite
    this.player = new Sprite('pacman', 15, 9, this.board.grid);
    //New AI sprites
    this.blueGhost = new Sprite('ghostBlue', 11, 6, this.board.grid);
    this.pinkGhost = new Sprite('ghostPink', 11, 14, this.board.grid);
    this.redGhost = new Sprite('ghostRed', 11, 10, this.board.grid);
    this.orangeGhost = new Sprite('ghostOrange', 11, 10, this.board.grid)
    //Sets score and lives
    this.score = 0;
    this.lives = 3;
    //Interval for player movement, so can be cleared on game pause
    this.playerIntervalId;
    //Interval for computer movement, can be cleared on game pause
    this.aiIntervalId;
    //Total number of dots, compared against dots eaten for win condition
    this.dotTotal = 0;
    //New mapbuilder object ot create walls on grid, fed grid coordinates to draw walls
    this.buildMap = new MapBuilder(rowCoords, colCoords, dotCoords, this.board.grid);
    //Starts the game
    this.runGame();
    //Sets key listeners and player direction input
    this.getInput();
    //Checks if all the dots are eaten
    this.countTotalDots();
    //Gets player name from url
    this.grabPlayerName();
  }
  grabPlayerName(){
    //gets player name from url and displays it on the board
    let nameGrab = window.location.href;
    nameGrab = nameGrab.split('=');
    nameGrab = nameGrab[1].split('+');
    if(nameGrab.length > 1) {
      nameGrab = nameGrab[0] + ' ' + nameGrab[1];
    }
    this.playerName = nameGrab;
    $('.displayPlayerName').text(this.playerName);
  }
  resetGame() {
    //Resets game on win/lose condition
    //Popup for reset game button
    $('.conditionContainer').css('visibility', 'hidden');
    $('.scoreNum').text('Score: ');
    this.score = 0;
    //sends player to start and resets dots, sprites, lives, and starts a new game
    this.playerTeleport('start');
    this.resetSprites();
    this.resetDots();
    this.resetLives();
    this.runGame();

  }
  resetDots(){
    //Gives dots to every grid piece on reset
    for(let i = 0; i < this.board.grid.length; i++){
       for(let j = 0; j < this.board.grid[i].length; j++){
        this.board.grid[i][j].hasDot = true;
        this.board.grid[i][j].elmnt.children().addClass('dot');
       }
    }
    //Removes dots inside walls, based of array of coordinates fed to the function
    this.buildMap.removeDots();
  }
  resetLives(){
    //Gues what this does, resets lives
    this.lives = 3;
    let counter = 1;
    for(let i = 0; i < this.lives; i++){
      $('.life' + counter).addClass('lives')
      counter++;
    }
  }
  runGame() {
    //Sets intervals for player and ghost movement, checks for wins and collisions
    let that = this;
    this.playerIntervalId = setInterval(function() {
      if(that.score === that.dotTotal) {
        //Is it neccesary to comment when the functions say what they do?
        that.pauseGame();
        that.gameWin();
      }
      that.playerTeleport(that.playerInput);
      //Checks if player movement is allowed in that direction
      that.player.checkMove(that.playerInput);
      //Tells the grid to update the image of the player to simulate movement
      that.board.updateGrid(that.player, that.playerInput);
      //Removes dots when player moves over them and adds to the score
      that.takeDotGiveScore(that.player.row, that.player.column);
      //Checks if player and ghost occupy the same space;
      that.checkDeath();

    }, 150)
    this.aiIntervalId = setInterval(function() {
      //Moves ghosts and tells the grid to animate them
      that.blueGhost.ghostMove();
      that.board.updateGrid(that.blueGhost, that.blueGhost.aiDirection);

      that.pinkGhost.ghostMove();
      that.board.updateGrid(that.pinkGhost, that.pinkGhost.aiDirection);

      that.redGhost.ghostMove();
      that.board.updateGrid(that.redGhost, that.redGhost.aiDirection);

      that.orangeGhost.ghostMove();
      that.board.updateGrid(that.orangeGhost, that.orangeGhost.aiDirection);
    }, 150)
  }
  checkDeath(){
    //Checks if player and ghost occupy the same space
      if(this.player.row === this.redGhost.row && this.player.column === this.redGhost.column) {
        //Runs the death function, removes life and resets player to start
        this.playerDeath();
      }
      if (this.player.row === this.blueGhost.row && this.player.column === this.blueGhost.column) {
        this.playerDeath();
      }
      if (this.player.row === this.pinkGhost.row && this.player.column === this.pinkGhost.column) {
        this.playerDeath();
      }
      if (this.player.row === this.orangeGhost.row && this.player.column === this.orangeGhost.column) {
        this.playerDeath();
      }
    }
  playerDeath () {
    this.lives -= 1;
    //Removes live and restes player to start
    this.removeLifeIcon();
    this.resetSprites();
    let that = this;
    let counter = 0;
    this.pauseGame();
    //Pauses game and flashes the player for short period, then resets player to start
    let pauseInterval = setInterval(function(){
      that.player.flashPlayer();
      that.board.updateGrid(that.player);
      counter += 100;
      if(counter > 1000) {
        if(that.lives < 0){
          that.gameOver();
          clearInterval(pauseInterval);
        } else {
          clearInterval(pauseInterval);

          //Resumes game after player blinks enough
          that.runGame();
          that.playerTeleport('start');
        }
      }
    }, 300)
  }
  gameOver () {
    //Displays popup with score, playername and reset button
    $('.gameConditionText').text('You are out of lives!')
    $('.playerName').text('Try Again ' + this.playerName + '!')
    $('.playerScore').text('Score: ' + this.score * 100);
    $('.conditionContainer').css('visibility', 'visible');
  }
  gameWin () {
    //Displays popup with score, playername and reset button
    $('.gameConditionText').text('You Win!')
    $('.playerName').text('Well Done ' + this.playerName + '!')
    $('.playerScore').text('Score: ' + this.score * 100);
    $('.conditionContainer').css('visibility', 'visible');
  }
  resetSprites(){
    //Resets the ghosts to the starting position
    this.board.updateGrid(this.pinkGhost, 'reset');
    this.pinkGhost.row = 11;
    this.pinkGhost.column = 14;
    this.board.updateGrid(this.pinkGhost, this.pinkGhost.aiDirection);

    this.board.updateGrid(this.blueGhost, 'reset');
    this.blueGhost.row = 11;
    this.blueGhost.column  = 6;
    this.board.updateGrid(this.blueGhost, this.blueGhost.aiDirection);

    this.board.updateGrid(this.redGhost, 'reset');
    this.redGhost.row = 11;
    this.redGhost.column = 10;
    this.board.updateGrid(this.redGhost, this.redGhost.aiDirection);

    this.board.updateGrid(this.orangeGhost, 'reset');
    this.orangeGhost.row = 11;
    this.orangeGhost.column = 10;
    this.board.updateGrid(this.orangeGhost, this.orangeGhost.aiDirection);

  }
  removeLifeIcon() {
    //Removes life icon from top of the screen
    switch(this.lives){
      case 0:
      $('.life1').removeClass('lives');
      break;

      case 1:
      $('.life2').removeClass('lives');
      break;

      case 2:
      $('.life3').removeClass('lives');
      break;
    }
  }
  playerTeleport(direction) {
    switch(direction) {
      //If player moves in off the board from the right move him to the left and vice versa
      case 'left':
        if(this.player.row === 10 && this.player.column === 0) {
          this.player.row = 10;
          this.player.column = 20;
          this.board.updateTeleport(this.player, this.playerInput);
        }
      break;
      case 'right':
        if(this.player.row === 10 && this.player.column === 20) {
          this.player.row = 10;
          this.player.column = 0;
          this.board.updateTeleport(this.player, this.playerInput);
        }
      break;
      //Moves player to the scarting position
      case 'start':
      this.player.row = 15;
      this.player.column = 9;
      this.playerInput = 'right';
      this.board.updateTeleport(this.player, direction);
  }
  }
  getInput() {
    //Gets input based on keycodes inputted and tranlates that to a direction
    let that = this;
    $('body').on('keydown', function(e){
       switch(e.keyCode){
          case 38://UP
            if(that.board.grid[that.player.row][that.player.column].canMove.dUp === true){
              that.playerInput = 'up';
            }
          break;
          case 40://DOWN
          if(that.board.grid[that.player.row][that.player.column].canMove.dDown === true){
            that.playerInput = 'down';
          }
          break;
          case 37://LEFT
          if(that.board.grid[that.player.row][that.player.column].canMove.dLeft === true){
            that.playerInput = 'left';
          }
          break;
          case 39://RIGHT
          if(that.board.grid[that.player.row][that.player.column].canMove.dRight === true){
            that.playerInput = 'right';
          }
          break;
       }
    })
  }
  takeDotGiveScore(row, column) {
    //Removes dot class from inner element so the dot dissapears, adds to score
    if(this.board.grid[row][column].hasDot === true) {
      this.score++;
      this.board.grid[row][column].hasDot = false;
      this.board.grid[row][column].elmnt.children().removeClass('dot');
      $('.scoreNum').text('Score: ' + this.score * 100);
    }
  }
  countTotalDots() {
    for(let i = 0; i < this.board.grid.length; i++) {
      for(let j = 0; j < this.board.grid[i].length; j++){
        if(this.board.grid[i][j].hasDot == true) {
          this.dotTotal++;
        }
      }
    }
  }
  //Clear the movement intervals, all sprites stop moving
  pauseGame() {
    clearInterval(this.playerIntervalId);
    clearInterval(this.aiIntervalId)
  }
}
class MapCreator {
  //This is for dev purposes only. I got tired of manually inputing coordinates to draw the game walls
  //Clicked grid pieces push their coordinates to an array that can be fed to the mapbuilder object which draws the walls
  constructor(boardGrid) {
    this.grid = boardGrid;
    this.gridCoords = {
      rI: [],
      cI: []
    }
  }
  runClick(direction) {
    let that = this;
    switch(direction){
      case 'rows':
      for(let i = 0; i < this.grid.length; i++) {
        for(let j = 0; j < this.grid[0].length; j++) {
          this.grid[i][j].elmnt.on('click', function(){
            that.drawRows(i, j);
          })
        }
      }
      break;
      case 'columns':
        for(let i = 0; i < this.grid.length; i++) {
          for(let j = 0; j < this.grid[0].length; j++) {
            this.grid[i][j].elmnt.on('click', function(){
              that.drawColumns(i, j);
            })
          }
        }
      break;
      case 'dots':
        for(let i = 0; i < this.grid.length; i++) {
          for(let j = 0; j < this.grid[0].length; j++) {
            this.grid[i][j].elmnt.on('click', function(){
              that.removeDots(i, j);
            })
          }
        }
      break;
    }
  }
  drawRows(rIndex, cIndex) {
    this.gridCoords.rI.push(rIndex);
    this.gridCoords.cI.push(cIndex);
    this.grid[rIndex][cIndex].elmnt.css('border-right', '1px solid blue');
    this.grid[rIndex][cIndex].canMove.dRight = false;
    this.grid[rIndex][cIndex + 1].canMove.dLeft = false;
  }
  drawColumns(rIndex, cIndex) {
    this.gridCoords.rI.push(rIndex);
    this.gridCoords.cI.push(cIndex);
    this.grid[rIndex][cIndex].elmnt.css('border-bottom', '1px solid blue');
    this.grid[rIndex][cIndex].canMove.dDown = false;
    this.grid[rIndex + 1][cIndex].canMove.dUp = false;
  }
  removeDots(rIndex, cIndex) {
    this.gridCoords.rI.push(rIndex);
    this.gridCoords.cI.push(cIndex);
    this.grid[rIndex][cIndex].elmnt.children().removeClass('dot');
  }
}
class MapBuilder {
  //Takes an array/object of coordinates and draws borders for walls, sets the gird properites to inhibit movement through walls
  constructor(rowCoords, colCoords, dotCoord, gameGrid) {
    this.rowCoords = rowCoords;
    this.colCoords = colCoords;
    this.dotCoords = dotCoord;
    this.grid = gameGrid;
    this.drawRows();
    this.drawColumns();
    this.removeDots();
    this.grid[10][0].elmnt.css('border-left', '');
    this.grid[10][20].elmnt.css('border-right', '');
  }
  drawRows() {
    //Draws vertical walls
    for(let i = 0; i < this.rowCoords.rI.length; i++){
      this.grid[this.rowCoords.rI[i]][this.rowCoords.cI[i]].elmnt.css('border-right', '1px solid blue');
      this.grid[this.rowCoords.rI[i]][this.rowCoords.cI[i]].canMove.dRight = false;
      this.grid[this.rowCoords.rI[i]][this.rowCoords.cI[i] + 1].canMove.dLeft = false;
    }
  }
  drawColumns() {
    //Draws horizontal walls
    for(let i = 0; i < this.colCoords.rI.length; i++){
      this.grid[this.colCoords.rI[i]][this.colCoords.cI[i]].elmnt.css('border-bottom', '1px solid blue');
      this.grid[this.colCoords.rI[i]][this.colCoords.cI[i]].canMove.dDown = false;
      this.grid[this.colCoords.rI[i] + 1][this.colCoords.cI[i]].canMove.dUp = false;
    }
  }
  removeDots() {
    //Removes dots inside the walls
    for(let i = 0; i < this.dotCoords.rI.length; i++){
      this.grid[this.dotCoords.rI[i]][this.dotCoords.cI[i]].hasDot = false;
      this.grid[this.dotCoords.rI[i]][this.dotCoords.cI[i]].elmnt.children().removeClass('dot');
    }
  }
}
//Coordinates for the mapbuilder object to draw from
var rowCoords = {
  rI: [1, 2, 1, 2, 1, 2, 1, 2, 0, 1, 2, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 4, 4, 4,
      5, 6, 7, 8, 4, 5, 7, 8, 6, 4, 6, 5, 8, 9, 8, 7, 6, 4, 5, 7, 8, 8, 5, 6, 6,
       4, 4, 5, 6, 7, 8, 4, 6, 7, 8, 9, 4, 11, 11, 10, 12, 11, 10, 11, 12, 11, 10,
       10, 11, 13, 14, 13, 14, 15, 15, 16, 17, 16, 17, 18, 19, 18, 13, 14, 14, 13,
       15, 16, 17, 15, 17, 16, 18, 19, 19, 19, 18,14, 15, 14, 15, 14, 15, 15, 14,
        15, 15, 16, 17, 16, 17, 17, 18, 19, 18, 19, 17, 14, 15, 14, 15, 17, 18,
        19, 18, 19, 17, 19, 20, 19, 20
      ],
  cI: [0, 0, 3, 3, 4, 4, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 15, 15, 16, 16, 19,
      19, 0, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 8, 6, 9, 9, 6, 3, 3, 3, 3, 14, 14, 14,
       14, 13, 10, 10, 11, 13, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 19, 2, 3,
       4, 4, 5, 15, 16, 15, 17, 9, 10, 14, 0, 0, 3, 1, 2, 3, 3, 3, 0, 2, 0, 0, 1,
       19, 19, 18, 16, 16, 16, 16, 17, 17, 19, 19, 19, 5, 14, 18, 4, 4, 6, 6, 7,
        7, 8, 12, 12, 11, 9, 9, 10, 10, 8, 8, 8, 6, 6, 4, 13, 13, 15, 15, 11, 11,
         11, 13, 13, 15, 9, 9, 10, 10
     ]
}
//Coordinates for the mapbuilder object to draw from
var colCoords = {
  rI: [0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0,
      2, 2, 2, 3, 3, 3, 4, 4, 4, 3, 5, 5, 5, 6, 6, 6, 3, 3, 3, 4, 4, 4, 6, 5, 5,
      5, 5, 9, 9, 9, 9, 8, 7, 7, 7, 7, 8, 8, 8, 8, 2, 3, 3, 3, 3, 4, 4, 4, 3, 3,
      3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9, 9, 7, 7, 7, 8, 8, 8, 3, 5, 5, 5, 6, 6, 6,
      8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10,
      10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12,
      12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 12, 13, 12,
      13, 12, 12, 13, 13, 12, 14, 12, 14, 15, 15, 14, 14, 15, 15, 16, 16, 17, 16,
       16, 17, 17, 19, 19, 19, 19, 19, 18, 18, 18, 18, 18, 18, 18, 18, 17, 19, 19,
     19, 19, 19, 13, 13, 15, 15, 13, 13, 15, 15, 13, 13, 13, 13, 13, 15, 14, 14,
     14, 15, 15, 17, 18, 19, 19, 16, 16, 16, 16, 17, 17, 16, 16, 16, 16, 19, 19,
     17, 17
   ],
  cI: [ 1, 2, 3, 1, 2, 3, 5, 6, 7, 8, 5, 6, 7, 8, 12, 13, 14, 15, 12, 13, 14, 15,
    17, 18, 19, 17, 18, 19, 1, 2, 3, 1, 2, 3, 5, 6, 7, 8, 6, 7, 8, 7, 8, 9, 7, 8,
    9, 10, 0, 1, 2, 3, 0, 1, 2, 3, 5, 7, 8, 9, 10, 7, 8, 9, 10, 10, 10, 11, 12, 13,
     11, 12, 13, 17, 18, 19, 17, 18, 19, 17, 18, 19, 20, 17, 18, 19, 20, 11, 12, 13,
     11, 12, 13, 15, 12, 13, 14, 12, 13, 14, 15, 5, 6, 7, 8, 9, 11, 12, 13, 14,
     15, 4, 0, 1, 2, 16, 18, 19, 20, 4, 6, 7, 8, 9, 11, 12, 13, 14, 6, 7, 8, 9,
     10, 11, 12, 13, 14, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 1, 2, 18,
     19, 20, 3, 3, 2, 2, 17, 18, 17, 18, 1, 1, 19, 19, 1, 2, 3, 17, 18, 19, 1, 2,
     3, 19, 18, 17, 1, 1, 2, 3, 4, 5, 3, 4, 5, 2, 15, 16, 17, 18, 19, 15, 16, 17,
      18, 19,5, 6, 5, 6, 14, 15, 14, 15, 8, 9, 10, 11, 12, 8, 9, 10, 11, 12, 10,
       10, 10, 7, 8, 8, 7, 6, 5, 5, 6, 12, 13, 14, 15, 12, 13, 14, 15
    ]
}
//Coordinates for the mapbuilder object to draw from
var dotCoords = {
  rI: [1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 0, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2,
    1, 1, 1, 2, 2, 2, 4, 4, 4, 4, 5, 6, 7, 8, 6, 6, 6, 4, 4, 4, 4, 4, 4, 4, 5, 6,
     6, 6, 6, 6, 7, 8, 5, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 9, 9, 9, 9, 8, 7, 7, 7, 8,
     8, 8, 8, 8, 8, 8, 8, 8, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 11,
     11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 12, 12, 12, 12,
      12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 13, 13, 13, 14, 14, 15, 15, 14, 14,
       15, 14, 14, 14, 14, 15, 15, 15, 14, 14, 13, 13, 13, 14, 16, 16, 17, 16, 15,
        17, 17, 17, 17, 18, 19, 19, 18, 19, 19, 19, 19, 19, 18, 19, 20, 17, 16, 17,
        17, 17, 17, 18, 18, 19, 19, 15, 16, 17, 16, 16, 18, 19, 19, 19, 19, 19, 11,
         11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10],
  cI: [1, 2, 3, 3, 2, 1, 5, 6, 7, 8, 8, 7, 6, 5, 10, 10, 10, 12, 13, 14, 15, 15,
    14, 13, 12, 17, 18, 19, 19, 18, 17, 17, 18, 19, 15, 15, 15, 15, 15, 14, 13,
    12, 13, 12, 11, 10, 9, 8, 7, 10, 10, 8, 7, 6, 5, 5, 5, 5, 5, 3, 2, 1, 0, 1,
    2, 3, 3, 3, 3, 2, 1, 0, 0, 0, 1, 2, 2, 1, 7, 8, 9, 10, 11, 12, 13, 17, 18, 19,
     20, 20, 19, 18, 17, 17, 18, 19, 20, 20, 19, 18, 17, 0, 1, 2, 4, 5, 5, 6, 7, 8,
      9, 11, 12, 13, 14, 15, 15, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 18, 19, 20,
       17, 18, 19, 19, 15, 15, 14, 14, 12, 12, 11, 10, 9, 8, 8, 6, 5, 5, 6, 3, 2, 1,
        1, 1, 2, 3, 3, 3, 5, 6, 7, 8, 8, 8, 7, 7, 5, 4, 3, 2, 1, 1, 10, 10, 10, 10,
         12, 13, 14, 15, 12, 13, 13, 12, 17, 17, 17, 18, 19, 19, 19, 18, 17, 16,
          15, 16, 6, 7, 8, 9, 10, 11, 12, 13, 14, 10, 0, 20]
}

//Let there be pacman
var game = new GameController();






//
