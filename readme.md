# Webpage Summarizer Chrome Extension 📚

A powerful Chrome extension that uses Google's Gemini AI to generate concise bullet-point summaries of any webpage. Perfect for quick research, reading articles, and getting key information from long content.


## ✨ Features

- 🚀 One-click webpage summarization
- 📋 Clean bullet-point summaries in simple language
- ⚡ Fast and efficient processing
- 📱 Works on any website (specially optimized for Wikipedia!)
- 🎨 Clean, user-friendly interface

## 🛠️ Installation

### Prerequisites
- Google Chrome Browser
- Gemini API Key (free from Google AI Studio)

### Steps to Install

1. **Get Gemini API Key**
   ```bash
   # Visit Google AI Studio
   https://makersuite.google.com/app/apikey
   # Create new key and copy it
   ```

2. **Clone the Repository**
   ```bash
   git clone https://github.com/mdsahban/webpage-summarizer.git
   cd webpage-summarizer
   ```

3. **Configure API Key**
   - Open `background.js`
   - Replace `'YOUR_GEMINI_API_KEY'` with your actual API key
   - Save the file

4. **Load in Chrome**
   - Open Chrome
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the extension folder

## 💻 Usage

1. Click the extension icon in Chrome toolbar
2. Press the "Summarize" button
3. Get your summary in seconds!

![Usage Example](https://drive.google.com/file/d/1u52wABAknt6GPlvFEzBFWQqForXk9dOp/view?usp=sharing)

## 🏗️ Project Structure

```
webpage-summarizer/
├── manifest.json        # Extension configuration
├── popup.html          # Extension popup interface
├── popup.js            # Popup interaction logic
├── background.js       # Background processes & API calls
└── styles.css          # Extension styling
```

## 🔧 Technical Details

The extension works in three simple steps:

1. **Content Extraction**
   - Smart extraction of main content
   - Optimized for various website structures
   - Filters out irrelevant content

2. **AI Processing**
   - Uses Gemini AI for intelligent summarization
   - Processes text efficiently
   - Generates easy-to-read bullet points

3. **User Interface**
   - Clean, modern popup design
   - Loading states for better UX
   - Error handling with clear messages

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| No Summary Generated | Check API key in background.js |
| Slow Performance | Wait a few seconds for long pages |
| Extension Not Working | Reload the extension |

## 🚀 Quick Tips

- Use on Wikipedia for best results
- Works great for news articles
- Ideal for research papers
- Perfect for long blog posts

## 📝 Code Examples

### Using the Extension
```javascript
// Example of how to trigger summarization
document.getElementById('summarizeBtn').addEventListener('click', () => {
    // Your summarization code
});
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👏 Acknowledgments

- Google's Gemini AI for powering the summarization
- Chrome Extensions documentation
- Wikipedia for optimization testing

## 📞 Support

Having issues? Let's solve them:

1. 🐛 Check the issues page
2. 📝 Create a new issue
3. 📧 Contact via email:mdsahban28@duck.com

## 🔜 Roadmap

- [ ] Add support for PDF files
- [ ] Implement custom summary lengths
- [ ] Add multiple language support
- [ ] Create options page for customization

---

Built with ❤️ by [Md Sahban]

