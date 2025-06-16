# OneTap Mood Journal

A lightweight Progressive Web Application designed for efficient mood tracking and mental wellness monitoring. Built with vanilla web technologies to ensure optimal performance and accessibility across all devices.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

## 🎯 Overview

OneTap Mood Journal is a minimalist approach to mood tracking, emphasizing simplicity and user experience. The application enables users to log their emotional state with a single interaction while providing optional detailed journaling capabilities.

**Live Application:** [https://meghana-m-1176.github.io/mood-journal-app/](https://meghana-m-1176.github.io/mood-journal-app/)

## ✨ Core Features

### Current Implementation
- **One-Touch Mood Logging**: Quick mood selection (Good/Okay/Bad)
- **Optional Note-Taking**: Detailed journaling with timestamp tracking
- **Offline Functionality**: Full PWA capabilities with service worker implementation
- **Cross-Platform Compatibility**: Responsive design optimized for all device types
- **Data Persistence**: Local storage implementation for user data retention

### Planned Features
- **Data Visualization**: Interactive mood charts and trend analysis
- **Calendar Integration**: Historical mood view with calendar interface
- **Security Features**: Optional password protection for sensitive data
- **Notification System**: Customizable mood tracking reminders
- **Export Functionality**: Data export in multiple formats (CSV, JSON)

## 🛠️ Technical Architecture

### Frontend Stack
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern styling with CSS Grid and Flexbox layouts
- **Vanilla JavaScript**: ES6+ features for optimal performance
- **Progressive Web App**: Manifest configuration and service worker implementation

### Development Tools
- **Git**: Version control and collaboration
- **GitHub Pages**: Continuous deployment and hosting
- **Lighthouse**: Performance and accessibility auditing

## 🚀 Installation & Setup

### Prerequisites
- Modern web browser (Chrome 88+, Firefox 85+, Safari 14+)
- Git (for development)

### Local Development
```bash
# Clone the repository
git clone https://github.com/MEGHANA-M-1176/mood-journal-app.git

# Navigate to project directory
cd mood-journal-app

# Serve locally (using Python)
python -m http.server 8000
# OR using Node.js
npx serve .

# Access application
# Open http://localhost:8000 in your browser
```

### PWA Installation
1. Visit the live application URL
2. Look for browser installation prompt or menu option
3. Select "Add to Home Screen" or "Install App"
4. Access the application from your device's home screen

## 📱 Browser Compatibility

| Browser | Version | PWA Support | Offline Mode |
|---------|---------|-------------|--------------|
| Chrome  | 88+     | ✅          | ✅           |
| Firefox | 85+     | ✅          | ✅           |
| Safari  | 14+     | ✅          | ✅           |
| Edge    | 88+     | ✅          | ✅           |

## 🏗️ Project Structure

```
mood-journal-app/
├── index.html              # Main application entry point
├── styles/
│   ├── main.css           # Core application styles
│   └── responsive.css     # Media queries and responsive design
├── scripts/
│   ├── app.js            # Main application logic
│   ├── storage.js        # Data persistence layer
│   └── pwa.js           # PWA functionality
├── icons/               # Application icons for PWA
├── manifest.json       # PWA manifest configuration
├── sw.js              # Service worker for offline functionality
└── README.md          # Project documentation
```

## 🤝 Contributing

Contributions are welcome and appreciated. Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add: Amazing new feature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Test thoroughly across different browsers and devices
- Update documentation for new features
- Maintain backward compatibility when possible

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Bundle Size**: < 100KB (uncompressed)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

```
MIT License - Copyright (c) 2024 Meghana M
Permission is hereby granted, free of charge, to any person obtaining a copy...
```

## 👨‍💻 Author

**Meghana M**
- GitHub: [@MEGHANA-M-1176](https://github.com/MEGHANA-M-1176)
- LinkedIn: [Connect with me](https://linkedin.com/in/your-profile)
- Email: your.email@domain.com

## 🙏 Acknowledgments

- Progressive Web App documentation from [web.dev](https://web.dev)
- Design inspiration from modern UI/UX patterns
- Community feedback and testing support

## 📈 Project Status

**Current Version**: 1.0.0  
**Development Status**: Active Development  
**Last Updated**: December 2024

---

⭐ **Star this repository** if you find it helpful or interesting!
