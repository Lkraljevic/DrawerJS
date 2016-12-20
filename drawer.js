var Drawer = function(options) {

    var self,
      mask,
      handle,
      newPos = 0,
      currentPos = 0,
      startPoint = 0;


    var Drawer = function() {
      self = this;
      defaults = {
        width: 280,
        zIndex: 99999,
        disableSlide: false,
        handleSize: 20,
        disableMask: false,
        maxMaskOpacity: 0.5
      };
      this.isVisible = false;
      this.initialize();
    }

    Drawer.prototype.initElements = function() {
      options.target.classList.add('drawer');
      options.target.style.zIndex = options.zIndex;
      options.target.style.width = options.width + 'px';
      options.target.style.left = -options.width + 'px';

      handle = document.createElement('div');
      handle.className = 'drawer-handle';
      handle.style.width = options.handleSize + 'px';
      handle.style.right = -options.handleSize + 'px';

      options.target.appendChild(handle);

      mask = document.createElement('div');
      mask.className = 'drawer-mask';
      if (options.parent)
        options.parent.appendChild(mask);
      else if (options.target.parentElement)
        options.target.parentElement.appendChild(mask);

    };

    Drawer.prototype.initEvents = function() {


      var touchmove = function(e) {
        /*
        newPos = Math.min(Math.max(newPos, 0), options.width);
        newPos += parseInt(e.changedTouches[0].clientX) - startPoint;
        startPoint = e.changedTouches[0].clientX
        */
        console.log('startPoint', startPoint);
        console.log('newPos', e.changedTouches[0].clientX);

        newPos = parseInt(e.changedTouches[0].clientX)- (startPoint-currentPos);
        e.preventDefault();
          //console.log(newPos);
        self.changeMenuPos();
      }

      options.target.addEventListener('touchstart', (e) => {
        startPoint = parseInt(e.changedTouches[0].clientX)
        options.target.classList.remove('opened');
        options.target.classList.remove('closed');
        //options.target.addEventListener('touchmove', touchmove);
        options.target.addEventListener('touchmove', touchmove);
        e.preventDefault();
      });
      options.target.addEventListener('touchend', (e) => {
        //options.target.removeEventListener('touchmove', touchmove);
        options.target.removeEventListener('touchmove', touchmove);
        e.preventDefault();
        self.checkMenuState()
      });

      mask.onclick = () => {
        console.log(1)
      }
    };

    Drawer.prototype.setDefaultsOptions = function() {
      for (var key in defaults) {
        if (!options[key]) {
          options[key] = defaults[key];
        }
      }
    };

    Drawer.prototype.changeMenuPos = function() {
      if (newPos <= options.width) {
        console.log(newPos);
        options.target.style.transform = 'translate3d(' + newPos + 'px, 0, 0)';
        options.target.style.WebkitTransform = 'translate3d(' + newPos + 'px, 0, 0)';
        options.target.style.MozTransform = 'translate3d(' + newPos + 'px, 0, 0)';

        this.setMaskOpacity(newPos);
      }
    };

    Drawer.prototype.setMaskOpacity = function(newMenuPos) {
      var opacity = parseFloat((newMenuPos / options.width) * options.maxMaskOpacity);

      mask.style.opacity = opacity;

      if (opacity === 0) {
        mask.style.zIndex = -1;
      } else {
        mask.style.zIndex = options.zIndex - 1;
      }
    };

    Drawer.prototype.initialize = function() {
      self.setDefaultsOptions();
      self.initElements();
      self.initEvents();
    };



    Drawer.prototype.checkMenuState = function (deltaX) {
      if (newPos >= 100) {
          self.open();
      } else {
          self.close();
      }
    };
    Drawer.prototype.open = function () {
        //options.target.className = menuClassName + " tmla-menu opened";
        options.target.classList.add('opened');
        options.target.classList.remove('closed');
        options.target.style.transform = 'translate3d(' + options.width + 'px, 0, 0)';
        options.target.style.WebkitTransform = 'translate3d(' + options.width + 'px, 0, 0)';
        options.target.style.MozTransform = 'translate3d(' + options.width + 'px, 0, 0)';

        currentPos = options.width;
        this.isVisible = true;

        self.showMask();
        //self.invoke(options.onOpen);
    };

    Drawer.prototype.close = function () {
        options.target.classList.remove('opened');
        options.target.classList.add('closed');

        options.target.style.transform = 'translate3d(0, 0, 0)';
        options.target.style.WebkitTransform = 'translate3d(0, 0, 0)';
        options.target.style.MozTransform = 'translate3d(0, 0, 0)';

        currentPos = 0;
        self.isVisible = false;

        self.hideMask();
        //self.invoke(options.onClose);
    };

    Drawer.prototype.toggle = function () {
        if (self.isVisible) {
            self.close();
        } else {
            self.open();
        }
    };

    Drawer.prototype.showMask = function () {
        //mask.className = "tmla-mask transition";
        mask.style.opacity = options.maxMaskOpacity;
        mask.style.zIndex = options.zIndex - 1;
    };

    Drawer.prototype.hideMask = function () {
        //mask.className = "tmla-mask transition";
        mask.style.opacity = 0;
        mask.style.zIndex = -1;
    };


    return new Drawer();

}
