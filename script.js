async function generateAudio() {
    // Get values from input boxes
    const apiKey = document.getElementById('apiKey').value;
    const character = document.getElementById('character').value;
    const prompt = document.getElementById('prompt').value;
    const audioPlayer = document.getElementById('audioPlayer');

    if (!apiKey) {
        alert("Please enter an API Key.");
        return;
    }

    const ENDPOINT_ID = "YOUR_ENDPOINT_ID"; // Hardcode your endpoint ID here
    const URL = `https://api.runpod.ai/v2/${ENDPOINT_ID}/runsync`;

    const payload = {
        input: {
            character: character,
            prompt: prompt
        }
    };

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Use the input value
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
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