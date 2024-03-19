import { SVGProps } from "?";
import cardBack from "#/card-back.svg";
import SepLine from "#/SepLine";
import { NavLink } from "react-router-dom";
import { FC } from "react";
import { cn } from "%/utils";
import { HiOutlineArrowsExpand } from "react-icons/hi";

interface CardProps extends SVGProps {
    text: string;
    uri: string;
    image: string;
}

const Card: FC<CardProps> = ({ image, text, uri }) => {
    return (
        <div
            className={cn(
                "group relative aspect-square rounded-3xl bg-neutral-950  transition-all duration-500 ease-in-out",
                "hover:drop-shadow-[0_8px_4px_rgba(0,0,0,0.15)]",
                "dark:bg-neutral-50 dark:hover:drop-shadow-[0_8px_4px_rgba(250,250,250,0.15)]"
            )}
        >
            <img src={cardBack} className="absolute inset-1 rounded-3xl" />
            <div className="absolute inset-1 flex items-center justify-center transition-all duration-500 ease-in-out">
                <img
                    src={image}
                    alt=""
                    className={cn(
                        "h-5/6 w-5/6 translate-y-0 scale-100 transition-all duration-500 ease-in-out",
                        "group-hover:translate-y-[20%] group-hover:scale-[70%]"
                    )}
                />
            </div>
            <div
                className={cn(
                    "absolute inset-x-1 top-1 aspect-[3/1] w-[calc(100%-0.5rem)]  origin-top scale-y-0 text-[1em] opacity-0 transition-all duration-500 ease-in-out",
                    "group-hover:scale-y-100  group-hover:opacity-100"
                )}
                id="title"
            >
                <span
                    className={cn(
                        "flex h-2/3 w-full items-center rounded-t-3xl bg-white px-6 transition-all duration-500 ease-in-out",
                        "dark:bg-neutral-900"
                    )}
                >
                    <NavLink to={uri} className="flex items-center gap-1">
                        {text}
                        <HiOutlineArrowsExpand />
                    </NavLink>
                </span>
                <SepLine className={cn("h-1/3 origin-left scale-x-150 text-white", "dark:text-neutral-900")} />
            </div>
        </div>
    );
};

export default Card;
