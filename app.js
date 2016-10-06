console.log("Script Loaded");
class GridProperties {
   constructor(myDivElement){
      this.canMove = {
         gLeft: true,
         gRight: true,
         gUp: true,
         gDown: true,
      }
      this.myEl;
      this.myRow;
      this.myCol;
   }
}
class MakeBounds {
   constructor(borderType) {
      this.borderType = borderType;
      this.outerBounds();
   }
   outerBounds(){
      var nextRow = 0;
      var nextCol = 0;
      for(var i = 0; i < gBoard.grid.row.length; i++) {
         if(nextCol < gBoard.grid.row[0].length) {
            //Top Border
            gBoard.grid.row[0][nextCol].canMove.gUp = false;
            this.giveBoundsBorder(gBoard.grid.row[0][nextCol], this.borderType)

            //Bottom Border
            gBoard.grid.row[gBoard.grid.row[0].length-1][nextCol].canMove.gDown = false;
            this.giveBoundsBorder(gBoard.grid.row[gBoard.grid.row[0].length-1][nextCol], this.borderType)
            nextCol++;

            //Left Border
            gBoard.grid.row[nextRow][0].canMove.gLeft = false;
            this.giveBoundsBorder(gBoard.grid.row[nextRow][0], this.borderType);

            //Right Border
            gBoard.grid.row[nextRow][gBoard.grid.row[0].length-1].canMove.gRight = false;
            this.giveBoundsBorder(gBoard.grid.row[nextRow][gBoard.grid.row[0].length-1], this.borderType);
         }
         nextRow++;
      }
   }
   giveBoundsBorder(coord, borderType){
      if(!coord.canMove.gLeft){
         coord.myEl.css('border-left', borderType);
      }
      if(!coord.canMove.gRight){
         coord.myEl.css('border-right', borderType);
      }
      if(!coord.canMove.gUp){
         coord.myEl.css('border-top', borderType);
      }
      if(!coord.canMove.gDown){
         coord.myEl.css('border-bottom', borderType);
      }
   }
}
class MakeBoard {
   constructor(numberOfRows, numberOfColumns){
     this.gW = numberOfColumns;
     this.gH = numberOfRows;
     this.grid = {
        row: []
     }
     this.makeGrid();
   }
   makeGrid(){
      var divCounter = 0;
      for(var i = 0; i < this.gH; i++){
         var giveRowClass = 'row rowNum' + i;
         var newRow = '<div class="' + giveRowClass + '"></div>';
         $('body').append(newRow);
         var myRow = '.rowNum' + i;
         var rowToAppend = $(myRow);
         var colN = [];
         this.grid.row[i] = colN;

         for(var j = 0; j < this.gW; j++){
            var rowClass = ' br' + i;
            var colClass = ' bc' + j;
            var numClass = 'nm' + divCounter;
            var newDiv = '<div class="gameBlock' + rowClass + colClass + ' ' + numClass + '"></div>';
            rowToAppend.append(newDiv);
            this.grid.row[i][j] = new GridProperties();
            this.grid.row[i][j].myEl = $('.' + numClass);
            this.grid.row[i][j].myRow = i;
            this.grid.row[i][j].myCol = j;
            divCounter++;
         }
      }
   }
 }
class SprChar {
   constructor(){
      this.sprite = gBoard.grid.row[0][0];
      this.myDir = 'pRight';
    }
}
class RedrawBoard {
   constructor(){
      //this.playerDir = 'pRight';
      //this.startPosition = gBoard.grid.row[0][0];
      //this.currPos = this.startPosition;
      this.pacMan = new SprChar();
      this.runArrowListener(this.pacMan);
   }
   runArrowListener(pCharacterSprite){
      $('body').on('keydown', function(e){
         switch(e.keyCode){
            case 38://UP
               if(pCharacterSprite.sprite.canMove.gUp){
                  pCharacterSprite.myDir = 'pUp';
               }
               break;
            case 40://DOWN
               if(pCharacterSprite.sprite.canMove.gDown){
                  pCharacterSprite.myDir = 'pDown';
               }
               break;
            case 37://LEFT
               if(pCharacterSprite.sprite.canMove.gLeft){
                  pCharacterSprite.myDir = 'pLeft';
               }
               break;
            case 39://RIGHT
               if(pCharacterSprite.sprite.canMove.gRight){
                  pCharacterSprite.myDir = 'pRight';
               }
               break;
         }
      })
   }
   updateGrid(sTarg){
      var oldColor = sTarg.sprite.myEl.css('background-color');

      switch(sTarg.myDir){
         case 'pRight':
            sTarg.sprite.myEl.css('background-color', 'yellow');
            gBoard.grid.row[sTarg.sprite.myRow][sTarg.sprite.myCol - 1].myEl.css('background-color', oldColor);
            break;
         case 'pLeft':
            sTarg.sprite.myEl.css('background-color', 'yellow');
            gBoard.grid.row[sTarg.sprite.myRow][sTarg.sprite.myCol + 1].myEl.css('background-color', oldColor);
            break;
         case 'pDown':
            sTarg.sprite.myEl.css('background-color', 'yellow');
            gBoard.grid.row[sTarg.sprite.myRow - 1][sTarg.sprite.myCol].myEl.css('background-color', oldColor);
            break;
         case 'pUp':
            sTarg.sprite.myEl.css('background-color', 'yellow');
            gBoard.grid.row[sTarg.sprite.myRow + 1][sTarg.sprite.myCol].myEl.css('background-color', oldColor);
            break;
      }
   }
    checkMove(spriteTarget){
       //Check RIGHT
       if(spriteTarget.myDir === 'pRight' && gBoard.grid.row[spriteTarget.sprite.myRow][spriteTarget.sprite.myCol].canMove.gRight === true){
          spriteTarget.sprite = gBoard.grid.row[spriteTarget.sprite.myRow][spriteTarget.sprite.myCol + 1];
          this.updateGrid(spriteTarget);
       }
       //Check LEFT
       if(spriteTarget.myDir === 'pLeft' && gBoard.grid.row[spriteTarget.sprite.myRow][spriteTarget.sprite.myCol].canMove.gLeft === true){
          spriteTarget.sprite = gBoard.grid.row[spriteTarget.sprite.myRow][spriteTarget.sprite.myCol - 1];
          this.updateGrid(spriteTarget);
       }
       //Check DOWN
       if(spriteTarget.myDir === 'pDown' && gBoard.grid.row[spriteTarget.sprite.myRow][spriteTarget.sprite.myCol].canMove.gDown === true){
          spriteTarget.sprite = gBoard.grid.row[spriteTarget.sprite.myRow + 1][spriteTarget.sprite.myCol];
          this.updateGrid(spriteTarget);
       }

       //Check UP
       if(spriteTarget.myDir === 'pUp' && gBoard.grid.row[spriteTarget.sprite.myRow][spriteTarget.sprite.myCol].canMove.gUp === true){
          spriteTarget.sprite = gBoard.grid.row[spriteTarget.sprite.myRow - 1][spriteTarget.sprite.myCol];
          this.updateGrid(spriteTarget);
       }
    }
}




var gBoard = new MakeBoard(20, 20);
var boundMaker = new MakeBounds('1px solid blue');
var bRedraw = new RedrawBoard();

setInterval(function(){
   bRedraw.checkMove(bRedraw.pacMan);
}, 100);










//
