import { MdArrowBack } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Error = () => {
	return (
		<article className="flex flex-col gap-4 py-2">
			<div className="flex">
				<NavLink to="" className="flex items-center gap-4 px-2">
					<MdArrowBack className="text-4xl" />
				</NavLink>
			</div>
			<section className="flex flex-col items-center">
				<div className="flex gap-10 text-[100px] font-thin">
					<span>4</span>
					<span>0</span>
					<span>4</span>
				</div>
				<div className="font-light sm:text-xl">The Page You Are Looking For Does Not Exist.</div>
			</section>
		</article>
	);
};
export default Error;
