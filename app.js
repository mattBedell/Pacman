console.log("Script Loaded");
 class MakeBoard {
   constructor(){
     this.gW = 20;
     this.gH = 20;
     //this.myGrid = [rows[], columns[]]
   }
   makeGrid(){
      for(var i = 0; i < this.gH; i++){
         var giveRowClass = 'row rowNum' + i;
         var newRow = '<div class="' + giveRowClass + '"></div>';
         $('body').append(newRow);
         var myRow = '.rowNum' + i;
         var rowToAppend = $(myRow);

         for(var i = 0; i < this.gW; i++){
            var rowClass = ' br' + i;
            var colClass = ' bc' + i;
            var newDiv = '<div class="gameBlock' + rowClass + colClass + '"></div>';
            rowToAppend.append(newDiv);
     }
   }
 }
 var myGrid = new MakeBoard();
 myGrid.makeGrid();

















 //
