'use client';

import { useState, useEffect, useRef, PointerEvent } from 'react';
import Link from 'next/link';
import { useBouquet } from '@/lib/store';
import { generateRandomBouquet, getFlowerById, getAllLeaves } from '@/lib/utils';
import { BouquetDesign, FlowerPlacement } from '@/lib/types';

export default function Step2() {
  const { state, setBouquetDesign } = useBouquet();
  const [bouquet, setBouquet] = useState<BouquetDesign | null>(null);
  const [selectedLeafId, setSelectedLeafId] = useState('leaf1');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const leaves = getAllLeaves();

  const offsetRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: PointerEvent<HTMLImageElement>, item: FlowerPlacement) => {
    setActiveDragId(item.id);

    const rect = e.currentTarget.getBoundingClientRect();

    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLImageElement>, item: FlowerPlacement) => {
    if (!bouquet || activeDragId !== item.id) return;

    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const newX = e.clientX - canvasRect.left - offsetRef.current.x;
    const newY = e.clientY - canvasRect.top - offsetRef.current.y;

    setBouquet((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        placements: prev.placements.map((p) =>
          p.id === item.id
            ? {
                ...p,
                x: newX,
                y: newY,
              }
            : p
        ),
      };
    });

    // cập nhật mask theo con trỏ
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    el.style.setProperty("--x", `${localX}px`);
    el.style.setProperty("--y", `${localY}px`);
  };

  const handlePointerUp = (e: PointerEvent<HTMLImageElement>) => {
    setActiveDragId(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Generate bouquet on mount
  useEffect(() => {
    if (state.selectedFlowers.length > 0 && !bouquet) {
      const newBouquet = generateRandomBouquet(state.selectedFlowers, selectedLeafId);
      setBouquet(newBouquet);
    }
  }, [state.selectedFlowers, bouquet, selectedLeafId]);

  const handleRegenerate = () => {
    if (state.selectedFlowers.length > 0) {
      const newBouquet = generateRandomBouquet(state.selectedFlowers, selectedLeafId);
      setBouquet(newBouquet);
    }
  };

  const handleLeafChange = (leafId: string) => {
    setSelectedLeafId(leafId);
    if (bouquet) {
      setBouquet({ ...bouquet, leafId });
    }
  };

  const handleProceed = () => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (bouquet && canvasRect) {
      setBouquetDesign({
        ...bouquet,
        canvasWidth: canvasRect.width,
        canvasHeight: canvasRect.height,
      });
    }
  };

  if (!bouquet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-purple-600">Step 2: Generate & Customize</h1>
          <p className="text-gray-600 mt-2">Drag flowers to adjust their positions, or regenerate for a new layout</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Canvas Area */}
          <div className="md:col-span-2">
            <div
              ref={canvasRef}
              className="relative w-full h-160 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200"
            >
              {/* Bouquet Visualization */}
              <div className="relative w-full h-full">
                {/* Leaf/Wrapper */}
                {(() => {
                  const leaf = leaves.find((l) => l.id === selectedLeafId);
                  return leaf ? (
                    <picture>
                      <source srcSet={leaf.imageUrl} type="png" />
                      <img alt={leaf.name} className="w-[77%] absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2" loading="eager" fetchPriority="high" src={leaf.imageUrl} />
                    </picture>
                  ) : (
                    <picture>
                      <source srcSet={leaves[0].imageUrl} type="png" />
                      <img alt={leaves[0].name} className="w-[77%] absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2" loading="eager" fetchPriority="high" src={leaves[0].imageUrl} />
                    </picture>
                  );
                })()}

                {/* Flowers */}
                {bouquet.placements.map((placement) => {
                  const flower = getFlowerById(placement.flowerId);
                  if (!flower) return null;
                  return (
                    <picture key={placement.id}>
                      <source srcSet={placement.imageUrl} type="png" />
                      <img
                        src={placement.imageUrl}
                        alt={placement.name}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onPointerDown={(e) => handlePointerDown(e, placement)}
                        onPointerMove={(e) => handlePointerMove(e, placement)}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                        className={`
                          absolute w-1/6 select-none touch-none
                          will-change-transform
                          ${activeDragId === placement.id ? "opacity-70 cursor-grabbing z-50" : "cursor-grab z-20"}
                        `}
                        style={{
                          transform: `translate3d(${placement.x}px, ${placement.y}px, 0)`,
                        }}
                      />
                    </picture>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Leaf Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Wrapper Type</h3>
              <div className="space-y-3">
                {leaves.map((leaf) => (
                  <button
                    key={leaf.id}
                    onClick={() => handleLeafChange(leaf.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedLeafId === leaf.id
                        ? 'bg-linear-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {leaf.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Regenerate */}
            <button
              onClick={handleRegenerate}
              className="w-full bg-linear-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
            >
              🔄 Regenerate Layout
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-16">
          <Link
            href="/step1"
            className="px-8 py-3 rounded-lg font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:bg-gray-100 hover:bg-clip-border hover:text-white hover:rounded-lg hover:shadow-lg transition-all"
          >
            ← BACK
          </Link>
          <Link
            href="/step3"
            onClick={handleProceed}
            className="px-8 py-3 rounded-lg font-bold text-white bg-linear-to-r from-pink-500 to-purple-600 hover:bg-clip-text hover:text-transparent transition-all"
          >
            NEXT →
          </Link>
        </div>
      </div>
    </div>
  );
}
