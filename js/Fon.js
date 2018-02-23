// Смена фона =)
		
var imgBg=Array('../fon/91.jpg','../fon/92.jpg','../fon/93.jpg','../fon/94.jpg','../fon/95.png','../fon/90.jpg','../fon/96.png','../fon/97.png','../fon/98.jpg','../fon/99.jpg','../fon/100.jpg','../fon/101.jpg','../fon/102.png'); //список файлов с фонами
 showImg = function() {
	 
  var index=Math.floor(Math.random()*imgBg.length); //номер случайного фона
  document.getElementsByTagName('body')[0].style.backgroundImage='url('+imgBg[index]+')';
  setTimeout(showImg,10000); //повтор через секунду
  
 }
 window.onload=showImg; //назначить обработчик события