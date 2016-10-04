console.log('Script Loaded.');
 class PlayerSprite {
    constructor() {
     this.element = $('.movSprite');
     this.speed = 20;
     this.origOffset = this.element.offset();
     this.element.css('background-image', 'url(assets/pacStart.png');//Initial background image for sprite
     this.assetLibrary = {
        leftI: ['url(assets/pacStart.png)', 'url(assets/pacLeft2.png)', 'url(assets/pacLeft3.png)'],
        rightI: ['url(assets/pacStart.png)', 'url(assets/pacRight2.png)', 'url(assets/pacRight3.png)'],
        upI: ['url(assets/pacStart.png)', 'url(assets/pacUp2.png)', 'url(assets/pacUp3.png)'],
        downI: ['url(assets/pacStart.png)', 'url(assets/pacDown2.png)', 'url(assets/pacDown3.png)']
     }
     this.runArrowListener();
     this.imgCounter = 0;
     this.direction = 39;
     this.position = {
        xP: this.origOffset.left,
        yP: this.origOffset.top
     }

   }
   runArrowListener(){
      let that = this;
      $('body').on('keydown', function(e){
         that.direction = e.keyCode;
         console.log(that.direction);
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
