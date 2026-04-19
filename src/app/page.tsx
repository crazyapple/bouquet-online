'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-purple-600">🌷 Bouquet Customizer</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Create Your Perfect Bouquet</h2>
          <p className="text-xl text-gray-600 mb-12">
            Customize beautiful flower arrangements with drag-and-drop simplicity
          </p>
          
          <Link
            href="/step1"
            className="inline-block bg-linear-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Start Creating →
          </Link>
        </div>

        {/* Steps Overview */}
        <div className="grid md:grid-cols-4 gap-4 mt-16">
          {[
            { step: 1, title: 'Select Flowers', icon: '🌸' },
            { step: 2, title: 'Generate & Customize', icon: '🎨' },
            { step: 3, title: 'Add Message', icon: '💌' },
            { step: 4, title: 'Download Bouquet', icon: '📥' }
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-lg text-gray-800">Step {item.step}</h3>
              <p className="text-gray-600 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
