const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');

document.addEventListener('scroll', () => {
  const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

  // Adjust the animation based on your desired effect
  const opacity1 = Math.min(1, (scrollPercentage - 30) / 10);
  const opacity2 = Math.min(1, (scrollPercentage - 60) / 10);

  image1.style.opacity = opacity1;
  image2.style.opacity = opacity2;
});

document.addEventListener("scroll", function(){
	var image = document.getElementById('picture');
	var curPos = window.scrollY;

	if (curPos > 1000){
		image.src = "real.jpg";
	}
	else if (curPos < 1000){
		image.src = "two";
	}
}












