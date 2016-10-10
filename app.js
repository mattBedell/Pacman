class GridProperties {
  constructor(gridRow, gridColumn, totalId) {
    this.canMove = {
      dUp: true,
      dDown: true,
      dLeft: true,
      dRight: true
    }
    this.elmnt;
    this.row = gridRow;
    this.col = gridColumn;
    this.gridId = totalId;
    this.hasDot = true;
    this.addElmnts();
  }
  addElmnts() {
    let appendToThisRowElmntClass = '.r' + this.row;
    let defaultGridClass = 'gridBlock';
    let gridIdNumClass = 'gb' + this.gridId;
    let newElmntClasses = defaultGridClass + ' ' + gridIdNumClass;
    let gridElmntToAppend = '<div class="' + newElmntClasses + '"></div>';
    $(appendToThisRowElmntClass).append(gridElmntToAppend);

    let setJqueryElmntPointerClass = '.' + gridIdNumClass;
    this.elmnt = $(setJqueryElmntPointerClass);
    this.addDot();
  }
  addDot() {
    this.hadDot = true;
    let dotClasses = 'dot ' + 'dotID' + this.gridId;
    let dotElmnt = '<div class="' + dotClasses + '"></div>';
    $(this.elmnt).append(dotElmnt);
  }
}
class GameBoard {
  constructor(numRows, numColumns, borderStyle) {
    this.grid = [];
    let idCounter = 0;
    for(let i = 0; i < numRows; i++) {
      let rowDefaultClass = 'row';
      let rowIdClass = 'r' + i;
      let newRowClasses = rowDefaultClass + ' ' + rowIdClass;
      let rowElmntToAppend = '<div class="' + newRowClasses + '"></div>';
      $('.gameBoard').append(rowElmntToAppend);
      this.grid[i] = [];

      for(let j = 0; j < numColumns; j++) {
        this.grid[i][j] = new GridProperties(i, j, idCounter);
        idCounter++;
      }
    }
    this.drawBorders(borderStyle);
  }
  drawBorders(borderProp) {
    for(let i = 0; i < this.grid[0].length; i++) {
      this.grid[0][i].elmnt.css('border-top', borderProp);//Top Border
      this.grid[0][i].canMove.dUp = false;

      this.grid[this.grid.length - 1][i].elmnt.css('border-bottom', borderProp);//Bottom Border
      this.grid[this.grid.length - 1][i].canMove.dDown = false;
    }
    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i][0].elmnt.css('border-left', borderProp);//Left Border
      this.grid[i][0].canMove.dLeft = false;

