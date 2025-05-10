import { FLUTTER_WEB_URL } from '../../../constants';

export default function WebApp() {
  return (
    <div
      className="w-screen h-screen"
      style={{ background: 'linear-gradient(to bottom, #000C40, #F0F2F0)' }}
    >
      <iframe
        src={`${FLUTTER_WEB_URL}`}
        className="w-full h-full"
        style={{ border: 'none' }}
        allow="camera"
      ></iframe>
    </div>
  );
}
