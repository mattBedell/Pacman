console.log("Script Loaded");
class GridProperties {
   constructor(element){
      this.canMove = {
         gLeft: true,
         gRight: true,
         gUp: true,
         gDown: true,
      }
      this.element = element;
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
            var newDiv = '<div class="gameBlock' + rowClass + colClass + '"></div>';
            rowToAppend.append(newDiv);
            this.grid.row[i][j] = new GridProperties($(newDiv));
         }
      }
   }
 }
 var gBoard = new MakeBoard(25, 25);












 //
