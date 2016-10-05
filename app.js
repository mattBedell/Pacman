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
            divCounter++;
         }
      }
   }
 }
class MakeBounds {
   constructor() {
      this.outerBounds  = {
         top: '',
         right: '',
         bottom: '',
         left: ''
      }
   }
   getBounds(){
      var nextRow = 0;
      var nextCol = 0;
      for(var i = 0; i < gBoard.grid.row[0].length; i++) {
         if(nextCol < gBoard.grid.row.length) {
            gBoard.grid.row[0][nextCol].canMove.gUp = false;
            gBoard.grid.row[0][nextCol].myEl.css('background-color', 'red');
            nextCol++;
         }
      }
   }
}
var bounds = new MakeBounds();
var gBoard = new MakeBoard(20, 20);
