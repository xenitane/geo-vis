import { SVGProps } from "@/types";
import { FC } from "react";
interface CardBGProps extends SVGProps {
	color1: string;
	color2: string;
}

// { color1: "#FBAE3C", color2: "#00CC8E" }
const CardBack: FC<CardBGProps> = ({ color1, color2, className }) => {
	return (
		<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" version="1.1" className={className}>
			<defs>
				<filter
					id="card_back_blur"
					x="-10%"
					y="-10%"
					width="120%"
					height="120%"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
					<feGaussianBlur stdDeviation="210" result="effect1_foregroundBlur"></feGaussianBlur>
				</filter>
			</defs>
			<rect width="1000" height="1000" fill={color1}></rect>
			<g filter="url(#card_back_blur)">
				<circle cx="163" cy="730" fill={color2} r="467"></circle>
				<circle cx="26" cy="922" fill={color1} r="467"></circle>
				<circle cx="243" cy="260" fill={color2} r="467"></circle>
				<circle cx="522" cy="354" fill={color2} r="467"></circle>
				<circle cx="309" cy="539" fill={color1} r="467"></circle>
				<circle cx="263" cy="17" fill={color2} r="467"></circle>
			</g>
		</svg>
	);
};

export default CardBack;
