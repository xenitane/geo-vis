import { SVGProps } from "@/@types";
import { cn } from "@/lib/utils";

const SepLine = ({ stroke, className }: SVGProps) => {
	return (
		<svg
			id="visual"
			viewBox="0 0 900 150"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			className={cn("aspect-[6/1]", className)}
			stroke={stroke}
			fill={stroke}
		>
			<path
				d="M0 0 L0 14L6 29.8C12 45.7 24 77.3 36 93.2C48 109 60 109 72 104.5C84 100 96 91 108 74.2C120 57.3 132 32.7 144 22C156 11.3 168 14.7 180 31.5C192 48.3 204 78.7 216 77.5C228 76.3 240 43.7 252 44.8C264 46 276 81 288 88.3C300 95.7 312 75.3 324 74.8C336 74.3 348 93.7 360 101C372 108.3 384 103.7 396 91.5C408 79.3 420 59.7 432 58C444 56.3 456 72.7 468 68C480 63.3 492 37.7 504 40.3C516 43 528 74 540 89.2C552 104.3 564 103.7 576 88C588 72.3 600 41.7 612 28.3C624 15 636 19 648 27.7C660 36.3 672 49.7 684 56.8C696 64 708 65 720 55.3C732 45.7 744 25.3 756 29C768 32.7 780 60.3 792 61.2C804 62 816 36 828 34.3C840 32.7 852 55.3 864 62.3C876 69.3 888 60.7 894 56.3L900 52 L900 0 Z"
				strokeWidth="4px"
				strokeLinecap="round"
				strokeLinejoin="miter"
			/>
		</svg>
	);
};

export default SepLine;
