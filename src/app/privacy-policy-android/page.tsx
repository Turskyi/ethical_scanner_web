import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethical Scanner - Android Privacy Policy",
};

const PrivacyPolicyAndroid = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{ background: "linear-gradient(to bottom, #000C40, #F0F2F0)" }}
    >
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="mb-4 max-w-2xl text-4xl font-bold text-white">
          Privacy Policy for Android Mobile Application &quot;Ethical
          Scanner&quot;
        </h1>
        <p className="text-lg text-gray-200">
          Your privacy is important to us. This page outlines our privacy
          policy.
        </p>
      </div>

      <div className="max-w-2xl text-white">
        <p>
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our mobile application.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">Information We Collect</h2>
        <p>
          We may collect personal information that you voluntarily provide to us
          when using our application. This may include but is not limited to
          your name, email address, and other personally identifiable
          information.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">
          How We Use Your Information
        </h2>
        <p>
          We use the information we collect to provide, maintain, and improve
          our services, as well as to communicate with you, respond to your
          inquiries, and send you updates and promotional materials.
        </p>

        <h2 className="mt-4 text-2xl font-semibold">Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties. Your information may be disclosed to trusted third
          parties who assist us in operating our application, conducting our
          business, or servicing you.
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

export default PrivacyPolicyAndroid;
