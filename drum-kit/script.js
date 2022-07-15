const keys = document.querySelectorAll('.key');
const keyList = [];

const audios = document.querySelectorAll('audio');

keys.forEach(key => {
    keyList.push(key.dataset.key);
});

window.addEventListener('keydown', event => {
    if (keyList.includes(event.key)) {
        keys[keyList.indexOf(event.key)].classList.add('playing');
        audios[keyList.indexOf(event.key)].currentTime = 0;
        audios[keyList.indexOf(event.key)].play();
    }
});

window.addEventListener('keyup', event => {
    keys[keyList.indexOf(event.key)].classList.remove('playing')
});