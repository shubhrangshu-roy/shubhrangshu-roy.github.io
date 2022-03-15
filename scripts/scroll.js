//Get the button:
mybutton = document.getElementById("myBtn");
myFooter = document.getElementById("foot");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction(); scrollFooter()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function scrollFooter() {
    
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    myFooter.style.display = "block";
  } else {
    myFooter.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}