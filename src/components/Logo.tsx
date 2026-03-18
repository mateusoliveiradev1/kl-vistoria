import type { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
    className?: string;
    variant?: "default" | "light"; // default has primary blue accents, light is all white
}

export const Logo = ({ className = "", variant = "default", ...props }: LogoProps) => {
    const accentColor = variant === "default" ? "#3B82F6" : "#FFFFFF"; // blue-500 or white
    const primaryColor = "#FFFFFF";

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 750 120"
            className={`h-10 w-auto ${className}`}
            fill="none"
            {...props}
        >
            {/* Shield / geometric mark */}
            <g transform="translate(10, 10)">
                <path
                    d="M50 0 L90 20 L90 60 C90 85 70 100 50 110 C30 100 10 85 10 60 L10 20 Z"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="6"
                    strokeLinejoin="round"
                />
                {/* Inner geometric 'K' & 'L' abstraction */}
                <path
                    d="M35 30 L35 80 M35 55 L65 30 M35 65 L65 85"
                    stroke={primaryColor}
                    strokeWidth="8"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                />
                {/* Accent line effect */}
                <line
                    x1="5"
                    y1="50"
                    x2="95"
                    y2="50"
                    stroke={accentColor}
                    strokeWidth="2"
                    opacity="0.5"
                    strokeDasharray="4 4"
                />
            </g>

            {/* Typography */}
            <g transform="translate(130, 75)">
                <text
                    fontFamily="Orbitron, sans-serif"
                    fontWeight="bold"
                    fontSize="48"
                    fill={primaryColor}
                    letterSpacing="2"
                >
                    KL
                </text>
                <text
                    x="85"
                    fontFamily="Exo 2, sans-serif"
                    fontWeight="300"
                    fontSize="42"
                    fill={primaryColor}
                    letterSpacing="4"
                >
                    VISTORIAS
                </text>
                <text
                    y="25"
                    fontFamily="Exo 2, sans-serif"
                    fontWeight="600"
                    fontSize="14"
                    fill={accentColor}
                    letterSpacing="6"
                    opacity="0.8"
                >
                    ENGENHARIA AUTOMOTIVA
                </text>
            </g>
        </svg>
    );
};

