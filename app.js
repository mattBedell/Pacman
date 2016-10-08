 console.log("Script Loaded");
// class GridProperties {
//    constructor(myDivElement, i, j){
//       this.canMove = {
//          gLeft: true,
//          gRight: true,
//          gUp: true,
//          gDown: true,
//       }
//       this.myEl = myDivElement;
//       this.myRow = i;
//       this.myCol = j ;
//       this.hasDot = true;
//    }
//    eatDot(){
//       this.hasDot = false;
//       $(this.myEl).children().removeClass('dot');
//    }
//    giveDot(){
//       this.hasDot = true;
//       $(this.myEl).children().addClass('dot');
//    }
// }
class GridProperties {
  constructor(gridRow, gridColumn, totalId){
    this.canMove = {
      up: true,
      down: true,
      left: true,
      right: true
    }
    this.elmnt;
    this.row = gridRow;
    this.col = gridColumn;
    this.gridId = totalId;
    this.hasDot = true;
    this.addElmnts();
  }
  addElmnts(){
    let appendToThisRowElmntClass = '.r' + this.row;
    let defaultGridClass = 'gridBlock';
    let gridIdNumClass = 'gb' + this.gridId;
    let newElmntClasses = defaultGridClass + ' ' + gridIdNumClass;
    let gridElmntToAppend = '<div class="' + newElmntClasses + '"></div>';
    $(appendToThisRowElmntClass).append(gridElmntToAppend);

    let setJqueryElmntPointerClass = '.' + gridIdNumClass;
    this.elmnt = $(setJqueryElmntPointerClass);
    this.addDot;
  }
  addDot() {
    this.hadDot = true;
    let dotClasses = 'dot ' + 'dotID' + this.gridId;
    let dotElmnt = '<div class="' + dotClasses + '"></div>';
    $(this.elmnt).append(dotElmnt);
  }
  removeDot() {
    this.hasDot = false;
    $(this.elmnt).children().removeClass('dot');
  }
}







