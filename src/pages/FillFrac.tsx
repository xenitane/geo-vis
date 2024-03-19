import { useRef } from "react";
import { FillRenderer, cn } from "%/utils";
import { Navigate, useParams } from "react-router-dom";
import FractalForm, { formSchema } from "@/FractalForm";
import FillFractalRuleSet from "%/rules/Fill";
import SVGCanvas from "@/Drawable/SVG";

const FillFrac = () => {
    const { fracID } = useParams();
    const SVGRef = useRef<SVGSVGElement>(null);

    if (!(fracID! in FillFractalRuleSet)) return <Navigate to="/geo-vis/404" />;

    const interval: { i?: NodeJS.Timeout } = { i: undefined };

    let FractalInfo = FillFractalRuleSet[fracID!].rules();

    function SVGReset() {
        FractalInfo = FillFractalRuleSet[fracID!].rules();
        SVGRef.current!.innerHTML = "";
        clearInterval(interval.i);
        interval.i = undefined;
    }

    function handleSubmit(data: formSchema) {
        SVGReset();
        FillRenderer(SVGRef.current!, {
            ...data,
            interval,
            FractalInfo,
        });
    }

    function handleSave() {
        // console.log(SVGRef.current);
    }

    return (
        <article className={cn("flex w-full flex-col gap-8 py-2", "lg:flex-row")}>
            <div className={cn("flex w-full flex-col", "lg:w-1/3")}>
                <h3 className={cn("pb-4 text-2xl underline", "lg:text-3xl")}>{FillFractalRuleSet[fracID!].name}</h3>
                <FractalForm
                    handleSubmit={handleSubmit}
                    SVGReset={SVGReset}
                    maxOrder={FillFractalRuleSet[fracID!].maxOrder}
                    handleSave={handleSave}
                />
            </div>
            <div className={cn("flex justify-center", "lg:w-2/3")}>
                <div className={cn("aspect-square w-full rounded-xl bg-slate-200", "lg:w-[80vh]")}>
                    <SVGCanvas ref={SVGRef} />
                </div>
            </div>
        </article>
    );
};

export default FillFrac;
