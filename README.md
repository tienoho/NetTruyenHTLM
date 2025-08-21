# NetTruyenHTLM 📚

A Vietnamese online manga/comic reading website - **NetTruyen (Manhuarock)** 

*Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày*

## 🌟 Overview

NetTruyenHTLM is a static HTML-based website designed for reading Vietnamese manga and comics online. The platform provides a comprehensive manga reading experience with features like browsing, searching, tracking, and history management.

## ✨ Features

- **📖 Manga Reading**: Browse and read a vast collection of manga/comics
- **🔍 Advanced Search**: Find comics by genre, status, and other criteria
- **🔥 Hot Comics**: Discover trending and popular titles
- **📋 Following System**: Track your favorite manga series
- **📚 Reading History**: Keep track of your reading progress
- **📱 Responsive Design**: Mobile-friendly interface
- **🌐 Vietnamese Language**: Full Vietnamese language support

## 📁 File Structure

```
NetTruyenHTLM/
├── index.html                    # Homepage - main entry point
├── hot.html                      # Hot/trending comics page
├── tim-truyen.html              # Browse/search comics page
├── tim-truyen-nang-cao.html     # Advanced search page
├── theo-doi.html                # Following/tracking page
├── lich-su.html                 # Reading history page
├── data/                        # Assets directory
│   ├── Sites/skins/comic/       # CSS and JavaScript files
│   ├── logos/                   # Website logos and icons
│   ├── app/                     # Mobile app icons
│   └── comics/                  # Comic images and data
└── adminskin/                   # Admin interface files
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: jQuery 3.6.0
- **Icons**: Font Awesome
- **Responsive**: Bootstrap-based responsive design
- **Features**: Lazy loading, infinite scroll, AJAX navigation

## 🚀 Getting Started

### Prerequisites

- Web server (Apache, Nginx, or simple HTTP server)
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tienoho/NetTruyenHTLM.git
   cd NetTruyenHTLM
   ```

2. **Serve the files**
   
   Using Python (Python 3):
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx http-server -p 8000
   ```
   
   Using PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Access the website**
   
   Open your browser and navigate to `http://localhost:8000`

## 📖 Pages Description

| Page | File | Description |
|------|------|-------------|
| **Homepage** | `index.html` | Main landing page with featured comics and latest updates |
| **Hot Comics** | `hot.html` | Trending and popular manga titles |
| **Browse** | `tim-truyen.html` | Browse comics by categories and genres |
| **Advanced Search** | `tim-truyen-nang-cao.html` | Detailed search with multiple filters |
| **Following** | `theo-doi.html` | User's followed manga series |
| **History** | `lich-su.html` | Reading history and bookmarks |

## 🎨 Customization

### Styling
- Main styles are located in `data/Sites/skins/comic/css/`
- Custom modifications can be made to `styles.min.css`

### JavaScript
- Core functionality is in `data/Sites/skins/comic/js/scripts.js`
- Features include lazy loading, user authentication, and AJAX operations

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Support

The website includes:
- Responsive design for mobile devices
- Touch-friendly navigation
- Mobile app icons and PWA manifest
- Optimized loading for mobile networks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Maintain Vietnamese language support
- Ensure mobile responsiveness
- Test across different browsers
- Follow existing code structure and naming conventions
- Optimize for performance (lazy loading, minified assets)

## 📄 License

This project is for educational and demonstration purposes. Please respect copyright laws and the original content creators.

## 🔗 Related Links

- **Website**: NetTruyen (Manhuarock)
- **Facebook**: [NetTruyen Facebook Group](https://www.facebook.com/groups/nettruyenn)
- **Mobile App**: Available for download

## ⚠️ Disclaimer

This is a static HTML representation of a manga reading website. The actual functionality may require backend services and databases for full operation.

---

**Made with ❤️ for manga lovers in Vietnam** 🇻🇳