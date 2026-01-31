async function generateAudio() {
    const voice = document.getElementById('voice').value;
    const prompt = document.getElementById('prompt').value;
    const audioPlayer = document.getElementById('audioPlayer');

    const URL = 'https://runpod-proxy.ilikekeyboards4924.workers.dev/';

    const payload = {
        input: {
            voice: voice,
            prompt: prompt
        }
    };

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        if (data.output && data.output.audio_base64) {
            const audioSrc = `data:audio/wav;base64,${data.output.audio_base64}`;
            audioPlayer.src = audioSrc;
            audioPlayer.style.display = 'block';
            audioPlayer.play();
        } else {
            console.error("Error response:", data);
            alert("Generation failed. Check the console for details.");
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("A network error occurred.");
    }
}