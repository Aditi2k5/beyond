export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-30">
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <g clipPath="url(#clip0_1_2)">
            <g opacity="0.4">
              
              <path
                d="M400 800C620.914 800 800 620.914 800 400C800 179.086 620.914 0 400 0C179.086 0 0 179.086 0 400C0 620.914 179.086 800 400 800Z"
                fill="url(#paint0_radial_1_2)"
              />
            </g>
          </g>
          <defs>
            <radialGradient
              id="paint0_radial_1_2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(400 400) rotate(90) scale(400)"
            >
              <stop stopColor="#FFFACD" />
              <stop offset="1" stopColor="#FFFACD" stopOpacity="0" />
            </radialGradient>
            <clipPath id="clip0_1_2">
              <rect width="800" height="800" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  )
}

