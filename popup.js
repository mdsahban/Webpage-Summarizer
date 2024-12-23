document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const summaryDiv = document.getElementById('summary');
    
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) {
            throw new Error("No active tab found");
        }

        summaryDiv.innerHTML = '<p>Generating summary...</p>';

        const [{result}] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                function getMainContent() {
                    // For Wikipedia
                    if (window.location.hostname.includes('wikipedia.org')) {
                        const content = document.getElementById('mw-content-text');
                        if (content) {
                            // Get only the first few paragraphs
                            const paragraphs = content.querySelectorAll('p');
                            let text = '';
                            let count = 0;
                            
                            for (let p of paragraphs) {
                                // Skip empty paragraphs or those with just citations
                                if (p.textContent.trim().length < 50) continue;
                                
                                text += p.textContent + ' ';
                                count++;
                                if (count >= 3) break; // Only get first 3 substantial paragraphs
                            }
                            
                            // Clean up the text
                            text = text.replace(/\[\d+\]/g, ''); // Remove citations
                            text = text.replace(/\s+/g, ' ').trim(); // Clean spaces
                            return text;
                        }
                    }

                    // For other websites
                    const selectors = [
                        'main article',
                        'article',
                        '[role="main"]',
                        '#content',
                        '.content'
                    ];

                    for (const selector of selectors) {
                        const element = document.querySelector(selector);
                        if (element) {
                            // Get only first few paragraphs
                            const paragraphs = element.querySelectorAll('p');
                            let text = '';
                            let count = 0;
                            
                            for (let p of paragraphs) {
                                if (p.textContent.trim().length < 50) continue;
                                text += p.textContent + ' ';
                                count++;
                                if (count >= 3) break;
                            }
                            return text;
                        }
                    }

                    // Fallback: get first few paragraphs from body
                    const paragraphs = document.body.querySelectorAll('p');
                    let text = '';
                    let count = 0;
                    for (let p of paragraphs) {
                        if (p.textContent.trim().length < 50) continue;
                        text += p.textContent + ' ';
                        count++;
                        if (count >= 3) break;
                    }
                    return text;
                }

                const text = getMainContent();
                // Limit to 1500 characters
                return text.slice(0, 1500);
            }
        });

        if (!result || result.trim().length === 0) {
            throw new Error("No text content found on the page");
        }

        const summaryResponse = await chrome.runtime.sendMessage({ 
            action: "summarize", 
            text: result 
        });
        
        if (summaryResponse.error) {
            throw new Error(summaryResponse.error);
        }

        summaryDiv.innerHTML = `
            <div style="font-size: 14px; line-height: 1.5;">
                ${summaryResponse.summary}
            </div>
        `;
        
    } catch (error) {
        summaryDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Error:', error);
    }
});
