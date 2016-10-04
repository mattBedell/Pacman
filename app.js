console.log('Script Loaded.');
 class PlayerSprite {
    constructor() {
     this.element = $('.movSprite');
     this.speed = 20;
     this.origOffset = this.element.offset();
     this.element.css({'background-image': 'url(assets/pacStart.png)', 'background-size': '100% 100%'});//Initial background image for sprite
     this.assetLibrary = {
        leftI: ['url(assets/pacStart.png)', 'url(assets/pacLeft2.png)', 'url(assets/pacLeft3.png)'],
        rightI: ['url(assets/pacStart.png)', 'url(assets/pacRight2.png)', 'url(assets/pacRight3.png)'],
        upI: ['url(assets/pacStart.png)', 'url(assets/pacUp2.png)', 'url(assets/pacUp3.png)'],
        downI: ['url(assets/pacStart.png)', 'url(assets/pacDown2.png)', 'url(assets/pacDown3.png)']
     }
     this.runArrowListener();
     this.imgCounter = 0;
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
            this.animateMe('up');
            break;
         case 40://DOWN
            this.updatePosition('y', this.speed);
            this.animateMe('down');
            break;
         case 37://LEFT
            this.updatePosition('x', (this.speed * - 1));
            this.animateMe('left');
            break;
         case 39://RIGHT
            this.updatePosition('x', this.speed );
            this.animateMe('right');
            break;
      }
   }
   runArrowListener(){
      let that = this;
      $('body').on('keydown', function(e){
         that.move(e.keyCode);
      })
   }
   animateMe(direction){
      if(this.imgCounter < this.assetLibrary.leftI.length){
         this.imgCounter++;
      } else {
         this.imgCounter = 0;
      }
      this.element.css('background-image', this.assetLibrary.upI[0]);
      switch(direction){
         case 'up':
          this.element.css('background-image', this.assetLibrary.upI[this.imgCounter]);
          break;

         case 'down':
          this.element.css('background-image', this.assetLibrary.downI[this.imgCounter]);
          break;

         case 'left':
          this.element.css('background-image', this.assetLibrary.leftI[this.imgCounter]);
          break;

         case 'right':
          this.element.css('background-image', this.assetLibrary.rightI[this.imgCounter]);
          break;
      }
   }
 }
 var newPlayer = new PlayerSprite();





















 //
