# Bouquet Customization Website - Project Instructions

## Project Overview
A serverless Next.js TypeScript application for creating and customizing flower bouquets with a multi-step workflow (selection, generation, customization, messaging, preview, and cart).

## Technology Stack
- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Vercel (serverless)

## Project Structure
```
src/
  app/
    page.tsx           # Landing page
    layout.tsx         # Root layout
    (steps)/
      step1/           # Flower selection
      step2/           # Bouquet generation & customization
      step3/           # Message input
      step4/           # Preview generation
      step5/           # Cart & checkout
  components/
    BouquetCanvas/     # Canvas component for flower placement
    FlowerPicker/      # Flower selection component
    Cart/              # Cart display component
    QRPayment/         # QR code payment component
  lib/
    types.ts           # TypeScript types
    utils.ts           # Utility functions
    store.ts           # State management
  public/
    images/
      flowers/         # Flower images (placeholder)
      leaves/          # Leaf/wrapper images (placeholder)
```

## Development Workflow
1. Run `npm run dev` to start the development server
2. Navigate to http://localhost:3000
3. Follow the multi-step bouquet customization process

## Implemented Features
- ✅ Step 1: Select flowers (>=6)
- ✅ Step 2: Generate bouquet with random layout + drag-to-customize
- ✅ Step 3: Input message for greeting card
- ✅ Step 4: Preview generated bouquet with download option
- ✅ Step 5: Add to cart, manage cart, and QR payment page

## Notes
- Flower images are currently placeholders (emoji) and should be replaced with actual images
- Leaf/wrapper images are currently placeholders (emoji) and should be replaced with actual images
- QR payment implementation can use any QR code library (e.g., qrcode.react, stripe)
- Image generation uses html2canvas for preview downloads
- All state is managed via React Context API
- Application is fully typed with TypeScript
- Responsive design with Tailwind CSS

