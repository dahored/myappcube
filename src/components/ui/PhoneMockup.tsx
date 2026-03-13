import Image from 'next/image';

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Phone frame that wraps the screenshot with a CSS border (no fixed aspect ratio).
 * The frame adapts its height to the image so nothing gets clipped.
 */
export default function PhoneMockup({
  src,
  alt,
  className = '',
  sizes = '280px',
  priority = false,
}: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone body: background + padding acts as the device border */}
      <div
        style={{
          background: '#18181b',
          borderRadius: '12.31% / 5.69%',
          padding: '3.33%',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* Screen area: clips image to rounded screen corners */}
        <div style={{ borderRadius: '10.99% / 4.89%', overflow: 'hidden' }}>
          <Image
            src={src}
            alt={alt}
            width={1290}
            height={2796}
            style={{ display: 'block', width: '100%', height: 'auto' }}
            sizes={sizes}
            priority={priority}
          />
        </div>
      </div>

      {/* SVG overlay: dynamic island + side buttons (stretches with phone body) */}
      <svg
        viewBox="0 0 390 844"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        {/* Inner screen border */}
        <rect
          x="13.5" y="13.5" width="363" height="817" rx="39.5"
          fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"
        />
        {/* Dynamic island */}
        <rect x="145" y="20" width="100" height="24" rx="12" fill="#09090b" />
        {/* Side buttons */}
        <rect x="387" y="192" width="3" height="56" rx="1.5" fill="#27272a" />
        <rect x="0" y="172" width="3" height="36" rx="1.5" fill="#27272a" />
        <rect x="0" y="220" width="3" height="56" rx="1.5" fill="#27272a" />
      </svg>
    </div>
  );
}
