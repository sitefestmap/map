document.addEventListener("DOMContentLoaded", function() {

	const toggleBtns = document.querySelectorAll('.dark-mode-toggle-btn');
	const body = document.querySelectorAll('body');
	const header = document.querySelectorAll('.header');
	const logoGlow = document.querySelectorAll('.logo-glow');
	const darkModeImg = document.querySelectorAll('.darkmodeimg');
	const moon = document.querySelectorAll('.moon');
	const moonGlow = document.querySelectorAll('.moonglow');
	const moonSpots = document.querySelectorAll('.spots');
	const moonCover = document.querySelectorAll('.mooncover');
	const darkModeP = document.querySelectorAll('.darkmodep');
	const background = document.querySelectorAll('.background');
	const intro = document.querySelectorAll('.intro');
	const introHead = document.querySelectorAll('.introhead');
	const scrollSection1 = document.querySelectorAll('.scroll-section1');
	const scrollSection2 = document.querySelectorAll('.scroll-section2');
	const scrollSection3 = document.querySelectorAll('.scroll-section3');
	const scrollSection4 = document.querySelectorAll('.scroll-section4');
	const slides = document.querySelectorAll('.slide');
	const slide1 = document.querySelectorAll('.slide1-1');
	const intro1 = document.querySelector('.intro1');
	const intro2 = document.querySelector('.intro2');
	const prev = document.querySelectorAll('.prev');
	const next = document.querySelectorAll('.next');
	const linesRect = document.querySelectorAll('.lines-rect');
	const text2 = document.querySelectorAll('.text-2');
	const mySlides = document.querySelectorAll('.mySlides');
	const slideColor = document.querySelectorAll('.slide-color');
	const slideshow = document.querySelector('.slideshow-container');
	const slidesText4 = document.querySelectorAll('.slides-text4');
	const slidesText15 = document.querySelectorAll('.slides-text15');
	const slidesText17 = document.querySelectorAll('.slides-text17');
	const facebookIcon = document.querySelector('.facebook-icon');
	const instagramIcon = document.querySelector('.instagram-icon');
	const twitterIcon = document.querySelector('.twitter-icon');
	const siteFestBtn = document.querySelectorAll('.site-fest-btn');
	const slidesTextDark = document.querySelectorAll('.slides-text-dark');
	const slidesTextLight = document.querySelectorAll('.slides-text-light');
	const holdingpageIntro = document.querySelectorAll('.holdingpage-intro');
	const holdingpageIntroP = document.querySelectorAll('.holdingpage-introp');
	const wrappers = document.querySelectorAll('.slides-text8-overspill');
	const numbertext = document.querySelectorAll('.numbertext');
  const mapStatusLabels = document.querySelectorAll('.mapStatusLabel');
  const customCheckmarks = document.querySelectorAll('.custom-checkmark');
  const neutralLine = document.querySelectorAll('.neutral-line');

	let dotsContainer = document.querySelector('.slide-dots');
	let dots = dotsContainer.getElementsByClassName('dot');
	let slideIndex = 1;
	let touchstartX = 0;
	let touchendX = 0;
	let isDarkMode;
	let mousestartX, mouseendX;
	let activeIndex = 0;

  var checkboxes = document.getElementsByClassName("checkbox");


	toggleBtns.forEach(function(btn) {
	    btn.addEventListener('click', function() {
	        toggleDarkMode();
	    });
	});


  const darkModeCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('dark-mode='));
	if (darkModeCookie) {
		console.log(darkModeCookie);
	  isDarkMode = darkModeCookie.split('=')[1] === 'true';
	  const body = document.querySelector('body');
	  if (isDarkMode) {
	  document.documentElement.classList.add('disable-transition');
	  toggleDarkMode();
	  setTimeout(function() {
	    document.documentElement.classList.remove('disable-transition');
	  }, 250);
	}
	}

if (window.location.pathname === '/' || window.location.pathname === '') {
  window.location.replace('/index.html');
}	

if (document.querySelector('.map-site-btn')) {
	document.querySelector('.map-site-btn').addEventListener('click', saveAndChangePage);
	document.querySelector('.map-site-btn2').addEventListener('click', saveAndChangePage);
}
if (document.querySelector('.map-site-btn3')) {
	document.querySelector('.map-site-btn3').addEventListener('click', saveAndChangePage);	

}

toggleBtns.forEach(function(btn) {
  btn.addEventListener('mouseover', function(event) {
    if (event.type === 'mouseover') {
	  moonGlow.forEach(function(moonGlow) {
	  	moonGlow.classList.add('hover');
	  });
    } else if (event.type === 'mouseout') {
	  moonGlow.forEach(function(moonGlow) {
	  	moonGlow.classList.remove('hover');
	  });
    }
  });
});



function saveAndChangePage() {
  isDarkMode = document.documentElement.classList.contains('dark-mode');
  document.cookie = `dark-mode=${isDarkMode}; path=/`;
  
  if (document.querySelector('.map-site-btn3')) {
  	window.location.href = 'index.html';
  } else {
  	window.location.href = 'index2.html';
  }
}


	function toggleDarkMode() {
	  
	const darkModeElements = [
	  ...body,
	  ...header,
	  ...background,
	  ...logoGlow,
	  ...moonGlow,
	  ...toggleBtns,
	  ...intro,
	  ...scrollSection1,
	  ...scrollSection2,
	  ...scrollSection3,
	  ...scrollSection4,
	  ...introHead,
	  ...mySlides,
	  ...slide1,
	  ...prev,
	  ...next,
	  ...linesRect,
	  ...slideColor,
	  ...text2,
	  ...slidesTextDark,
	  ...slidesTextLight,
	  ...holdingpageIntro,
	  ...holdingpageIntroP,
	  ...numbertext,
	  ...slidesText4,
	  ...slidesText15,
	  ...slidesText17,
	];

  	  document.documentElement.classList.toggle('dark-mode');
	  isDarkMode = document.documentElement.classList.contains('dark-mode');
	  document.cookie = `dark-mode=${isDarkMode}; path=/`;
	  //darkModeImg.classList.toggle('dark-mode');
		if (intro1 && intro2) {
		  intro1.classList.toggle('dark-mode');
		  intro2.classList.toggle('dark-mode');
		  facebookIcon.classList.toggle('dark-mode');
		  instagramIcon.classList.toggle('dark-mode');
		  twitterIcon.classList.toggle('dark-mode');		  
		}

		activeIndex = slideIndex - 1;
		updateDots(activeIndex);

		darkModeElements.forEach(function(element) {
		  element.classList.toggle('dark-mode');
		});

		  if (isDarkMode) {
			  darkModeP.forEach(function(darkModeP) {
			  	darkModeP.textContent = 'Dark Mode:';
			  });
			  moon.forEach(function(moon) {
			  	moon.classList.remove('light-mode');
			  });
			  moonCover.forEach(function(moonCover) {
			  	moonCover.classList.remove('light-mode');
			  });
	  		moonSpots.forEach(function(spot) {
			  	spot.classList.remove('light-mode');
		    });
	  		neutralLine.forEach(function(neutralLine) {
			 		neutralLine.classList.add('dark-mode');
		    });
		  } else {
			  darkModeP.forEach(function(darkModeP) {
			  	darkModeP.textContent = 'Light Mode:';
			  });
			  moon.forEach(function(moon) {
			  	moon.classList.add('light-mode');
			  });
			  moonCover.forEach(function(moonCover) {
			  	moonCover.classList.add('light-mode');
			  });
	  		moonSpots.forEach(function(spot) {
			 		spot.classList.add('light-mode');
		    });
	  		neutralLine.forEach(function(neutralLine) {
			 		neutralLine.classList.remove('dark-mode');
		    });
		  }
	}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  if (n > slides.length) { slideIndex = 1; }    
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';  
  }
  slides[slideIndex - 1].style.display = 'grid';  
  dots[slideIndex - 1].className += ' active';
  dots[slideIndex - 1].style.backgroundColor = '#333d3d';

	const activeIndex = slideIndex - 1;
	const range = 5; // Number of dots to include in the scale effect range
	//console.log('slideIndex:', slideIndex);
	//console.log('activeIndex:', activeIndex);
	updateDots(activeIndex);
}

