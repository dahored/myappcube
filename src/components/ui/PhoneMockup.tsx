import Image from 'next/image';

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * SVG phone frame that masks a screenshot.
 * The frame uses an evenodd compound path so the screen area is transparent
 * and the screenshot (positioned behind) shows through.
 */
export default function PhoneMockup({
  src,
  alt,
  className = '',
  sizes = '280px',
  priority = false,
}: PhoneMockupProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: '390 / 844', borderRadius: '12.31% / 5.69%', overflow: 'hidden' }}
    >
      {/* Screenshot — fills entire area, visible only through the screen hole */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />

      {/* Phone frame SVG — sits on top, evenodd creates transparent screen hole */}
      <svg
        viewBox="0 0 390 844"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        {/*
          Compound path: outer rect (phone body) + inner rect (screen hole).
          fill-rule="evenodd" makes the overlapping inner area transparent.

          Outer: 390×844, rx=48
          Inner: x=13, y=13, w=364, h=818, rx=40
        */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="
            M48 0 H342 Q390 0 390 48 V796 Q390 844 342 844 H48 Q0 844 0 796 V48 Q0 0 48 0 Z
            M53 13 H337 Q377 13 377 53 V791 Q377 831 337 831 H53 Q13 831 13 791 V53 Q13 13 53 13 Z
          "
          fill="#18181b"
        />

        {/* Outer border ring */}
        <rect
          x="0.5" y="0.5" width="389" height="843" rx="47.5"
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
        />

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