// class BoardSetup {
//    constructor(borderType) {
//       this.borderType = borderType;
//       this.outerBounds();
//    }
//    outerBounds(){
//       var nextRow = 0;
//       var nextCol = 0;
//       for(let i = 0; i < gBoard.grid.row.length; i++) {
//          if(nextCol < gBoard.grid.row[0].length) {
//             //Top Border
//             gBoard.grid.row[0][nextCol].canMove.gUp = false;
//             this.giveBoundsBorder(gBoard.grid.row[0][nextCol], this.borderType)
//
//             //Bottom Border
//             gBoard.grid.row[gBoard.grid.row[0].length-1][nextCol].canMove.gDown = false;
//             this.giveBoundsBorder(gBoard.grid.row[gBoard.grid.row[0].length-1][nextCol], this.borderType)
//             nextCol++;
//
//             //Left Border
//             gBoard.grid.row[nextRow][0].canMove.gLeft = false;
//             this.giveBoundsBorder(gBoard.grid.row[nextRow][0], this.borderType);
//
//             //Right Border
//             gBoard.grid.row[nextRow][gBoard.grid.row[0].length-1].canMove.gRight = false;
//             this.giveBoundsBorder(gBoard.grid.row[nextRow][gBoard.grid.row[0].length-1], this.borderType);
//          }
//          nextRow++;
//       }
//    }
//    giveBoundsBorder(coord, borderType){
//       if(!coord.canMove.gLeft){
//          coord.myEl.css('border-left', borderType);
//       }
//       if(!coord.canMove.gRight){
//          coord.myEl.css('border-right', borderType);
//       }
//       if(!coord.canMove.gUp){
//          coord.myEl.css('border-top', borderType);
//       }
//       if(!coord.canMove.gDown){
//          coord.myEl.css('border-bottom', borderType);
//       }
//    }
//    drawWalls(start, end, index, direction){
//       switch(direction){
//          case 'row':
//             for(let i = start; i < end; i++){
//                gBoard.grid.row[i][index].canMove.gRight = false;
//                gBoard.grid.row[i][index + 1].canMove.gLeft = false;
//                this.giveBoundsBorder(gBoard.grid.row[i][index], this.borderType);
//             }
//          break;
//          case 'col':
//             for(let i = start; i < end; i++){
//                gBoard.grid.row[index + 1][i].canMove.gUp = false;
//                gBoard.grid.row[index][i].canMove.gDown = false;
//                this.giveBoundsBorder(gBoard.grid.row[index][i], this.borderType);
//             }
//          }
//    }
// }
// class MakeBoard {
//    constructor(numberOfRows, numberOfColumns){
//      this.gW = numberOfColumns;
//      this.gH = numberOfRows;
//      this.grid = {
//         row: []
//      }
//      this.makeGrid();
//    }
//    makeGrid(){
//       var divCounter = 0;
//       for(var i = 0; i < this.gH; i++){
//          var giveRowClass = 'row rowNum' + i;
//          var newRow = '<div class="' + giveRowClass + '"></div>';
//          $('body').append(newRow);
//          var myRow = '.rowNum' + i;
//          var rowToAppend = $(myRow);
//          var colN = [];
//          this.grid.row[i] = colN;
//
//          for(var j = 0; j < this.gW; j++){
//             var rowClass = ' br' + i;
//             var colClass = ' bc' + j;
//             var numClass = 'nm' + divCounter;
//             var newDiv = '<div class="gameBlock' + rowClass + colClass + ' ' + numClass + '"></div>';
//             rowToAppend.append(newDiv);
//             var $soemthing = $('.' + numClass);
//             $soemthing.append('<div class="dot"></div>');
//             this.grid.row[i][j] = new GridProperties( $soemthing, i, j  );
//             // this.grid.row[i][j].myEl = $soemthing;
//             // this.grid.row[i][j].myRow = i;
//             // this.grid.row[i][j].myCol = j;
//             divCounter++;
//          }
//       }
//    }
//  }
// class SprChar {
//    constructor(sType, startPosition){
//       this.sprite = startPosition;
//       this.myDir = 'pRight';
//       this.rowPos = startPosition.myRow;
//       this.colPos = startPosition.myCol;
//       this.animateCounter = {
//          animList: [],
//          aCounter: 0,
//          count: function(myTarget){
//             if(this.aCounter < myTarget.animateCounter.animList.rightI.length - 1){
//                this.aCounter++;
//                switch(myTarget.myDir){
//                   case 'pRight':
//                      return this.animList.rightI[this.aCounter]
//                      break;
//                   case 'pLeft':
//                      return this.animList.leftI[this.aCounter]
//                      break;
//                   case 'pUp':
//                      return this.animList.upI[this.aCounter]
//                      break;
//                   case 'pDown':
//                      return this.animList.downI[this.aCounter]
//                      break;
//                }
//                console.log('this ran');
//                this.aCounter++;
//             }else{
//                this.aCounter = 0;
//                return this.animList.downI[this.aCounter]
//             }
//          }
//       }
//       this.assetList  = {
//          pacList: {
//             rightI: ['url(assets/pacStart.png)', 'url(assets/pacRight2.png)', 'url(assets/pacRight3.png)'],
//             leftI: ['url(assets/pacStart.png)', 'url(assets/pacLeft2.png)', 'url(assets/pacLeft3.png)'],
//             upI: ['url(assets/pacStart.png)', 'url(assets/pacUp2.png)', 'url(assets/pacUp3.png)'],
//             downI: ['url(assets/pacStart.png)', 'url(assets/pacDown2.png)', 'url(assets/pacDown3.png)']
//          }
//       }
//       this.ghostList = {//ADD GHOST IMAGES HERE
//          rightI: [],
//          leftI: [],
//          upI: [],
//          downI: []
//       }
//       this.spriteType(sType);
//     }
//     spriteType(sType){
//       switch(sType){
//          case 'pacman':
//             this.animateCounter.animList = this.assetList.pacList;
//
//          case 'ghost':
//             this.assetList = this.assetList.ghostList;
//       }
//    }
// }
// class RedrawBoard {
//    constructor(pm){
//       this.pacMan = pm
//       //this.ghost1 = new SprChar('ghost' , gBoard.grid.row[5][20]);
//       this.runArrowListener(pm);
//    }
//    runArrowListener(pCharacterSprite){
//       $('body').on('keydown', function(e){
//          switch(e.keyCode){
//             case 38://UP
//                if(pCharacterSprite.sprite.canMove.gUp){
//                   pCharacterSprite.myDir = 'pUp';
//                }
//                break;
//             case 40://DOWN
//                if(pCharacterSprite.sprite.canMove.gDown){
//                   pCharacterSprite.myDir = 'pDown';
//                }
//                break;
//             case 37://LEFT
//                if(pCharacterSprite.sprite.canMove.gLeft){
//                   pCharacterSprite.myDir = 'pLeft';
//                }
//                break;
//             case 39://RIGHT
//                if(pCharacterSprite.sprite.canMove.gRight){
//                   pCharacterSprite.myDir = 'pRight';
//                }
//                break;
//          }
//       })
//    }
//    updateGrid(sTarg){
//       sTarg.colPos = sTarg.sprite.myCol;
//       sTarg.rowPos = sTarg.sprite.myRow;
//       switch(sTarg.myDir){
//          case 'pRight':
//             sTarg.sprite.myEl.css('background-image', sTarg.animateCounter.count(sTarg));
//             gBoard.grid.row[sTarg.rowPos][sTarg.colPos - 1].myEl.css('background-color', 'black');
//             gBoard.grid.row[sTarg.rowPos][sTarg.colPos - 1].myEl.css('background-image', '');
//             break;
//          case 'pLeft':
//             sTarg.sprite.myEl.css('background-image', sTarg.animateCounter.count(sTarg));
//             gBoard.grid.row[sTarg.rowPos][sTarg.colPos + 1].myEl.css('background-color', 'black');
//             gBoard.grid.row[sTarg.rowPos][sTarg.colPos + 1].myEl.css('background-image', '');
//             break;
//          case 'pDown':
//             sTarg.sprite.myEl.css('background-image', sTarg.animateCounter.count(sTarg));
//             gBoard.grid.row[sTarg.rowPos - 1][sTarg.colPos].myEl.css('background-color', 'black');
//             gBoard.grid.row[sTarg.rowPos - 1][sTarg.colPos].myEl.css('background-image', '');
//             break;
//          case 'pUp':
//             sTarg.sprite.myEl.css('background-image', sTarg.animateCounter.count(sTarg));
//             gBoard.grid.row[sTarg.rowPos + 1][sTarg.colPos].myEl.css('background-color', 'black');
//             gBoard.grid.row[sTarg.rowPos + 1][sTarg.colPos].myEl.css('background-image', '');
//             break;
//       }
//    }
//    checkMove(spriteTarget){
//        //Check RIGHT
//        if(spriteTarget.myDir === 'pRight' && gBoard.grid.row[spriteTarget.rowPos][spriteTarget.colPos].canMove.gRight === true){
//           spriteTarget.sprite = gBoard.grid.row[spriteTarget.rowPos][spriteTarget.colPos + 1];
//           spriteTarget.sprite.eatDot();
//           this.updateGrid(spriteTarget);
//        }
//        //Check LEFT
//        if(spriteTarget.myDir === 'pLeft' && gBoard.grid.row[spriteTarget.rowPos][spriteTarget.colPos].canMove.gLeft === true){
//           spriteTarget.sprite = gBoard.grid.row[spriteTarget.rowPos][spriteTarget.colPos - 1];
//           spriteTarget.sprite.eatDot();
//           this.updateGrid(spriteTarget);
//        }
//        //Check DOWN
//        if(spriteTarget.myDir === 'pDown' && gBoard.grid.row[spriteTarget.rowPos][spriteTarget.colPos].canMove.gDown === true){
//           spriteTarget.sprite = gBoard.grid.row[spriteTarget.rowPos + 1][spriteTarget.colPos];
//           spriteTarget.sprite.eatDot();
//           this.updateGrid(spriteTarget);
//        }
//
//        //Check UP
//        if(spriteTarget.myDir === 'pUp' && gBoard.grid.row[spriteTarget.sprite.myRow][spriteTarget.sprite.myCol].canMove.gUp === true){
//           spriteTarget.sprite = gBoard.grid.row[spriteTarget.sprite.myRow - 1][spriteTarget.sprite.myCol];
//           spriteTarget.sprite.eatDot();
//           this.updateGrid(spriteTarget);
//        }
//     }
// }
// class Governer{
//    constructor(){
//       this.playerScore;
//       this.playerLives;
//       this.playerPosition;
//    }
// }
//
//
//
// var gBoard = new MakeBoard(21, 21);
// var boundMaker = new BoardSetup('1px solid blue');
// var pacMan = new SprChar('pacman', gBoard.grid.row[0][0]);
// var bRedraw = new RedrawBoard(pacMan);
// setInterval(function(){
//    bRedraw.checkMove(bRedraw.pacMan);
// }, 100);
// //
