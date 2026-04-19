'use client';

import Link from 'next/link';
import { useBouquet } from '@/lib/store';
import { getAllFlowers } from '@/lib/utils';
import { Flower } from '@/lib/types';

const MAX_FLOWERS = 10;
const MIN_FLOWERS = 6;

export default function Step1() {
  const { state, selectFlower, incrementFlower, decrementFlower } = useBouquet();
  const allFlowers = getAllFlowers();

  // Calculate total flower count
  const totalFlowers = state.selectedFlowers.reduce((sum, f) => sum + f.count, 0);
  const canProceed = totalFlowers >= MIN_FLOWERS;

  const getFlowerCount = (flowerId: string): number => {
    const flower = state.selectedFlowers.find((f) => f.id === flowerId);
    return flower ? flower.count : 0;
  };

  const handleFlowerClick = (flower: Flower) => {
    const currentCount = getFlowerCount(flower.id);
    
    if (currentCount === 0) {
      selectFlower(flower);
    } else if (currentCount < MAX_FLOWERS) {
      incrementFlower(flower.id);
    }
  };

  const handleRemoveFlower = (flowerId: string) => {
    decrementFlower(flowerId);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-purple-600">Step 1: Select Your Flowers</h1>
          <p className="text-gray-600 mt-2">Choose at least 6 flowers for your bouquet (you can pick multiple of the same)</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-purple-600">
              {totalFlowers} <span className="text-2xl text-gray-500">/ {MAX_FLOWERS}</span>
            </div>
            <span className={`text-lg font-semibold ${totalFlowers < MIN_FLOWERS ? 'text-red-500' : 'text-green-500'}`}>
              {totalFlowers < MIN_FLOWERS ? `Need ${MIN_FLOWERS - totalFlowers} more` : '✓ Ready'}
            </span>
          </div>
        </div>

        {/* Selected Flowers Tags */}
        {state.selectedFlowers.length > 0 && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow h-28">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Selected Flowers</h3>
            <div className="flex flex-wrap gap-3 overflow-y-auto max-h-16">
              {state.selectedFlowers.map((flower) => (
                <div
                  key={flower.id}
                  onClick={() => handleRemoveFlower(flower.id)}
                  className="bg-linear-to-br from-pink-500 to-purple-600 text-white border-2 border-white px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap transition-all hover:bg-white hover:border-2 hover:border-pink-500 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-600"
                >
                  <span>{flower.name} {flower.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flower Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-6 gap-6 ${totalFlowers >= MAX_FLOWERS ? 'opacity-50 pointer-events-none' : ''}`}>
          {allFlowers.map((flower) => {
            const count = getFlowerCount(flower.id);
            const isMaxed = count >= MAX_FLOWERS;
            return (
              <div
                key={flower.id}
                className={`rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                  count > 0
                    ? 'ring-4 ring-purple-500 shadow-lg scale-105'
                    : 'hover:shadow-lg hover:scale-102'
                } ${isMaxed ? 'opacity-60' : ''}`}
                onClick={() => !isMaxed && handleFlowerClick(flower)}
              >
                <div className="bg-white p-4 h-full flex flex-col relative">
                  {/* Counter Badge */}
                  {count > 0 && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {count}
                    </div>
                  )}
                  
                  {/* Flower Image */}
                  <div className="aspect-square bg-linear-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center mb-3">
                    <picture>
                      <source srcSet={flower.imageUrl} type="image/webp" />
                      <img alt={flower.name} className="w-full h-full" loading="eager" fetchPriority="high" src={flower.imageUrl} />
                    </picture>
                  </div>
                  
                  {/* Flower Name */}
                  <h3 className="font-bold text-gray-800 text-center text-sm">{flower.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-16">
          <Link
            href="/"
            className="px-8 py-3 rounded-lg font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:bg-gray-100 hover:bg-clip-border hover:text-white hover:rounded-lg hover:shadow-lg transition-all"
          >
            ← BACK TO HOME
          </Link>
          <Link
            href="/step2"
            className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
              canProceed
                ? 'bg-linear-to-r from-pink-500 to-purple-600 hover:bg-clip-text hover:text-transparent'
                : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
            onClick={(e) => !canProceed && e.preventDefault()}
          >
            NEXT →
          </Link>
        </div>
      </div>
    </div>
  );
}
