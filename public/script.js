const audio = document.getElementById('audio');
const rewindButton = document.getElementById('rewind');
const fastForwardButton = document.getElementById('fast-forward');
const playPauseButton = document.getElementById('play-pause');
const annotationList = document.getElementById('annotation-list');
const addAnnotationButton = document.getElementById('add-annotation');
const transcriptionTextarea = document.getElementById('transcription');
const startTranscriptionButton = document.getElementById('start-transcription');

// Playback controls
rewindButton.addEventListener('click', () => audio.currentTime -= 5);
fastForwardButton.addEventListener('click', () => audio.currentTime += 5);
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸ Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = '▶️ Play';
    }
});

// Add annotation
addAnnotationButton.addEventListener('click', () => {
    const time = audio.currentTime.toFixed(2);
    const label = prompt('Enter annotation:');
    if (label) {
        const annotationItem = document.createElement('li');
        annotationItem.textContent = `${time}s - ${label}`;
        annotationList.appendChild(annotationItem);

        fetch('/save-annotation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ time, label })
        });
    }
});

// Speech-to-text transcription
startTranscriptionButton.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        transcriptionTextarea.value += transcript + '\n';
    };

    recognition.start();
});

