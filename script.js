const buttonElement = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enabled/Disabled Button while joke is playing
function toggleButton() {
    buttonElement.disabled = !buttonElement.disabled;
}

// Pass the Joke to voice rss api
function tellMeJoke(joke) {
    VoiceRSS.speech({
        key: '3bd0044cb2804225b8f3e45d9af26c27',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Joke from api
async function getJoke() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    let jokeText = '';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.joke) {
            jokeText = data.joke;
        } else if (data.setup) {
            jokeText = `${data.setup} ... ${data.delivery}`;
        }
        // Text to Speech
        tellMeJoke(jokeText);
        
        //Toggle Button
        toggleButton();
    } catch (error) {
        // Catch error
        console.log('Whoops', error);
    }
}

// On Load
buttonElement.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);