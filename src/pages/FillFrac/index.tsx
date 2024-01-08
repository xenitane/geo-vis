import { useRef } from "react";
import { FillRenderer } from "@/lib/utils";
import { Navigate, useParams } from "react-router-dom";
import FractalForm, { formSchema } from "@/components/FractalForm";
import FillFractalRuleSet from "@/lib/rules/Fill";

const FillFrac = () => {
	const { fracID } = useParams();
	const SVGRef = useRef<SVGSVGElement>(null);

	if (!(fracID! in FillFractalRuleSet)) return <Navigate to="/geo-vis/404" />;

	function SVGReset() {
		SVGRef.current!.innerHTML = "";
	}

	function handleSubmit(data: formSchema) {
		SVGReset();
		FillRenderer(SVGRef.current!, { ...data, rules: FillFractalRuleSet[fracID!].rules });
	}

	function handleSave() {
		console.log(SVGRef.current);
	}

	return (
		<article className="flex gap-3 py-2">
			<div className="flex w-1/3 justify-center">
				<FractalForm
					handleSubmit={handleSubmit}
					SVGReset={SVGReset}
					maxDepth={FillFractalRuleSet[fracID!].maxDepth}
					handleSave={handleSave}
				/>
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
