# 🌷 Bouquet Customizer

A serverless Next.js TypeScript application for creating and customizing beautiful flower bouquets. This is a multi-step workflow application that guides users through selecting flowers, generating layouts, adding messages, previewing, and checking out.

## Features

✨ **Step 1: Flower Selection** - Choose at least 6 different flowers for your bouquet
🎨 **Step 2: Generate & Customize** - Auto-generate random bouquet layouts with drag-and-drop customization
💌 **Step 3: Add Message** - Write a personalized message for the greeting card
👁️ **Step 4: Preview** - See your complete bouquet with message and download as image
🛒 **Step 5: Cart & Checkout** - Add to cart, manage quantities, and proceed to QR payment

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Image Generation**: html2canvas
- **Deployment**: Vercel (serverless)

## Project Structure

```
src/
  app/
    page.tsx                    # Landing page
    layout.tsx                  # Root layout with BouquetProvider
    (steps)/
      step1/page.tsx           # Flower selection
      step2/page.tsx           # Bouquet generation & customization
      step3/page.tsx           # Message input
      step4/page.tsx           # Preview generation
      step5/page.tsx           # Cart & checkout
  components/                  # Reusable components (can be extended)
  lib/
    types.ts                   # TypeScript types and interfaces
    store.ts                   # React Context state management
    utils.ts                   # Helper functions and sample data
  public/
    images/                    # Placeholder for flower/leaf images
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Build for Production

```bash
npm run build
npm start
```

### Lint the Code

```bash
npm run lint
```

## Project Features Explained

### 1. Flower Selection (Step 1)
- Users select at least 6 flowers from a predefined collection
- Progress indicator shows minimum requirement
- Selected flowers are stored in the global state

### 2. Bouquet Generation (Step 2)
- Randomly generates flower positions on the canvas
- Users can drag flowers to customize positions
- Users can select different wrapper/leaf types
- Can regenerate for different layouts

### 3. Message Input (Step 3)
- Users write a personalized message (max 200 characters)
- Real-time character count
- Message preview in styled card format

### 4. Image Preview (Step 4)
- Displays complete bouquet visualization
- Shows all selected flowers with their positions
- Displays the greeting card message
- Download preview as PNG image using html2canvas

### 5. Cart & Checkout (Step 5)
- Add customized bouquets to cart with quantity
- Manage cart items (add, remove, clear)
- Order summary with pricing
- QR payment integration (placeholder for live payment providers)

## State Management

The application uses React Context API (`BouquetProvider`) to manage:
- Selected flowers
- Current bouquet design
- Cart items
- Total pricing

Access state using the custom hook: `useBouquet()`

## Customization

### Adding More Flowers

Edit `src/lib/utils.ts` - `SAMPLE_FLOWERS` array:

```typescript
export const SAMPLE_FLOWERS: Flower[] = [
  { id: 'rose', name: 'Rose', color: 'red', imageUrl: '/images/flowers/rose.png' },
  // Add more flowers here
];
```

### Changing Pricing

Edit `src/app/(steps)/step5/page.tsx` - `price` state variable:

```typescript
const [price, setPrice] = useState(49.99); // Change default price
```

### Image Assets

- Place flower images in `public/images/flowers/`
- Place leaf/wrapper images in `public/images/leaves/`
- Update image URLs in `SAMPLE_FLOWERS` and `SAMPLE_LEAVES`

## Payment Integration

The QR payment page is currently a placeholder. To integrate real payment:

1. **Stripe**: Use `@stripe/react-stripe-js` for QR code generation
2. **Alipay/WeChat Pay**: Use QR code libraries like `qrcode.react`
3. Popular QR code library: `npm install qrcode.react`

## Deployment on Vercel

1. Push code to GitHub
2. Create a Vercel account and connect your GitHub repository
3. Vercel automatically detects Next.js and deploys
4. Set environment variables if needed in Vercel dashboard

```bash
vercel deploy
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Next.js Image Optimization (can be added)
- Static generation for all pages
- Turbopack for fast development builds
- Code splitting for smaller bundles

## Future Enhancements

- [ ] Real payment provider integration (Stripe, etc.)
- [ ] User accounts and saved designs
- [ ] Design templates and presets
- [ ] Social sharing features
- [ ] Actual flower/leaf image library
- [ ] Advanced customization (size, color adjustments)
- [ ] Order history and reorder feature
- [ ] Admin dashboard for managing products

## Troubleshooting

### Development server not starting
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Build errors
```bash
# Check TypeScript errors
npm run build

# Lint for code issues
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the GitHub repository.

