// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
  
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
  
let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

  
// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Demo1",
    artist: "Broke For Free",
    image: "Image URL",
    path: "sample1.mp3"
  },
  {
    name: "Demo2",
    artist: "Tours",
    image: "Image URL",
    path: "Enthusiast.mp3"
  },
  {
    name: "Demo3",
    artist: "Chad Crouch",
    image: "Image URL",
    path: "Shipping_Lanes.mp3",
  },
];

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement( 'audio' );

  function loadTrack(track_index) {
    resetValues();

    //load the new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
  }
    
  function random_bg_color() {
    
  }
    
  // Function to reset all values to their default
  function resetValues() {
    curr_time.innerText = '00:00';
    total_duration.innerText = '00:00';
    seek_slider.value = 0;
  }

  function playpauseTrack() {
    
  }
    
  function playTrack() {
    curr_track.play();
    track_art.style.backroundImage = `url("${track_list[track_index].image}")`;
  }
    
  function pauseTrack() {
    
  }
    
  function nextTrack() {
    
  }
    
  function prevTrack() {
    
  }

  function seekTo() {
  
  }
    
  function setVolume() {
    
  }
    
  function seekUpdate() {
    
  }

  loadTrack( track_index );