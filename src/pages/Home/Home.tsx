import Card from "@/components/Card";
import { cn, toTitleCase } from "@/lib/utils";

const fractaldata: { type: string; list: string[] }[] = [
	{
		type: "linear",
		list: ["levy c curve", "dragon curve"],
	},
	{
		type: "fill",
		list: ["aa", "bb", "cc", "dd", "ee"],
	},
	{
		type: "att",
		list: ["aa", "bb", "cc", "dd", "ee", "ff", "gg"],
	},
];

const Home = ({ className, ...props }: React.ComponentPropsWithRef<"div">) => {
	return (
		<div className={cn(className)} {...props}>
			<h2 className="text-4xl">What would you like to draw?</h2>
			<article>
				<div className="my-8 flex flex-col gap-8">
					{fractaldata.map(({ type, list }) => {
						return (
							<section key={type}>
								<h3 className="text-3xl">{toTitleCase(type)}</h3>
								<hr className="my-8 h-1  bg-neutral-800 from-neutral-800" />
								<div className=" flex flex-col gap-8 md:grid md:grid-cols-5">
									{list.map((li) => (
										<Card key={li} image={<>{li}</>} text={li} />
									))}
								</div>
							</section>
						);
					})}
				</div>
			</article>
		</div>
	);
};
export default Home;
