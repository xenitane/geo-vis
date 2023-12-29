import { CardBack } from "@/assets";
import { HiOutlineArrowsExpand } from "react-icons/hi";

export interface CardProps extends React.ComponentPropsWithRef<"div"> {
	text: string;
	image: JSX.Element;
}

const Card = ({ image, text }: CardProps) => {
	return (
		<div className="group grid w-full items-center rounded-3xl bg-black p-4 text-neutral-300 transition-all duration-500 ease-in-out hover:p-0 ">
			<CardBack
				color1="#60f"
				color2="#0c9"
				className="col-start-1 row-start-1 h-full w-full rounded-2xl transition-all duration-500 ease-in-out group-hover:rounded-3xl"
			/>
			<div className="relative col-start-1 row-start-1  aspect-[1/1] w-full rounded-2xl bg-cover  bg-no-repeat  text-white shadow-lg transition-all duration-500 ease-in-out  group-hover:rounded-3xl ">
				<div className=" flex w-full items-center justify-center text-nowrap ">
					<div className="inline-flex w-full  items-center justify-between bg-transparent   p-4   text-center  text-2xl text-transparent transition-all duration-500 ease-in-out group-hover:rounded-t-3xl  group-hover:bg-white group-hover:text-black group-focus:outline-none group-focus-visible:outline-white group-focus-visible:ring-white">
						<p className="font-extrabold">{text}</p>
						<div className="rounded-full p-2 hover:bg-slate-200">
							<HiOutlineArrowsExpand />
						</div>
					</div>
				</div>
				{image}
			</div>
		</div>
	);
};

export default Card;
