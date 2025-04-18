import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{ background: "linear-gradient(to bottom, #000C40, #F0F2F0)" }}
    >
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-bold text-white">Ethical Scanner</h1>
        <h2 className="mb-4 text-3xl text-white">
          Empowering Consumers to Make Ethical Choices
        </h2>
        <br />
        <br />
        <p className="gradient-text text-3xl text-gray-200">
          Scan products to learn about their ethical information.
        </p>
        <p className="gradient-text text-2xl text-white">
          Know your products better to make ethical choices!
        </p>
        <br />
        <br />
        <div style={{ maxWidth: "600px" }}>
          <p className="text-xl text-white">
            Ethical Scanner is a product ethics tool for Android platform. By
            using this tool, we hope you can better understand the ethical
            implications of your purchases.
          </p>
        </div>
        <br />
        <ul className="list-inside list-disc text-white">
          <li>Scan barcodes to get ethical information about products</li>
          <li>Make informed decisions about your purchases</li>
        </ul>
      </div>
      <Link
        href="https://play.google.com/store/apps/details?id=com.turskyi.ethical_scanner"
        passHref
      >
        <Image
          src="/logo.png"
          alt="Ethical Scanner Logo"
          width={96}
          height={96}
          className="rounded-full bg-white object-cover shadow-md"
        />
      </Link>
      <div className="mb-8 flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-6">
          <a
            href="https://play.google.com/store/apps/details?id=com.turskyi.ethical_scanner&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
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

          <Link href="/support">
            <button
              className="rounded px-4 py-2 text-white transition hover:bg-[#1a2c44]"
              style={{ backgroundColor: "#000C40" }}
            >
              Support
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
