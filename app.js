'use strict';
const musicContainer = document.querySelector('.music__container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const listBtn = document.querySelector('#list');
const skipForwardBtn = document.querySelector('#repeat');
const skipBackwardBtn = document.querySelector('#undo');
const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress');
const title = document.querySelector('#title');
const albumName = document.querySelector('.album__name');
const cover = document.querySelector('#cover');
const loaderCover = document.querySelector('#loader-cover');
const duration = document.querySelector('.duration');
const playTime = document.querySelector('.play__time');
const durationTime = document.querySelector('.duration__time');
const selectSongRow = document.querySelectorAll('.row');
const selectSongContainer = document.querySelector('.select__music');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close__btn');
const musicIcon = document.querySelectorAll('#icon');
const loader = document.querySelector('.loader');

// Sort songs, albums & covers alphabetically
const sorting = function (songs, album, covers) {
	songs.sort();
	album.sort();
	covers.sort();
};

const songs = [
	'Rema - Calm Down',
	'Asake - Terminator',
	'Zinoleesky - Call of Duty',
	'Kizz Daniel - Cough',
	'Mavins - Won Da Mo',
];
const album = ['Rema', 'Asake', 'Zinoleesky', 'Kizz Daniel', 'Mavins'];
const covers = [
	'rema-calm-down-cover',
	'asake-terminator-cover',
	'zino-cod-cover',
	'kizz-cough-cover',
	'mavins-won-da-mo-cover',
];

sorting(songs, album, covers);

let songIndex = 0;

// Update Song details

const loadSong = function (song, album, covers, okay) {
	title.textContent = song;
	albumName.textContent = album;
	audio.src = `${song}.mp3`;
	cover.src = `${covers}.png`;
};
const test = function () {
	loaderCover.style.display = 'none';
	loader.style.display = 'none';
};
loadSong(songs[songIndex], album[songIndex], covers[songIndex]);

const playSong = function () {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fa').classList.remove('fa-play');
	playBtn.querySelector('i.fa').classList.add('fa-pause');
	audio.play();
};
const pauseSong = function () {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fa').classList.remove('fa-pause');
	playBtn.querySelector('i.fa').classList.add('fa-play');
	audio.pause();
};
// Event Listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});
window.addEventListener('load', () => {
	durationTime.textContent = `00:00`;
});
audio.addEventListener('load', () => {
	console.log('loaded');
});

// Change Song events

prevBtn.addEventListener('click', () => {
	songIndex--;
	if (songIndex < 0) songIndex = songs.length - 1;
	console.log(songIndex);
	loadSong(songs[songIndex], album[songIndex], covers[songIndex]);
	// Play Song
	playSong();
});
const nextSongFunc = function () {
	songIndex++;
	if (songIndex > songs.length - 1) songIndex = 0;
	loadSong(songs[songIndex], album[songIndex], covers[songIndex]);
	// Reset the progress bar
	progress.style.width = `0%`;
	// Play Song
	playSong();
};
nextBtn.addEventListener('click', nextSongFunc);

// Skip by 10 seconds functionality

skipForwardBtn.addEventListener('click', () => {
	audio.currentTime += 10;
});
skipBackwardBtn.addEventListener('click', () => {
	audio.currentTime -= 10;
});

audio.addEventListener('timeupdate', e => {
	let { duration, currentTime } = e.target;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration % 60);
	const playTimeMinute = Math.floor(currentTime / 60);
	const playTimeSecond = Math.floor(currentTime % 60);
	durationTime.textContent = `${minutes.toString().padStart(2, 0)}:${seconds
		.toString()
		.padStart(2, 0)}`;
	playTime.textContent = `${playTimeMinute.toString().padStart(2, 0)}:${playTimeSecond
		.toString()
		.padStart(2, 0)}`;
	// Play the next song when current song is finished
	if (currentTime === duration) {
		console.log('song has ended');
		nextSongFunc();
	}
});

audio.addEventListener('load', () => {
	console.log('audio loaded');
});
progressContainer.addEventListener('click', e => {
	const width = e.target.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
});
(function () {
	selectSongRow.forEach(row => {
		row.addEventListener('click', e => {
			const selectedSong = e.target.dataset.row;
			const selectedText = e.target;
			if (selectedSong === undefined) return;
			songIndex = selectedSong;
			console.log(songIndex);
			console.log(selectedSong);
			// Reset progress bar
			progress.style.width = `0%`;
			loadSong(songs[songIndex], album[songIndex], covers[songIndex]);
			// Play Song
			playSong();
			toggHidden();
			selectedText.querySelector('i.fa').classList.remove('fa-music');
			musicIcon.forEach(el => {
				el.classList.remove('fa-music');
				console.log(el);
			});
			if (e.target.dataset.row === selectedSong) {
				selectedText.querySelector('i.fa').classList.add('fa-music');
				console.log('okay');
			}
		});
	});
})();
// Play next song when current song ends
(function () {})();
// Toggle Hidden Class
const toggHidden = function () {
	selectSongContainer.classList.toggle('hidden');
	overlay.classList.toggle('hidden');
};
listBtn.addEventListener('click', () => {
	toggHidden();
});
closeBtn.addEventListener('click', () => {
	toggHidden();
});

// TODAY SCHEDULE
// CHANGE SONGS & COVER ART IN MUSIC PLAYER PROJECT *
// SORT SONGS ALPHABETICALLY *
// ADD PLAY NEXT SONG AFTER CURRENT SONG ENDS FUNCTIONALITY*
// CREATE FORWARD BY 10 SECONDS FUNCTIONALITY*
// CREATE REPEAT FUNCTIONALITY
