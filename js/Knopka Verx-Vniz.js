var pageYLabel = 0;
var updownElem = document.getElementById('updown');

updownElem.onclick = function() {
  var pageY = window.pageYOffset || document.documentElement.scrollTop;

  switch (this.className) {
    case 'up':
      pageYLabel = pageY;
      window.scrollTo(0, 0);
      this.className = 'down';
      updownElem.innerHTML="<i class='fa fa-chevron-down'></i>";
      break;

    case 'down':
      window.scrollTo(0, pageYLabel);
      this.className = 'up';
      updownElem.innerHTML="<i class='fa fa-chevron-up'></i>";
  }

}

window.onscroll = function() {
  var pageY = window.pageYOffset || document.documentElement.scrollTop;
  var innerHeight = document.documentElement.clientHeight;

  switch (updownElem.className) {
    case '':
      if (pageY > innerHeight) {
        updownElem.className = 'up';
        updownElem.innerHTML="<i class='fa fa-chevron-up'></i>";

      }
      break;

    case 'up':
      if (pageY < innerHeight) {
        updownElem.className = '';
      }
      break;

    case 'down':
      if (pageY > innerHeight) {
        updownElem.className = 'up';
      }
      break;
  }
}