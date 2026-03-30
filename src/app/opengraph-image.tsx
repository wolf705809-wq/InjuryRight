import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'WorkerRight — Workers Comp Settlement Calculator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ width: '8px', height: '48px', background: '#059669', borderRadius: '4px' }} />
          <span style={{ fontSize: '48px', fontWeight: 700, color: '#111827', letterSpacing: '-2px' }}>
            WorkerRight
          </span>
        </div>
        <div style={{ width: '60px', height: '4px', background: '#059669', borderRadius: '2px', marginBottom: '32px' }} />
        <p style={{ fontSize: '28px', color: '#374151', textAlign: 'center', maxWidth: '800px', lineHeight: 1.4, fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
          Free Workers' Comp Settlement Calculator — All 47 States
        </p>
        <p style={{ fontSize: '18px', color: '#6b7280', marginTop: '20px', fontFamily: 'system-ui, sans-serif' }}>
          getfairclaimpro.com
        </p>
      </div>
    ),
    { ...size }
  )
}
