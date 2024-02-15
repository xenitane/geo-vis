import { forwardRef } from "react";

const HTMLCanvas = forwardRef<HTMLCanvasElement>((_, ref) => {
	return <canvas style={{ height: "100%", width: "100%" }} ref={ref}></canvas>;
});

HTMLCanvas.displayName = "HTMLCanvas";

export default HTMLCanvas;
