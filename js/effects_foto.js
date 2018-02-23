function heart_it (){
  "use-strict";
  document.getElementById("hearticon").style.backgroundImage = "url('https://cdn4.iconfinder.com/data/icons/e-commerce-icon-set/48/Like_2-48.png')";
}

function dontheart_it (){
  "use-strict";
  document.getElementById("hearticon").style.backgroundImage = "url('https://cdn4.iconfinder.com/data/icons/e-commerce-icon-set/48/Like-48.png')";
}
function follow (){
  "use-strict";
  document.getElementById("usericon").style.backgroundImage = "url('https://cdn4.iconfinder.com/data/icons/e-commerce-icon-set/48/Username_2-32.png')";
}

function dontfollow (){
  "use-strict";
  document.getElementById("usericon").style.backgroundImage = "url('https://cdn4.iconfinder.com/data/icons/e-commerce-icon-set/48/Username-48.png')";
}
var navigation = {
    // Variables
    $nav: document.querySelector('.nav'),
    $navTrigger: document.querySelector('.nav__trigger'),
    $navContent: document.querySelector('.nav__content'),
    $navList: document.querySelector('.nav__list'),
    transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',

    init: function init() {
        var self = this;

        // Handle the transitions
        self.$navTrigger.addEventListener('click', function () {
            if (!self.$navTrigger.classList.contains('is-active')) {
                // .nav--trigger active
                self.$navTrigger.classList.add('is-active');

                // .nav active
                if (!self.$nav.classList.contains('is-active')) {
                    self.$nav.classList.add('is-active');
                    self.$nav.addEventListener('transitionend', function (e) {
                        if (e.propertyName == 'width' && self.$navTrigger.classList.contains('is-active')) {
                            // .nav__content active
                            self.$navContent.classList.add('is-active');
                        }
                    });
                } else {
                    self.$navContent.classList.add('is-active');
                }

                // no-csstransitions fallback
                if (document.documentElement.classList.contains('no-csstransitions')) {
                    self.$navContent.classList.add('is-active');
                }
            } else {
                // .nav--trigger inactive
                self.$navTrigger.classList.remove('is-active');

                // .nav__content inactive
                if (self.$navContent.classList.contains('is-active')) {
                    self.$navContent.classList.remove('is-active');
                    self.$navContent.addEventListener('transitionend', function (e) {
                        if (e.propertyName == 'opacity' && !self.$navTrigger.classList.contains('is-active')) {
                            // .nav inactive
                            self.$nav.classList.remove('is-active');
                        }
                    });
                } else {
                    self.$nav.classList.remove('is-active');
                }

                // no-csstransitions fallback
                if (document.documentElement.classList.contains('no-csstransitions')) {
                    self.$nav.classList.remove('is-active');
                }
            }
        });
    }
};

navigation.init();