import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

export const metadata: Metadata = {
  title: "Ethical Scanner - Privacy Policy",
};

const PrivacyPolicy = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center px-4 pt-4 sm:pt-8"
      style={{ background: "linear-gradient(to bottom, #000C40, #ACB6E5)" }}
    >
      <div className="flex w-full justify-start px-1 sm:absolute sm:left-4 sm:top-4 sm:px-8">
        <Link href="/">
          <Image
            src={logo}
            alt="Ethical Scanner Logo"
            width={50}
            height={50}
            className="rounded-full transition hover:opacity-80"
          />
        </Link>
      </div>

      <div className="mb-8 mt-2 flex flex-col items-center justify-center">
        <h1 className="mb-4 max-w-3xl text-4xl font-bold text-white">
          Privacy Policy for &quot;Ethical Scanner&quot; App
        </h1>
        <p className="text-lg text-gray-200">
          Your privacy is important to us. This page outlines our privacy
          policy.
        </p>
      </div>

      <div className="max-w-3xl text-white">
        <p>
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our mobile application.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">Information We Collect</h2>
        <p>
          We do not collect any personal information. We do not use cookies or
          similar tracking technologies.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">
          Permissions and Device Access
        </h2>
        <p>
          The app uses the device&apos;s camera solely for barcode scanning. No
          images or personal content are captured, stored, or transmitted. The
          app also requires internet access to retrieve product data from
          external databases. No personal information is transmitted during this
          process.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties. Any data processed by the app is related to usage
          interactions and is not shared with third parties.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">Security</h2>
        <p>
          We implement reasonable security measures to protect your personal
          information. However, no method of transmission or storage is 100%
          secure, and we cannot guarantee the absolute security of your
          information.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">
          Changes to This Privacy Policy
        </h2>
        <p>
          We may update our Privacy Policy from time to time. You are advised to
          review this page periodically for any changes.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">How can you contact us?</h2>
        <p>
          If you have any questions, comments, or concerns about our Privacy
          Policy or our data practices, please contact us at&#160;
          <a href="mailto:dmytro@turskyi.com">dmytro@turskyi.com</a>. We will
          respond to your inquiry as soon as possible.
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
