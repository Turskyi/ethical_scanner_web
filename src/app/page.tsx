import Image from 'next/image';
import Link from 'next/link';
import screenshot1 from '../../screenshots/screen1.jpeg';
import screenshot2 from '../../screenshots/screen2.jpeg';
import screenshot3 from '../../screenshots/screen3.jpeg';
import screenshot4 from '../../screenshots/screen4.jpeg';
import screenshot5 from '../../screenshots/screen5.jpeg';
import { GOOGLE_PLAY, APP_NAME, APP_STORE } from '../../constants';

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between py-12 md:px-12 lg:px-24"
      style={{ background: 'linear-gradient(to bottom, #000C40, #F0F2F0)' }}
    >
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-bold text-white">Ethical Scanner</h1>
        <h2 className="mb-4 px-4 text-3xl text-white">
          Empowering Consumers to Make Ethical Choices
        </h2>
        <br />
        <br />
        <p className="gradient-text px-4 text-3xl text-gray-200">
          Scan products to learn about their ethical information.
        </p>
        <p className="gradient-text px-4 text-2xl text-white">
          Know your products better to make ethical choices!
        </p>
        <br />
        <br />
        <div style={{ maxWidth: '600px' }}>
          <p className="px-4 text-xl text-white">
            {APP_NAME} is a mobile app that helps you explore the ethical
            background of everyday products. Use it to better understand the
            impact of your purchases.
          </p>
        </div>
      </div>
      <Link href={`${GOOGLE_PLAY}`} passHref>
        <Image
          src="/logo.png"
          alt={`${APP_NAME} Logo`}
          width={96}
          height={96}
          className="rounded-full bg-white object-cover shadow-md"
        />
      </Link>

      <div className="mt-8 w-full max-w-4xl px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          App Features
        </h2>
        <ul className="list-inside list-disc space-y-2 text-lg text-white">
          <li>Scan barcodes to discover ethical product info</li>
          <li>
            Color-coded results: green (ethical), yellow (neutral), red
            (concerning)
          </li>
          <li>Links to credible sources for transparency</li>
          <li>Supports values-driven decision making while shopping</li>
        </ul>
      </div>

      <div className="mt-16 w-full">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Screenshots
        </h2>
        <div className="flex justify-center overflow-x-auto">
          <div className="flex w-max gap-2">
            <Image
              src={screenshot1}
              alt="Screenshot 1"
              width={250}
              height={500}
              className="rounded-lg"
            />
            <Image
              src={screenshot2}
              alt="Screenshot 2"
              width={250}
              height={500}
              className="rounded-lg"
            />
            <Image
              src={screenshot3}
              alt="Screenshot 3"
              width={250}
              height={500}
              className="rounded-lg"
            />
            <Image
              src={screenshot4}
              alt="Screenshot 4"
              width={250}
              height={500}
              className="rounded-lg"
            />
            <Image
              src={screenshot5}
              alt="Screenshot 5"
              width={250}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-primary">
          Download Ethical Scanner
        </h2>
        <p className=" text-gray-800">
          Available now for Android. Coming soon to the App Store!
        </p>
      </div>
      <footer className="mt-8 text-center text-white">
        <div className="mb-8 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <a
              href={`${GOOGLE_PLAY}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={150}
                height={58}
              />
            </a>
            <a
            href={`${APP_STORE}`}
            target="_blank"
            rel="noopener noreferrer"
            >
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width={128}
                height={44}
              />
            </a>

            <Link href="/support">
              <button
                className="rounded px-4 py-2 text-white transition hover:bg-[#1a2c44]"
                style={{ backgroundColor: '#000C40' }}
              >
                Support
              </button>
            </Link>

            <Link href="/privacy">
              <button
                className="rounded px-4 py-2 text-white transition hover:bg-[#1a2c44]"
                style={{ backgroundColor: '#000C40' }}
              >
                Privacy
              </button>
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          {APP_NAME} is developed by a passionate team dedicated to promoting
          ethical consumerism.
        </p>
      </footer>
    </main>
  );
}
