import { ImageResponse } from 'next/og';


export const runtime = 'edge';

export const alt = 'pixel-graph-react - Beautiful Pixelated Charts for React';
export const size = {
  width: 1200,
  height: 630,
};



export default async function Image() {

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Top section with title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 80px 20px 80px',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            pixel-graph-react
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '28px',
              color: '#9ca3af',
              display: 'flex',
            }}
          >
            Beautiful pixelated area charts for React
          </div>
        </div>

        {/* Demo Image */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 80px',
            flex: 1,
          }}
        >
          <img
            src="https://raw.githubusercontent.com/Atomized-titan/pixel-graph/main/.github/assets/demo.png"
            alt="Demo"
            style={{
              width: '600px',
              height: 'auto',
              borderRadius: '12px',
              border: '2px solid #333',
            }}
          />
        </div>

        {/* Bottom section with features */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 80px 40px 80px',
          }}
        >
          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#fff',
                  display: 'flex',
                }}
              />
              <span style={{ color: '#9ca3af', fontSize: '20px', display: 'flex' }}>
                Customizable
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#fff',
                  display: 'flex',
                }}
              />
              <span style={{ color: '#9ca3af', fontSize: '20px', display: 'flex' }}>
                TypeScript
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#fff',
                  display: 'flex',
                }}
              />
              <span style={{ color: '#9ca3af', fontSize: '20px', display: 'flex' }}>
                Lightweight
              </span>
            </div>
          </div>

          {/* Install command */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#1a1a1a',
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #333',
            }}
          >
            <span style={{ color: '#d1d5db', fontSize: '18px', fontFamily: 'monospace', display: 'flex' }}>
              npm install pixel-graph-react
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
