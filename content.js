chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getText") {
        try {
            // Get main content text while excluding navigation, footers, etc.
            const mainContent = document.querySelector('main, article, .content, #content') || document.body;
            const text = mainContent.innerText;
            // Limit text length to avoid API limits
            const truncatedText = text.slice(0, 5000);
            sendResponse({ text: truncatedText });
        } catch (error) {
            sendResponse({ error: "Error extracting text: " + error.message });
        }
    }
    return true;
});