import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{ background: 'linear-gradient(to bottom, #000C40, #F0F2F0)' }}>
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Ethical Scanner</h1>
        <p className="text-lg text-gray-200">Scan products to learn about their ethical information.</p>
      </div>

      <div className="flex space-x-4 mb-8">
        <a
          href="https://play.google.com/store/apps/details?id=com.turskyi.ethical_scanner"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg transition-all duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download on Android
        </a>
      </div>
      <Link href="https://play.google.com/store/apps/details?id=com.turskyi.ethical_scanner" passHref>
          <Image
            src="/logo.png"
            alt="Ethical Scanner Logo"
            width={96}
            height={96}
            className="rounded-full bg-white object-cover shadow-md"
          />
      </Link>

    </main>
  );
}
