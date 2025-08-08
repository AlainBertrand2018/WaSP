
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="https://firebasestudio-hosting.web.app/images/studioFlow_website_Image.png" alt="StudioFlow AI Icon" width="32" height="32" />
      </div>
    ),
    {
      ...size,
    }
  );
}