function updateDots(activeIndex) {
  const range = 5; // Number of dots to include in the scale effect range

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
    dots[i].style.transform = '';
    dots[i].style.boxShadow = '';

    if (Math.abs(i - activeIndex) <= range) {
      const scale = 2 - Math.abs(i - activeIndex) * 0.17;
      const boxShadowOpacity = 1 - Math.abs(i - activeIndex) * 0.2;
      const boxShadowColor = isDarkMode ? 'rgba(255, 36, 74' : 'rgba(250, 92, 79';

      dots[i].style.transform = `scale(${scale})`;
      dots[i].style.boxShadow = `inset 0 0 0 100px ${boxShadowColor}, ${boxShadowOpacity})`;
    }

    if (isDarkMode) {
      dots[i].style.backgroundColor = '#333d3d';
    } else {
      dots[i].style.backgroundColor = '#fff';
    }
  }

  dots[activeIndex].classList.add('active');
  dots[activeIndex].style.backgroundColor = isDarkMode ? '#333d3d' : '#fff';
}

//  wrappers.forEach(wrapper => {
//    const link = wrapper.querySelector('a.slides-text8');
//    const observer = new ResizeObserver(entries => {
//      const linkWidth = link.getBoundingClientRect().width;
//      const wrapperWidth = wrapper.getBoundingClientRect().width;
//      const overflowOffset = linkWidth - wrapperWidth;
//      wrapper.style.setProperty('--overflow-offset', `${overflowOffset}px`);
//      //console.log('Link width:', linkWidth);
//      //console.log('Wrapper width:', wrapperWidth);
//    });
//    observer.observe(link);
//  });

	function lazyLoad() {
	  const images = document.querySelectorAll('.mySlides img');
	  const options = {
	    root: null, // Use the viewport as the root
	    rootMargin: '0px',
	    threshold: 0.1 // Adjust the threshold as needed
	  };

	  const observer = new IntersectionObserver((entries, observer) => {
	    entries.forEach(entry => {
	      if (entry.isIntersecting) {
	        const img = entry.target;
	        const imageSrc = img.getAttribute('data-src');
	        //console.log('Image is intersecting:', img);
	        if (imageSrc) {
	          img.src = imageSrc;
	          img.removeAttribute('data-src');
	          observer.unobserve(img); // Stop observing once the image is loaded
	        }
	      }
	    });
	  }, options);

	  images.forEach(img => {
	    observer.observe(img); // Start observing each image
	  });
	}

	lazyLoad();

	window.addEventListener('scroll', lazyLoad);

	  document.querySelector(".prev").addEventListener("click", function() {
	    plusSlides(-1);
	  });

	  document.querySelector(".next").addEventListener("click", function() {
	    plusSlides(1);
	  });

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

dotsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('slide-dots')) {
    var clickX = event.clientX;
    var dotsArray = Array.from(dotsContainer.getElementsByClassName('dot'));
    var closestDot = dotsArray.reduce(function(prevDot, currentDot) {
      var prevRect = prevDot.getBoundingClientRect();
      var currentRect = currentDot.getBoundingClientRect();
      var prevDistance = Math.abs(prevRect.left - clickX);
      var currentDistance = Math.abs(currentRect.left - clickX);
      return prevDistance < currentDistance ? prevDot : currentDot;
    });
    var dotIndex = Array.prototype.indexOf.call(dots, closestDot);
    showSlides(slideIndex = dotIndex + 1);
  }
});

var swipeThreshold = 100; // Adjust this value as needed

slideshow.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
}, false);

slideshow.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
}, false);

slideshow.addEventListener('mousedown', function(event) {
    mousestartX = event.clientX;
}, false);

slideshow.addEventListener('mouseup', function(event) {
    mouseendX = event.clientX;
    handleGesture();
}, false);

function handleGesture() {
    if (touchendX && touchstartX && touchendX < touchstartX && Math.abs(touchendX - touchstartX) > swipeThreshold && event.changedTouches.length === 1) {
        plusSlides(1); // swipe left
    } else if (touchendX && touchstartX && touchendX > touchstartX && Math.abs(touchendX - touchstartX) > swipeThreshold && event.changedTouches.length === 1) {
        plusSlides(-1); // swipe right
    } else if (mouseendX && mousestartX && Math.abs(mouseendX - mousestartX) > swipeThreshold && mouseendX < mousestartX) {
        plusSlides(1); // mouse swipe left
    } else if (mouseendX && mousestartX && Math.abs(mouseendX - mousestartX) > swipeThreshold && mouseendX > mousestartX) {
        plusSlides(-1); // mouse swipe right
    }
}

