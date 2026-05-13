const slider = document.getElementById('speedRange');
const display = document.getElementById('val');

// Update UI and Video when slider moves
slider.oninput = function() {
  const speed = this.value;
  display.innerText = speed + 'x';
  applySpeed(speed);
};

// Function for buttons
window.setSpeed = function(speed) {
  slider.value = speed;
  display.innerText = speed + 'x';
  applySpeed(speed);
};

function applySpeed(speed) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: (s) => {
        const video = document.querySelector('video');
        if (video) video.playbackRate = parseFloat(s);
      },
      args: [speed]
    });
  });
}
