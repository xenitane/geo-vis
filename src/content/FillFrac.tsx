import { useRef } from "react";
import { FillRenderer, cn } from "../lib/utils";
import FractalForm, { formSchema } from "../components/FractalForm";
import FillFractalRuleSet from "../lib/rules/Fill";
import SVGCanvas from "../components/Drawable/SVG";
import Error from "./Error";

const FillFrac = () => {
    const fracID = window.location.search
        .split("?")
        .at(1)
        ?.split("&")
        .filter((k) => k.startsWith("id="))
        .at(0)
        ?.split("=")
        .at(1);

    const SVGRef = useRef<SVGSVGElement>(null);

    if (undefined === fracID || !(fracID in FillFractalRuleSet)) {
        console.log("wtf");
        window.location.href = "/geo-vis/404";
        return <Error />;
    }

    const interval: { i?: NodeJS.Timeout } = { i: undefined };

    const FractalInfo = FillFractalRuleSet[fracID];

    function SVGReset() {
        SVGRef.current!.innerHTML = "";
        clearInterval(interval.i);
        interval.i = undefined;
    }

    function handleSubmit(data: formSchema) {
        SVGReset();
        FillRenderer(SVGRef.current!, {
            ...data,
            interval,
            FractalInfo: FractalInfo.rules(),
        });
    }

    function handleSave() {
        // console.log(SVGRef.current);
    }

    return (
        <article className={cn("flex w-full flex-col gap-8 py-2", "lg:flex-row")}>
            <div className={cn("flex w-full flex-col", "lg:w-1/3")}>
                <h3 className={cn("pb-4 text-2xl underline", "lg:text-3xl")}>{FractalInfo.name}</h3>
                <FractalForm
                    handleSubmit={handleSubmit}
                    SVGReset={SVGReset}
                    maxOrder={FractalInfo.maxOrder}
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
