// Log a welcome message to the console
console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0; // Index of the currently playing song
let audioElement = new Audio("songs/1.mp3"); // Audio element for playing songs
let masterPlay = document.getElementById("masterPlay"); // Main play/pause button
let myProgressBar = document.getElementById("myProgressBar"); // Progress bar
let gif = document.getElementById("gif"); // GIF element for visualization
let masterSongName = document.getElementById("masterSongName"); // Display current song name
let songItems = Array.from(document.getElementsByClassName("songItem")); // Array of song items

// Define an array of songs with their details

let songs = [
    {
      songName: "Warriyo - Mortals [NCS Release]",
      filePath: "songs/1.mp3",
      coverPath: "covers/1.jpg",
    },
    {
      songName: "Cielo - Huma-Huma",
      filePath: "songs/2.mp3",
      coverPath: "covers/2.jpg",
    },
    {
      songName: "DEAF KEV - Invincible [NCS Release]-320k",
      filePath: "songs/3.mp3",
      coverPath: "covers/3.jpg",
    },
    {
      songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
      filePath: "songs/4.mp3",
      coverPath: "covers/4.jpg",
    },
    {
      songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
      filePath: "songs/5.mp3",
      coverPath: "covers/5.jpg",
    },
    {
      songName: "Salam-e-Ishq",
      filePath: "songs/6.mp3",
      coverPath: "covers/6.jpg",
    },
    {
      songName: "Sakhiyaan",
      filePath: "songs/7.mp3",
      coverPath: "covers/7.jpg",
    },
    {
      songName: "Bhula Dena - Salam-e-Ishq",
      filePath: "songs/8.mp3",
      coverPath: "covers/8.jpg",
    },
    {
      songName: "Mere Sapno Ki Rani",
      filePath: "songs/9.mp3",
      coverPath: "covers/9.jpg",
    },
    {
      songName: "True Love",
      filePath: "songs/10.mp3",
      coverPath: "covers/10.jpg",
    },
  ];
// Set cover images and song names for each song item
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to play music
const playMusic = () => {
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};

// Function to pause music
const pauseMusic = () => {
  audioElement.pause();
  masterPlay.classList.remove("fa-pause-circle");
  masterPlay.classList.add("fa-play-circle");
  gif.style.opacity = 0;
};

// Handle play/pause click for the main play/pause button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playMusic(); // Play music if paused or at the beginning
  } else {
    pauseMusic(); // Pause music if playing
  }
});

// Listen to time update events to update the progress bar
audioElement.addEventListener("timeupdate", () => {
  // Calculate progress and update the progress bar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Handle change in the progress bar to adjust the audio playback position
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Function to reset play icons for all song items
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// Add event listeners to play/pause buttons for each song item
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      // If the clicked song is already playing, pause it
      if (!audioElement.paused && parseInt(e.target.id) === songIndex) {
        pauseMusic();
      } else {
        // Otherwise, play the clicked song
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
      }
    });
  }
);

// Event listener for the next button
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

// Event listener for the previous button
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
