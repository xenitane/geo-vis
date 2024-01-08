import FractalForm, { formSchema } from "@/components/FractalForm";
import { FillRenderer } from "@/lib/utils";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const FillFrac = () => {
	const params = useParams();

	const SVGRef = useRef<SVGSVGElement>(null);

	function SVGReset() {
		SVGRef.current!.innerHTML = "";
	}

	function handleSubmit(data: formSchema) {
		SVGReset();
		FillRenderer(SVGRef.current, { ...data, id: params.fraID });
	}

	function handleSave() {
		console.log(SVGRef.current);
	}

	return (
		<article className="flex gap-3 py-2">
			<div className="flex w-1/3 justify-center">
				<FractalForm handleSubmit={handleSubmit} SVGReset={SVGReset} maxDepth={10} handleSave={handleSave} />
			</div>
			<div className=" aspect-square w-2/3 bg-gray-300">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="-800 -800 1600 1600"
					width="100%"
					height="100%"
					xmlSpace="preserve"
					xmlnsXlink="http://wwww3.org/1999/xlink"
					ref={SVGRef}
				></svg>
			</div>
		</article>
	);
};

export default FillFrac;
