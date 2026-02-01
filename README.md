# Yacht & Catamaran Rental

A modern, responsive static website for luxury yacht and catamaran rentals in the Greek islands. Built with pure HTML, CSS, and vanilla JavaScript - no frameworks required.

## Features

- **Multi-language Support**: English (EN), Russian (RU), Greek (EL)
- **Responsive Design**: Mobile-first approach, works on all devices (360px to 1920px+)
- **Three Page Types**:
  - Home page (landing + yacht showcase)
  - Catalog page (filterable yacht listings)
  - Yacht detail page (full specifications, gallery, booking)
- **Interactive Elements**:
  - Language switcher with localStorage persistence
  - Mobile hamburger menu
  - Category filters (Sailing/Motor/Catamaran)
  - Image gallery with thumbnails
  - Booking modal form
- **15 Yacht Listings** with full multilingual descriptions
- **Popular Tours Section** with 3 featured experiences

## File Structure

```
/
├── index.html              # Main landing page
├── catalog.html            # Yacht catalog with filters
├── yacht.html              # Yacht detail page (uses ?id= query param)
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles with CSS variables
│   ├── js/
│   │   ├── data.js         # Yacht data (15 entries)
│   │   ├── i18n.js         # Translations (EN/RU/EL)
│   │   └── main.js         # Core functionality
│   └── img/                # Image placeholders (see below)
└── README.md
```

## Required Images

Place these images in `assets/img/`:

### Main Images
- `hero-bg.jpg` - Hero section background (1920x1080 recommended)
- `about.jpg` - About section image (800x600 recommended)

### Tour Images
- `tour-blue-lagoon.jpg` - Blue Lagoon tour (600x400)
- `tour-sunset.jpg` - Sunset cruise (600x400)
- `tour-fishing.jpg` - Fishing trip (600x400)

### Yacht Images
For each yacht (1-15), provide:
- `yacht-{n}.jpg` - Main image (800x500)
- `yacht-{n}-2.jpg` - Gallery image 2
- `yacht-{n}-3.jpg` - Gallery image 3

Example: `yacht-1.jpg`, `yacht-1-2.jpg`, `yacht-1-3.jpg`

## Deployment to Vercel

### Option 1: Import from GitHub (Recommended)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy" - no configuration needed!

### Option 2: Drag & Drop

1. Go to [vercel.com](https://vercel.com) and sign in
2. Drag the entire project folder onto the Vercel dashboard
3. Wait for deployment to complete
4. Your site is live!

### Option 3: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
cd rentyachts
vercel

# Follow the prompts
```

## Local Development

Simply open `index.html` in your browser. No build process or server required.

For a better development experience with live reload:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

## Customization

### Colors
Edit CSS variables in `assets/css/styles.css`:

```css
:root {
  --color-primary: #0A3D62;
  --color-secondary: #F39C12;
  --color-accent: #00B4D8;
  /* ... more variables */
}
```

### Adding Languages
1. Add translations to `assets/js/i18n.js`
2. Add language button in the `lang-switcher` div in each HTML file

### Adding Yachts
Add new yacht objects to the `yachtsData` array in `assets/js/data.js`:

```javascript
{
  id: "yacht-slug",
  type: "sailing", // sailing | motor | catamaran
  name: "Yacht Name",
  priceFrom: 850,
  length: 14.5,
  cabins: 4,
  guests: 8,
  location: "Rhodes Marina",
  images: ["assets/img/yacht-new.jpg"],
  shortDesc: { en: "...", ru: "...", el: "..." },
  fullDesc: { en: "...", ru: "...", el: "..." },
  amenities: ["wifi", "aircon", "kitchen"]
}
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License - feel free to use for personal or commercial projects.
