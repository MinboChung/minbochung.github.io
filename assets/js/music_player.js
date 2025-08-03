// Query selector function takes the value when cursor inputs.
const musicContainer = document.querySelector(".music-container");

const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");

const title = document.querySelector("#music_title");
const album = document.querySelector("#album");

// Song titles
const songs = [
    // 'Press next song',
    'comfy_relationship', 'connotation_of_love', 'overtaken', 'Kerning_city_swamp'
]

// keep track of songs
let songIndex = 0

// Initially load song info DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `./assets/music/songs/${song}.mp3`
    album.src = `./assets/music/albums/${song}.jpeg`
}

function playSong() { // Dynamically removes the class of i tag when clicks
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])  
    playSong() 
}


// Event listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play') /* We wanna see if the class play exist*/

    if(isPlaying) {
        pauseSong()
    } else {
        // If not appeared
        playSong()
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Progress bar
function updateProgress(eventObj) {
    // console.log(eventObj.srcElement.currentTime) // returns the time played in dynamic
    const {duration, currentTime} = eventObj.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
function setProgress(eventObj) {
    const width = this.clientWidth
    const clickX = eventObj.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width) * duration
}
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)