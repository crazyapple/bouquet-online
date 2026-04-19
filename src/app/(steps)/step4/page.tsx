'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useBouquet } from '@/lib/store';
import { getAllLeaves } from '@/lib/utils';
import { domToPng } from "modern-screenshot";

export default function Step4() {
  const { state } = useBouquet();
  const [email, setEmail] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const bouquet = state.currentBouquet;
  const leaves = getAllLeaves();

  const handleDownloadBouquet = async () => {
    if (!previewRef.current) return;

    try {
      const dataUrl = await domToPng(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `bouquet-${bouquet?.id}.png`;
      link.click();
    } catch (err) {
      console.error(err);
    }
};

  if (!bouquet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No bouquet found. Please go back and create one.</p>
      </div>
    );
  }

  useEffect(() => {
    if (!previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    setScaleX(rect.width / bouquet.canvasWidth);
    setScaleY(rect.height / bouquet.canvasHeight);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-purple-600">Step 4: Download Your Bouquet</h1>
          <p className="text-gray-600 mt-2">Download your beautiful bouquet design</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div 
          className="space-y-8"
          style={{
            width: bouquet.canvasWidth + 64
          }}
        >
          {/* Product Preview */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2
              className="text-2xl font-bold text-gray-800 mb-6"
              style={{
                width: bouquet.canvasWidth
              }}
            >Your Bouquet</h2>

            {/* Greeting Card Preview */}
            <div
              ref={previewRef}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
              style={{ 
                aspectRatio: 1,
                width: bouquet.canvasWidth,
                height: bouquet.canvasHeight
              }}
            >
              {/* Circular Background */}
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-2/3 h-2/3 rounded-full bg-linear-to-b from-amber-50 via-yellow-50 to-amber-50" />
              </div>
              <div className="relative w-full h-full overflow-hidden">
                {/* Leaf/Wrapper */}
                {(() => {
                  const leaf = leaves.find((l) => l.id === bouquet.leafId);
                  return (
                    <img
                      src={(leaf || leaves[0]).imageUrl}
                      alt="leaf"
                      className="w-[77%] absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  );
                })()}

                {/* Flowers */}
                {bouquet.placements.map((placement) => (
                  <img
                    key={placement.id}
                    src={placement.imageUrl}
                    alt={placement.name}
                    className="absolute w-1/6 z-30 select-none touch-none will-change-transform"
                    style={{
                      transform: `translate3d(${placement.x * scaleX}px, ${placement.y * scaleY}px, 0)`
                    }}
                  />
                ))}
              </div>
              
              {/* 🔥 Message Card Overlay */}
              <div className="absolute top-[72%] left-1/2 -translate-x-1/2 w-[50%] bg-white border border-black shadow-md p-4 z-20">
                {/* giống layout Step trước */}
                <div className="space-y-4 text-sm">
                  {/* Recipient */}
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-gray-900">Dear</span>
                    <span className="px-1 text-gray-800">
                      {bouquet.recipient || "Beloved"}
                    </span>
                    <span className="font-bold text-gray-900">,</span>
                  </div>
                  {/* Message */}
                  <p className="space-y-1 text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {bouquet.message || "Your message..."}
                  </p>
                  {/* Closing */}
                  <div className="text-right space-y-1">
                    <div className="font-bold text-gray-900">Sincerely,</div>
                    <div className="inline-block px-1 text-gray-800">
                      {bouquet.sender || "Secret Admirer"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Download Your Design</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {/* <p className="text-xs text-gray-500 mt-1">We'll send your design to this email</p> */}
              </div>

              <button
                onClick={handleDownloadBouquet}
                disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                className="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                📥 Download Bouquet
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <Link
            href="/step3"
            className="px-8 py-3 rounded-lg font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:bg-gray-100 hover:bg-clip-border hover:text-white hover:rounded-lg hover:shadow-lg transition-all"
          >
            ← BACK
          </Link>
        </div>
      </div>
    </div>
  );
}
