console.log('Script Loaded.');
 class PlayerSprite {
    constructor() {
     this.element = $('.movSprite');
     this.speed = 20;
     this.origOffset = this.element.offset();
     this.runArrowListener();
     this.position = {
        xP: this.origOffset.left,
        yP: this.origOffset.top
     }
   }
   updatePosition(axis, speed) {
      switch(axis){
         case 'x':
            this.position.xP += speed;
         break;

         case 'y':
            this.position.yP += speed;
         break;
      }
      this.element.offset({top: this.position.yP, left: this.position.xP});
   }

   move(direction){
      switch(direction){
         case 38://UP
            this.updatePosition('y', (this.speed * - 1));
            break;
         case 40://DOWN
            this.updatePosition('y', this.speed);
            break;
         case 37://LEFT
            this.updatePosition('x', (this.speed * - 1));
            break;
         case 39://RIGHT
            this.updatePosition('x', this.speed );
            break;
      }
   }
   runArrowListener(){
      let that = this;
      $('body').on('keydown', function(e){
         that.move(e.keyCode);
      })
   }
 }
 var newPlayer = new PlayerSprite();





















 //
