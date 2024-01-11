import { SVGProps } from "@/types";
import CardBack from "@/assets/CardBack";
import SepLine from "@/assets/SepLine";
import { NavLink } from "react-router-dom";
import { FC } from "react";

interface CardProps extends SVGProps {
	text: string;
	uri: string;
	Image: FC<SVGProps>;
}

const Card: FC<CardProps> = ({ Image, text, uri }) => {
	return (
		<div className="group relative aspect-square rounded-3xl bg-black transition-all duration-500 ease-in-out hover:drop-shadow-[0_8px_4px_rgba(0,0,0,0.15)]">
			<CardBack
				color1="#60f"
				color2="#0c9"
				className="absolute inset-1 rounded-3xl transition-all duration-500 ease-in-out"
			/>
			<div className="absolute inset-1 flex  items-center justify-center transition-all duration-500 ease-in-out">
				<Image className="h-5/6 w-5/6 translate-y-[20%] scale-[70%] transition-all duration-500 ease-in-out group-hover:translate-y-[20%] group-hover:scale-[70%] lg:translate-y-0 lg:scale-100" />
			</div>
			<div
				className="absolute inset-x-1 top-1 aspect-[3/1] w-[calc(100%-0.5rem)]  origin-top text-[1em] transition-all duration-500 ease-in-out group-hover:scale-y-100 group-hover:opacity-100 lg:scale-y-0  lg:opacity-0"
				id="title"
			>
				<div className="flex h-1/2 w-full items-center rounded-t-3xl bg-white px-6 text-black transition-all duration-500 ease-in-out">
					<NavLink to={uri}>{text}&nbsp;</NavLink>
				</div>
				<SepLine className="h-1/2" stroke="#fff" />
			</div>
		</div>
	);
};

export default Card;
