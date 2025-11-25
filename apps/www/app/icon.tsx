import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'pixel-graph-react';
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{ width: '4px', height: '4px', backgroundColor: '#fff' }} />
            <div style={{ width: '4px', height: '4px', backgroundColor: '#999' }} />
            <div style={{ width: '4px', height: '4px', backgroundColor: '#fff' }} />
          </div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{ width: '4px', height: '4px', backgroundColor: '#666' }} />
            <div style={{ width: '4px', height: '4px', backgroundColor: '#fff' }} />
            <div style={{ width: '4px', height: '4px', backgroundColor: '#999' }} />
          </div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{ width: '4px', height: '4px', backgroundColor: '#fff' }} />
            <div style={{ width: '4px', height: '4px', backgroundColor: '#999' }} />
            <div style={{ width: '4px', height: '4px', backgroundColor: '#666' }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
