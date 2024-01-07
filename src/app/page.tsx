import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{ background: "linear-gradient(to bottom, #000C40, #F0F2F0)" }}
    >
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold text-white">Ethical Scanner</h1>
        <br />
        <p className="gradient-text text-2xl text-gray-200">
          Scan products to learn about their ethical information.
        </p>
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
      <div className="mb-8 flex space-x-4">
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            paddingBottom: "90px",
          }}
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.turskyi.ethical_scanner&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            target="_blank"
            style={{ alignSelf: "center" }}
          >
            <Image
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              width={150}
              height={58}
            />
          </a>
        </div>
      </div>
    </main>
  );
}
