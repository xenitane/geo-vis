import { useEffect, useRef } from "react";
import { AttractorRenderer } from "!/utils/renderer/Attractor";
import { cn } from "?/lib/utils/cn";

import AttractorForm, { formSchema } from "&/AttractorForm";
import AttractorRuleSet from "!/rules/Attractor";
import HTMLCanvas from "&/Drawable/Canvas";
import Error from "@/Error";

const AttractorVis = () => {
    const attrID = window.location.search
        .split("?")
        .at(1)
        ?.split("&")
        .filter((k) => k.startsWith("id="))
        .at(0)
        ?.split("=")
        .at(1);

    // const SVGRef = useRef<SVGSVGElement>(null);

    const CanvasRef = useRef<HTMLCanvasElement>(null);
    const formErrorRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        CanvasRef.current!.height = 2000;
        CanvasRef.current!.width = 2000;
    }, []);

    if (undefined === attrID || !(attrID in AttractorRuleSet)) {
        window.location.href = "/geo-vis/404";
        return <Error />;
    }

    const interval: { i?: NodeJS.Timeout } = { i: undefined };

    const AttractorInfo = AttractorRuleSet[attrID];

    function DrawableReset() {
        CanvasRef.current!.innerHTML = "";
        CanvasRef.current!.getContext("2d")!.clearRect(0, 0, 2000, 2000);
        clearInterval(interval.i);
        interval.i = undefined;
        if (formErrorRef.current) formErrorRef.current.innerHTML = "";
    }

    function handleSubmit({ order, /* animate */ ...data }: formSchema) {
        DrawableReset();
        try {
            AttractorRenderer(CanvasRef.current!.getContext("2d")!, {
                order,
                animate: false,
                interval,
                colored: false,
                AttractorInfo: AttractorInfo.rules(data),
            });
        } catch (e) {
            DrawableReset();
            if (formErrorRef.current)
                formErrorRef.current.innerHTML = "Some Error has occured while calculating, try with different parameters";
        }
    }

    function handleSave() {
        // console.log(SVGRef.current);
    }

    return (
        <article className={cn("flex w-full flex-col gap-8 py-2", "lg:flex-row")}>
            <div className={cn("flex w-full flex-col", "lg:w-1/3")}>
                <h3 className={cn("pb-4 text-2xl underline", "lg:text-3xl")}>{AttractorInfo.name}</h3>
                <AttractorForm
                    handleSubmit={handleSubmit}
                    DrawableReset={DrawableReset}
                    maxOrder={AttractorInfo.maxOrder}
                    handleSave={handleSave}
                    symbols={AttractorInfo.symbolNames}
                    ref={formErrorRef}
                />
            </div>
            <div className={cn("flex justify-center", "lg:w-2/3")}>
                <div className={cn("aspect-square w-full rounded-xl bg-slate-200", "lg:w-[80vh]")}>
                    <HTMLCanvas ref={CanvasRef} />
                </div>
            </div>
        </article>
    );
};

export default AttractorVis;
