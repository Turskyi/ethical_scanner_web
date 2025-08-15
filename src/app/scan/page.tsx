'use client';

import { FLUTTER_WEB_URL_SCAN } from '../../../constants';
import { SUPPORT_EMAIL } from '../../../constants';

export default function Scan() {
  return (
    <div
      className="relative h-screen w-screen"
      style={{ background: 'linear-gradient(to bottom, #000C40, #F0F2F0)' }}
    >
      {/* Static message layer (bottom) */}
      <div className="absolute inset-0 flex flex-col items-center pt-32 text-center text-white">
        <h2 className="mb-6 text-2xl font-bold">
          Having trouble viewing the scanner?
        </h2>
        <div className="space-y-4 max-w-md">
          <p>
            Try using a different web browser, or look for our mobile apps on
            Google Play and App Store.
          </p>
          <p className="text-sm text-gray-300">
            Need help? Contact us at {SUPPORT_EMAIL}.
          </p>
        </div>
      </div>

      {/* iframe layer (top) */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        <iframe
          src={`${FLUTTER_WEB_URL_SCAN}`}
          className="h-full w-full"
          style={{ border: 'none' }}
          allow="camera"
        />
      </div>
    </div>
  );
}
