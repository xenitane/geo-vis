import { MdArrowBack } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Error = () => {
	return (
		<>
			<div className="flex">
				<NavLink to="/fractals" className="flex cursor-pointer items-center gap-4 px-2 text-[24px]">
					<MdArrowBack className="!text-[40px]" />
				</NavLink>
			</div>
			<section className="flex flex-col items-center">
				<div className="flex gap-16 text-[160px] font-thin">
					<span>4</span>
					<span>0</span>
					<span>4</span>
				</div>
				<div className="text-4xl font-light">This is not the web page you are looking for.</div>
			</section>
		</>
	);
};
export default Error;