if (window.location.pathname === '/index.html') {
//	document.addEventListener('wheel', function(e) {
	  // Check if the delta value is positive or negative to determine the scroll direction
//	  if (e.deltaY > 0) {
	    // Scroll down, go to next slide
//	    plusSlides(1);
//	  } else {
	    // Scroll up, go to previous slide
//	    plusSlides(-1);
//	  }
//	});
}

console.log("All cookies:", document.cookie);
// Add event listeners to each checkbox
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', createCheckboxClickListener(i));
}

// Set the initial checkbox state and update the text of the corresponding map status labels
for (var i = 0; i < checkboxes.length; i++) {
  var checkbox = checkboxes[i];

  // Get the checkbox value (e.g., nutshell, article, high-st)
  var checkboxValue = checkbox.value;

  // Get the checkbox name from the value attribute
  var checkboxName = checkboxValue;

  // Get the state of the checkbox from the cookie
  var checkboxState = getCheckboxState(checkboxValue);

  // Set the checkbox state based on the cookie value
  checkbox.checked = checkboxState;

  // Update the text of the corresponding map status label based on the initial state
  var mapStatusLabel = mapStatusLabels[i];
  if (mapStatusLabel) {
    mapStatusLabel.textContent = checkboxState ? 'Added ' + checkboxName + ' to Your Map' : 'Add ' + checkboxName + ' to Your Map';
  }

  var customCheckmark = customCheckmarks[i];
  if (customCheckmark) {
    if (checkboxState) {
      customCheckmark.classList.add('checked');
    } else {
      customCheckmark.classList.remove('checked');
    }
  }
}

// Function to create the event listener for each checkbox
function createCheckboxClickListener(index) {
  return function() {
    // Get the checkbox value (e.g., nutshell, article, high-st)
    var checkboxValue = this.value;

    // Set the checkbox state as a cookie with true/false value and expiration date
    var expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Set expiration to 1 year from now
    document.cookie = checkboxValue + "=" + this.checked + "; expires=" + expirationDate.toUTCString();

    // Get the state of the created cookie
    var cookieState = getCheckboxState(checkboxValue);

    // Output the name and state of the created cookie to the console
    console.log("Created cookie: " + checkboxValue + " (State: " + cookieState + ")");

    // Output all cookies and their states to the console
    console.log("All cookies:", document.cookie);

    // Get the state of the checkbox
    var checkboxState = this.checked;

    // Update the corresponding map status label
    var mapStatusLabel = mapStatusLabels[index];
    if (mapStatusLabel) {
      mapStatusLabel.textContent = checkboxState ? 'Added ' + checkboxValue + ' to Your Map' : 'Add ' + checkboxValue + ' to Your Map';
    }

    // Update the custom-checkbox element based on the checkbox state
    var customCheckmark = customCheckmarks[index];
    if (customCheckmark) {
      if (checkboxState) {
        customCheckmark.classList.add('checked');
      } else {
        customCheckmark.classList.remove('checked');
      }
    }

    // Update the text of the corresponding map status labels based on the checkbox state
    var mapStatusText = checkboxState ? 'Added' : 'Add';
    var matchingCheckboxes = document.querySelectorAll('input[type="checkbox"][value="' + checkboxValue + '"]');
    for (var i = 0; i < matchingCheckboxes.length; i++) {
      var matchingCheckboxIndex = Array.from(checkboxes).indexOf(matchingCheckboxes[i]);
      if (matchingCheckboxIndex !== -1) {
        var matchingMapStatusLabel = mapStatusLabels[matchingCheckboxIndex]; // Select the corresponding map status label
        if (matchingMapStatusLabel) {
          matchingMapStatusLabel.textContent = mapStatusText + ' ' + checkboxValue + ' to Your Map';
        }
      }
		    var matchingCustomCheckmark = customCheckmarks[matchingCheckboxIndex]; // Select the corresponding custom-checkmark element
		    if (matchingCustomCheckmark) {
		      if (checkboxState) {
		        matchingCustomCheckmark.classList.add('checked');
		      } else {
		        matchingCustomCheckmark.classList.remove('checked');
		      }
		    }
    }
  };
}

// Function to retrieve the state of a specific checkbox
function getCheckboxState(checkboxValue) {
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(checkboxValue) === 0) {
      var state = cookie.substring(checkboxValue.length + 1);
      return state === "true";
    }
  }

  return false;
}




























});