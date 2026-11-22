import React from 'react'

export default function ProductIllustration({ name, size = 120 }) {
  const key = (name || '').toLowerCase()

  if (key.includes('laptop')) {
    return (
      <svg width={size} height={size * 0.78} viewBox="0 0 180 140" fill="none" aria-hidden="true">
        <rect x="26" y="16" width="128" height="82" rx="8" fill="#111827" />
        <rect x="33" y="23" width="114" height="68" rx="4" fill="url(#laptopScreen)" />
        <circle cx="90" cy="19.5" r="1.5" fill="#4B5563" />
        <rect x="44" y="34" width="42" height="6" rx="3" fill="#ffffff" fillOpacity="0.85" />
        <rect x="44" y="46" width="68" height="4" rx="2" fill="#ffffff" fillOpacity="0.4" />
        <rect x="44" y="55" width="54" height="4" rx="2" fill="#ffffff" fillOpacity="0.4" />
        <rect x="44" y="69" width="28" height="10" rx="5" fill="#38BDF8" fillOpacity="0.9" />
        <path d="M12 100H168L160 116C158.5 119 155.5 121 152 121H28C24.5 121 21.5 119 20 116L12 100Z" fill="#D1D5DB" />
        <path d="M12 100H168V104H12V100Z" fill="#9CA3AF" />
        <rect x="72" y="106" width="36" height="8" rx="3" fill="#9CA3AF" fillOpacity="0.6" />
        <defs>
          <linearGradient id="laptopScreen" x1="33" y1="23" x2="147" y2="91" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E3A8A" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (key.includes('mouse')) {
    return (
      <svg width={size * 0.72} height={size * 0.85} viewBox="0 0 110 130" fill="none" aria-hidden="true">
        <rect x="25" y="14" width="60" height="102" rx="30" fill="#1F2937" />
        <rect x="28" y="17" width="54" height="96" rx="27" fill="url(#mouseBody)" />
        <line x1="55" y1="17" x2="55" y2="54" stroke="#4B5563" strokeWidth="1.5" />
        <line x1="28" y1="54" x2="82" y2="54" stroke="#4B5563" strokeWidth="1.5" />
        <rect x="51" y="29" width="8" height="16" rx="4" fill="#111827" />
        <rect x="53.5" y="32" width="3" height="10" rx="1.5" fill="#60A5FA" />
        <circle cx="55" cy="86" r="3" fill="#4B5563" />
        <defs>
          <linearGradient id="mouseBody" x1="28" y1="17" x2="82" y2="113" gradientUnits="userSpaceOnUse">
            <stop stopColor="#374151" />
            <stop offset="1" stopColor="#111827" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (key.includes('keyboard')) {
    return (
      <svg width={size} height={size * 0.65} viewBox="0 0 180 116" fill="none" aria-hidden="true">
        <rect x="10" y="24" width="160" height="72" rx="10" fill="#1F2937" />
        <rect x="15" y="29" width="150" height="62" rx="7" fill="#111827" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
          <rect key={`r1-${col}`} x={22 + col * 14} y="36" width="10" height="9" rx="2" fill="#E5E7EB" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
          <rect key={`r2-${col}`} x={26 + col * 14.5} y="49" width="10.5" height="9" rx="2" fill="#D1D5DB" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
          <rect key={`r3-${col}`} x={30 + col * 15} y="62" width="11" height="9" rx="2" fill="#D1D5DB" />
        ))}
        <rect x="22" y="75" width="18" height="9" rx="2" fill="#9CA3AF" />
        <rect x="44" y="75" width="84" height="9" rx="2" fill="#F3F4F6" />
        <rect x="132" y="75" width="26" height="9" rx="2" fill="#3B82F6" />
      </svg>
    )
  }

  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 180 144" fill="none" aria-hidden="true">
      <rect x="18" y="14" width="144" height="92" rx="8" fill="#111827" />
      <rect x="24" y="20" width="132" height="78" rx="4" fill="url(#monitorScreen)" />
      <circle cx="54" cy="52" r="18" fill="#60A5FA" fillOpacity="0.25" />
      <rect x="82" y="38" width="54" height="8" rx="4" fill="#ffffff" fillOpacity="0.85" />
      <rect x="82" y="52" width="44" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.45" />
      <rect x="82" y="63" width="32" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.45" />
      <rect x="80" y="106" width="20" height="18" fill="#9CA3AF" />
      <rect x="58" y="122" width="64" height="7" rx="3.5" fill="#D1D5DB" />
      <defs>
        <linearGradient id="monitorScreen" x1="24" y1="20" x2="156" y2="98" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  )
}
