import { FLUTTER_WEB_URL_SCAN } from '../../../constants';

export default function Scan() {
  return (
    <div
      className="w-screen h-screen"
      style={{ background: 'linear-gradient(to bottom, #000C40, #F0F2F0)' }}
    >
      <iframe
        src={`${FLUTTER_WEB_URL_SCAN}`}
        className="w-full h-full"
        style={{ border: 'none' }}
        allow="camera"
      ></iframe>
    </div>
  );
}
