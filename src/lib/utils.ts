import { BouquetDesign, FlowerPlacement, Flower } from './types';

// Sample flower data - replace with actual data
export const SAMPLE_FLOWERS: Flower[] = [
  { id: 'anemone', name: 'Anemone', count: 0, imageUrl: '/images/flowers/anemone.webp' },
  { id: 'carnation', name: 'Carnation', count: 0, imageUrl: '/images/flowers/carnation.webp' },
  { id: 'dahlia', name: 'Dahlia', count: 0, imageUrl: '/images/flowers/dahlia.webp' },
  { id: 'daisy', name: 'Daisy', count: 0, imageUrl: '/images/flowers/daisy.webp' },
  { id: 'lily', name: 'Lily', count: 0, imageUrl: '/images/flowers/lily.webp' },
  { id: 'orchid', name: 'Orchid', count: 0, imageUrl: '/images/flowers/orchid.webp' },
  { id: 'peony', name: 'Peony', count: 0, imageUrl: '/images/flowers/peony.webp' },
  { id: 'ranunculus', name: 'Ranunculus', count: 0, imageUrl: '/images/flowers/ranunculus.webp' },
  { id: 'rose', name: 'Rose', count: 0, imageUrl: '/images/flowers/rose.webp' },
  { id: 'sunflower', name: 'Sunflower', count: 0, imageUrl: '/images/flowers/sunflower.webp' },
  { id: 'tulip', name: 'Tulip', count: 0, imageUrl: '/images/flowers/tulip.webp' },
  { id: 'zinnia', name: 'Zinnia', count: 0, imageUrl: '/images/flowers/zinnia.webp' },
];

export const SAMPLE_LEAVES = [
  { id: 'leaf1', name: 'Verdant Vein Grass', imageUrl: '/images/leaves/bush-1.png' },
  { id: 'leaf2', name: 'Crystalbloom Thicket', imageUrl: '/images/leaves/bush-2.png' },
  { id: 'leaf3', name: 'Moonleaf Spring', imageUrl: '/images/leaves/bush-3.png' },
  { id: 'leaf4', name: 'Tropical Cluster', imageUrl: '/images/leaves/bush-4.png' },
];

// Generate random bouquet layout
export function generateRandomBouquet(selectedFlowers: Flower[], leafId: string): BouquetDesign {
  // Expand flowers array based on count
  const expandedFlowers: Flower[] = [];
  selectedFlowers.forEach((flower) => {
    for (let i = 0; i < flower.count; i++) {
      expandedFlowers.push(flower);
    }
  });

  const placements: FlowerPlacement[] = expandedFlowers.map((flower, index) => {
    // Create a rough circular arrangement
    const angle = (index / expandedFlowers.length) * Math.PI * 2;
    const radius = 100 + Math.random() * 50;
    const x = 250 + Math.cos(angle) * radius;
    const y = 250 + Math.sin(angle) * radius;

    return {
      id: `placement-${flower.id}-${Date.now()}-${Math.random()}`,
      name: flower.name,
      imageUrl: flower.imageUrl,
      flowerId: flower.id,
      x,
      y,
      rotation: 0,
      scale: 1,
    };
  });

  return {
    id: `bouquet-${Date.now()}`,
    placements,
    leafId,
    sender: '',
    message: '',
    recipient: '',
    createdAt: new Date(),
    canvasHeight: 0,
    canvasWidth: 0
  };
}

// Update flower position
export function updateFlowerPosition(
  bouquet: BouquetDesign,
  placementId: string,
  x: number,
  y: number,
  rotation?: number,
  scale?: number
): BouquetDesign {
  return {
    ...bouquet,
    placements: bouquet.placements.map((p) =>
      p.id === placementId
        ? {
            ...p,
            x,
            y,
            rotation: rotation !== undefined ? rotation : p.rotation,
            scale: scale !== undefined ? scale : p.scale,
          }
        : p
    ),
  };
}

// Update message
export function updateBouquetMessage(bouquet: BouquetDesign, message: string, sender: string, recipient: string): BouquetDesign {
  return {
    ...bouquet,
    sender,
    message,
    recipient
  };
}

// Get flower by ID
export function getFlowerById(flowerId: string): Flower | undefined {
  return SAMPLE_FLOWERS.find((f) => f.id === flowerId);
}

// Get all flowers
export function getAllFlowers(): Flower[] {
  return SAMPLE_FLOWERS;
}

// Get all leaves
export function getAllLeaves() {
  return SAMPLE_LEAVES;
}