      this.grid[i][this.grid[0].length - 1].elmnt.css('border-right', borderProp);//Right Border
      this.grid[i][this.grid[0].length - 1].canMove.dRight = false;
    }
  }
  updateGrid(mySprite, direction) {
    this.grid[mySprite.row][mySprite.column].elmnt.css('background-image', mySprite.assets.current);
    switch(direction) {
      case 'right':
        this.grid[mySprite.row ][mySprite.column - 1].elmnt.css('background-image', '');
        break;
      case 'left':
        this.grid[mySprite.row][mySprite.column + 1].elmnt.css('background-image', '');
        break;
      case 'up':
        this.grid[mySprite.row + 1][mySprite.column ].elmnt.css('background-image', '');
        break;
      case 'down':
        this.grid[mySprite.row - 1][mySprite.column ].elmnt.css('background-image', '');
        break;
    }
  }
  updateTeleport(mySprite, direction){
    switch(direction){
      case 'left':
      this.grid[10][0].elmnt.css('background-image', '');
      break;

      case 'right':
        this.grid[10][20].elmnt.css('background-image', '');
        break;
    }
  }
}
class Sprite {
  constructor(spriteType, startingRow, startingColumn, gBoard) {
    this.spriteType = spriteType;
    this.aiDirection = 'right';
    this.row = startingRow;
    this.column = startingColumn;
    this.readGrid = gBoard;
    this.assets = {
      counter: 0,
      current: undefined,
      list: undefined,
    }
    switch(this.spriteType) {
      case 'pacman':
        this.assets.list = {
          aRight: ['url(assets/pacStart.png)', 'url(assets/pacRight2.png)', 'url(assets/pacRight3.png)'],
          aLeft: ['url(assets/pacStart.png)', 'url(assets/pacLeft2.png)', 'url(assets/pacLeft3.png)'],
          aUp: ['url(assets/pacStart.png)', 'url(assets/pacUp2.png)', 'url(assets/pacUp3.png)'],
          aDown: ['url(assets/pacStart.png)', 'url(assets/pacDown2.png)', 'url(assets/pacDown3.png)']
        }
        break;
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
     switch(this.aiDirection) {
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
}


class GameController {
  constructor() {
    this.playerInput = 'right';
    this.board = new GameBoard(21, 21, '1px solid blue');
    this.player = new Sprite('pacman', 15, 9, this.board.grid);
    this.blueGhost = new Sprite('ghostBlue', 11, 6, this.board.grid);
    this.pinkGhost = new Sprite('ghostPink', 11, 14, this.board.grid);
    this.redGhost = new Sprite('ghostRed', 11, 10, this.board.grid);
    this.orangeGhost = new Sprite('ghostOrange', 11, 10, this.board.grid)
    this.score = 0;
    this.lives = 3;
    this.playerIntervalId;
    this.aiIntervalId;
    this.dotTotal = 0;
    this.buildMap = new MapBuilder(rowCoords, colCoords, dotCoords, this.board.grid);
    this.runGame();
    this.getInput();
    this.countTotalDots();
  }
  runGame() {
    let that = this;
    this.playerIntervalId = setInterval(function() {
      that.playerTeleport();
      that.player.checkMove(that.playerInput);
      that.board.updateGrid(that.player, that.playerInput);

      that.takeDotGiveScore(that.player.row, that.player.column);
      that.checkDeath();

    }, 150)
    this.aiIntervalId = setInterval(function() {
      that.blueGhost.ghostMove();
      that.board.updateGrid(that.blueGhost, that.blueGhost.aiDirection);

      that.pinkGhost.ghostMove();
      that.board.updateGrid(that.pinkGhost, that.pinkGhost.aiDirection);

      that.redGhost.ghostMove();
      that.board.updateGrid(that.redGhost, that.redGhost.aiDirection);

      that.orangeGhost.ghostMove();
      that.board.updateGrid(that.orangeGhost, that.orangeGhost.aiDirection);
    }, 300)
  }
  checkDeath(){
    if(this.player.row === this.redGhost.row && this.player.column === this.redGhost.column) {
      this.lives -= 1;
      this.removeLifeIcon();
    }
    if (this.player.row === this.blueGhost.row && this.player.column === this.blueGhost.column) {
      this.lives -= 1;
      this.removeLifeIcon();
    }
    if (this.player.row === this.pinkGhost.row && this.player.column === this.pinkGhost.column) {
      this.lives -= 1;
      this.removeLifeIcon();
    }
    if (this.player.row === this.orangeGhost.row && this.player.column === this.orangeGhost.column) {
      this.lives -= 1;
      this.removeLifeIcon();
    }
  }
  removeLifeIcon() {
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
  playerTeleport(){
    if(this.player.row === 10 && this.player.column === 0 && this.playerInput === 'left') {
      this.player.row = 10;
      this.player.column = 20;
      this.board.updateTeleport(this.player, this.playerInput);
    }
    if(this.player.row === 10 && this.player.column === 20 && this.playerInput === 'right') {
      this.player.row = 10;
      this.player.column = 0;
      this.board.updateTeleport(this.player, this.playerInput);
    }
  }
  getInput() {
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
    if(this.board.grid[row][column].hasDot === true) {
      this.score++;
      this.board.grid[row][column].hasDot = false;
      this.board.grid[row][column].elmnt.children().removeClass('dot');
      $('.scoreNum').text('Score: ' + this.score * 100);
    }
  }
  countTotalDots(){
    for(let i = 0; i < this.board.grid.length; i++) {
      for(let j = 0; j < this.board.grid[i].length; j++){
        if(this.board.grid[i][j].hasDot == true) {
          this.dotTotal++;
        }
      }
    }
  }
}
class MapCreator {
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
    for(let i = 0; i < this.rowCoords.rI.length; i++){
      this.grid[this.rowCoords.rI[i]][this.rowCoords.cI[i]].elmnt.css('border-right', '1px solid blue');
      this.grid[this.rowCoords.rI[i]][this.rowCoords.cI[i]].canMove.dRight = false;
      this.grid[this.rowCoords.rI[i]][this.rowCoords.cI[i] + 1].canMove.dLeft = false;
    }
  }
  drawColumns() {
    for(let i = 0; i < this.colCoords.rI.length; i++){
      this.grid[this.colCoords.rI[i]][this.colCoords.cI[i]].elmnt.css('border-bottom', '1px solid blue');
      this.grid[this.colCoords.rI[i]][this.colCoords.cI[i]].canMove.dDown = false;
      this.grid[this.colCoords.rI[i] + 1][this.colCoords.cI[i]].canMove.dUp = false;
    }
  }
  removeDots() {
    for(let i = 0; i < this.dotCoords.rI.length; i++){
      this.grid[this.dotCoords.rI[i]][this.dotCoords.cI[i]].hasDot = false;
      this.grid[this.dotCoords.rI[i]][this.dotCoords.cI[i]].elmnt.children().removeClass('dot');
    }
  }
}
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
var game = new GameController();






//
