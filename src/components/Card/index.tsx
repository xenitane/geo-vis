import { SVGProps } from "@/types";
import { CardBack, SepLine } from "@/assets";
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
				className="absolute inset-4 rounded-2xl transition-all duration-500 ease-in-out group-hover:inset-1 group-hover:rounded-3xl"
			/>
			<div className="absolute inset-4 flex  items-center justify-center transition-all duration-500 ease-in-out group-hover:inset-1 ">
				<Image className="h-5/6 w-5/6 transition-all duration-500 ease-in-out group-hover:translate-y-[20%] group-hover:scale-[70%]" />
			</div>
			<div
				className="absolute inset-x-4 top-4 aspect-[3/1] w-[calc(100%-2rem)]  origin-top scale-y-0 text-2xl opacity-0 transition-all duration-500 ease-in-out group-hover:inset-0 group-hover:inset-x-1 group-hover:top-1 group-hover:w-[calc(100%-.5rem)]  group-hover:scale-y-100  group-hover:opacity-100"
				id="title"
			>
				<div className="flex h-1/2 w-full items-center rounded-t-2xl bg-white px-6 text-black transition-all duration-500 ease-in-out group-hover:rounded-t-3xl">
					<NavLink to={uri} className="cursor-pointer">
						{text}&nbsp;
					</NavLink>
				</div>
				<SepLine className="h-1/2" stroke="#fff" />
			</div>
		</div>
	);
};

export default Card;
