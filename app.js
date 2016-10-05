console.log('Script Loaded.');
 class PlayerSprite {
    constructor() {
     this.element = $('.movSprite');
     this.speed = 20;
     this.changeSpeed = 20;
     this.origOffset = this.element.offset();
     this.element.css('background-image', 'url(assets/pacStart.png');//Initial background image for sprite
     this.assetLibrary = {
        leftI: ['url(assets/pacStart.png)', 'url(assets/pacLeft2.png)', 'url(assets/pacLeft3.png)'],
        rightI: ['url(assets/pacStart.png)', 'url(assets/pacRight2.png)', 'url(assets/pacRight3.png)'],
        upI: ['url(assets/pacStart.png)', 'url(assets/pacUp2.png)', 'url(assets/pacUp3.png)'],
        downI: ['url(assets/pacStart.png)', 'url(assets/pacDown2.png)', 'url(assets/pacDown3.png)']
     }
     this.runArrowListener();
     this.runMove();
     this.imgCounter = 0;
     this.axisM = 'x';
     this.position = {
        xP: this.origOffset.left,
        yP: this.origOffset.top
     }
   }
   runMove() {
      var that = this;
      var moveInterval = setInterval(function(){
         let tempPosition = that.element.offset();
         switch(that.axisM){
            case 'x':
               that.element.offset({top: tempPosition.top, left: tempPosition.left += that.changeSpeed});
            break;

            case 'y':
               that.element.offset({top: tempPosition.top += that.changeSpeed, left: tempPosition.left });
            break;
         }
         that.animateMe(that);
      }, 100);
   }
   runArrowListener(){
      let that = this;
      $('body').on('keydown', function(e){
         switch(e.keyCode){
            case 38://UP
               that.changeSpeed = that.speed * - 1;
               that.axisM = 'y';
               break;
            case 40://DOWN
               that.changeSpeed = that.speed;
               that.axisM = 'y';
               break;
            case 37://LEFT
               that.changeSpeed = that.speed * - 1;
               that.axisM = 'x';
               break;
            case 39://RIGHT
               that.changeSpeed = that.speed;
               that.axisM = 'x';
               break;
         }
         that.animateMe(that);
      })
   }
   animateMe(objTarget){
      switch(objTarget.axisM){
         case 'x':
            if(objTarget.changeSpeed < 0) {
               objTarget.element.css('background-image', objTarget.assetLibrary.leftI[objTarget.imgCounter]);
            } else {
               objTarget.element.css('background-image', objTarget.assetLibrary.rightI[objTarget.imgCounter]);
            }
         break;

         case 'y':
            if(objTarget.changeSpeed < 0) {
              objTarget.element.css('background-image', objTarget.assetLibrary.upI[objTarget.imgCounter]);
            } else {
              objTarget.element.css('background-image', objTarget.assetLibrary.downI[objTarget.imgCounter]);
            }
         break;
      }
      if(objTarget.imgCounter < objTarget.assetLibrary.leftI.length - 1){
         objTarget.imgCounter++;
      } else {
         objTarget.imgCounter = 0;
      }
   }
 }
 var newPlayer = new PlayerSprite();





















 //
