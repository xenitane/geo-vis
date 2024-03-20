import { useEffect } from "react";

const ScrollToTop = () => {
    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);
    return null;
};

export default ScrollToTop;
