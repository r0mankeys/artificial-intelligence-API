/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
	extend: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
			darkNav: `hsl(0, 0%, 17.6%)`,
			darkBox: `hsl(0, 0%, 9.3%)`,
			lightBox: `hsl(0, 0%, 95%)`,
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		fontFamily: {
			special: ["Hanken Grotesk", "sans-serif"]
		},
		spacing: {
			readable: '60ch',
			gutter: `80%`,
			half: '50%',
			halfWithPadding: `calc(50% - 1rem)`,
		},
		zIndex: {
			front: `999`
		},
		scale: {
			'101': '1.01'
		},
		brightness: {
			'102': '1.02'
		}
	}
  },
  plugins: [require("tailwindcss-animate")],
}
