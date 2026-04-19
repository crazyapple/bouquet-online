'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBouquet } from '@/lib/store';
import { updateBouquetMessage } from '@/lib/utils';

export default function Step3() {
  const { state, setBouquetDesign } = useBouquet();
  const [recipient, setRecipient] = useState(state.currentBouquet?.recipient || '');
  const [message, setMessage] = useState(state.currentBouquet?.message || '');
  const [sender, setSender] = useState(state.currentBouquet?.sender || '');
  const maxLength = 300;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value.substring(0, maxLength);
    setMessage(newMessage);
  };

  const handleProceed = () => {
    if (state.currentBouquet) {
      const updatedBouquet = updateBouquetMessage(state.currentBouquet, message, sender, recipient);
      setBouquetDesign(updatedBouquet);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-purple-600">Step 3: Write The Card</h1>
          <p className="text-gray-600 mt-2">Personalize your greeting card message</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-12 border-4 border-black">
          {/* Card Preview */}
          <div className="space-y-6">
            {/* Recipient Line */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">Dear</span>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Beloved"
                className="flex-1 bg-transparent border-b border-gray-300 focus:border-gray-600 focus:outline-none text-gray-800 placeholder-gray-400"
              />
              <span className="text-lg font-bold text-gray-900">,</span>
            </div>

            {/* Message Area */}
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="I have so much to tell you, but only this much space on this card! Still, you must know..."
              className="w-full h-32 bg-transparent border border-gray-300 p-3 focus:outline-none focus:border-gray-600 resize-none text-gray-800 placeholder-gray-400 text-sm leading-relaxed"
            />

            {/* Character Counter */}
            <div className="text-xs text-gray-500 text-right">
              {message.length} / {maxLength} characters
            </div>

            {/* Closing Line */}
            <div className="space-y-2">
              <div className="text-gray-900 font-bold text-sm text-right">Sincerely,</div>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Secret Admirer"
                className="w-full bg-transparent border-b border-gray-300 focus:border-gray-600 focus:outline-none text-gray-800 placeholder-gray-400 text-sm text-right"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 gap-4">
          <Link
            href="/step2"
            className="px-8 py-3 rounded-lg font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:bg-gray-100 hover:bg-clip-border hover:text-white hover:rounded-lg hover:shadow-lg transition-all"
          >
            ← BACK
          </Link>
          <Link
            href="/step4"
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
