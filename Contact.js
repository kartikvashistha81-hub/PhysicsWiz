// Character follows cursor with 3D tilt
const boy = document.getElementById("heroBoy");
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let currentX = 0, currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateChar() {
  const dx = (window.innerWidth / 3 - mouseX) / 30;
  const dy = (window.innerHeight / 2 - mouseY) / 30;
  currentX += (dx - currentX) * 0.06;
  currentY += (dy - currentY) * 0.06;
  if (boy) {
    boy.style.transform = `translate(${currentX}px, ${currentY * 0.5}px) rotateY(${currentX * 0.6}deg)`;
  }
  requestAnimationFrame(animateChar);
}
animateChar();

// Form submit
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
  }, 1200);
}