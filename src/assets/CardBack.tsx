import { SVGProps } from "@/types";
import { FC } from "react";

interface CardBGProps extends SVGProps {
	color1: string;
	color2: string;
}

// c1 = #60f c2= #0c9
const CardBack: FC<CardBGProps> = ({ color1, color2, className }) => {
	return (
		<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" version="1.1" className={className}>
			<defs>
				<filter id="blur1" x="-10%" y="-10%" width="120%" height="120%">
					<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
					<feGaussianBlur stdDeviation="210" result="effect1_foregroundBlur"></feGaussianBlur>
				</filter>
			</defs>
			<rect width="1000" height="1000" fill={color1}></rect>
			<g filter="url(#blur1)">
				<circle cx="700" cy="27" fill={color2} r="467"></circle>
				<circle cx="227" cy="193" fill={color1} r="467"></circle>
				<circle cx="746" cy="856" fill={color2} r="467"></circle>
				<circle cx="822" cy="304" fill={color2} r="467"></circle>
				<circle cx="400" cy="409" fill={color1} r="467"></circle>
				<circle cx="294" cy="841" fill={color2} r="467"></circle>
			</g>
		</svg>
	);
};

export default CardBack;
