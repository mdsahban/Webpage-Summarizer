chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
        const API_KEY = 'YOUR_GEMINI_API_KEY';
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        const prompt = `
Provide a very brief bullet-point summary of the main points in simple language:

${request.text}`;
        
        fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 256,
                    topP: 0.5,
                }
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const summary = data.candidates[0].content.parts[0].text;
            const formattedSummary = summary
                .split('\n')
                .filter(line => line.trim())
                .map(line => {
                    if (!line.trim().startsWith('•') && !line.trim().startsWith('-')) {
                        line = '• ' + line.trim();
                    }
                    return `<p style="margin-bottom: 8px;">${line}</p>`;
                })
                .join('');
            sendResponse({ summary: formattedSummary });
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ error: "Error summarizing the page: " + error.message });
        });
        return true;
    }
});