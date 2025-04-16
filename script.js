let countEl = document.getElementById("count-el");
let saveEl = document.getElementById("save-el");
let incrementBtn = document.getElementById("increment-btn");
let saveBtn = document.getElementById("save-btn");
let resetBtn = document.getElementById("reset-btn");
let count = 0;
let hasIncremented = false;

// Sound effects
const sounds = {
  increment: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'),
  save: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3'),
  reset: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-casino-notification-266.mp3'),
  error: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-remove-2578.mp3')
};

// Set volume for all sounds
Object.values(sounds).forEach(sound => {
  sound.volume = 0.3; // Reduced volume for better UX
});

function playSound(soundName) {
  try {
    sounds[soundName].currentTime = 0; // Rewind sound if already playing
    sounds[soundName].play();
  } catch (e) {
    console.log("Sound error:", e);
  }
}

function increment() {
  if (!hasIncremented) {
    count += 1;
    countEl.textContent = count;
    hasIncremented = true;
    incrementBtn.disabled = true;
    incrementBtn.style.opacity = "0.6";
    incrementBtn.style.cursor = "not-allowed";
    
    playSound('increment');
    alert("Passenger added! Current count: " + count);
  } else {
    playSound('error');
    alert("You've already added a passenger. Please SAVE or RESET first.");
  }
}

function save() {
  if (count > 0) {
    let countStr = count + " - ";
    saveEl.textContent += countStr;
    
    playSound('save');
    alert("Count saved! Total passengers recorded: " + count + "\nCounter has been reset.");
    
    resetCount();
  } else {
    playSound('error');
    alert("Count is zero. Please add passengers before saving.");
  }
}

function resetCount() {
  if (count > 0) {
    if (confirm("Are you sure you want to reset the counter?\nCurrent count (" + count + ") will be lost.")) {
      playSound('reset');
      count = 0;
      countEl.textContent = count;
      hasIncremented = false;
      incrementBtn.disabled = false;
      incrementBtn.style.opacity = "1";
      incrementBtn.style.cursor = "pointer";
      alert("Counter has been reset to 0.");
    }
  } else {
    playSound('error');
    alert("Counter is already at 0. Nothing to reset.");
  }
}

// Add mute button to toggle sounds
const muteBtn = document.createElement('button');
muteBtn.innerHTML = '🔊';
muteBtn.style.position = 'fixed';
muteBtn.style.top = '10px';
muteBtn.style.right = '10px';
muteBtn.style.background = 'rgba(255,255,255,0.7)';
muteBtn.style.border = 'none';
muteBtn.style.borderRadius = '50%';
muteBtn.style.width = '40px';
muteBtn.style.height = '40px';
muteBtn.style.fontSize = '20px';
muteBtn.style.cursor = 'pointer';
document.body.appendChild(muteBtn);

let isMuted = false;
muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  Object.values(sounds).forEach(sound => {
    sound.muted = isMuted;
  });
  muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
});