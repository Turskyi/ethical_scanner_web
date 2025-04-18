import Link from "next/link";

export default function Support() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-12"
      style={{ background: "linear-gradient(to bottom, #000C40, #F0F2F0)" }}
    >
      <h1 className="mb-6 text-4xl font-bold text-white">Support</h1>
      <p className="mb-4 max-w-2xl text-center text-lg text-white">
        If you have any questions, feedback, or need assistance with the Ethical
        Scanner app, please don’t hesitate to contact us.
      </p>
      <p className="mb-4 text-lg text-white">
        📧 Email us at:{" "}
        <a
          href="mailto:support@turskyi.com"
          className="text-blue-200 underline"
        >
          support@turskyi.com
        </a>
      </p>
      <p className="mb-4 text-lg text-white">
        💬 Join our support group on{" "}
        <a
          href="https://t.me/+B5gN1BLsVPo3M2My"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-200 underline"
        >
          Telegram
        </a>{" "}
        to ask questions or chat with other users.
      </p>
      
      <p className="mb-4 text-lg text-white">
        🌐 You can also visit the{" "}
        <a
          href="https://turskyi.com/#/support"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-200 underline"
        >
          support page on turskyi.com
        </a>{" "}
        for more help.
      </p>
      <p className="text-md mb-8 max-w-xl text-center text-white">
        We&apos;re always working to improve Ethical Scanner. Offline
        functionality and support for personal ethical preferences are planned
        for 2025.
      </p>
      <Link href="/" className="text-blue-300 underline">
        ← Back to Home
      </Link>
    </main>
  );
}
