import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/toaster";
import { useRef } from "react";

import { LinearRenderer } from "@/lib/utils";
import { useParams } from "react-router-dom";

const Linear = () => {
	const params = useParams();
	const formSchema = z.object({
		depth: z.coerce
			.number()
			.min(0, { message: "should be greater than or equal to 0" })
			.max(10, { message: "should be less than or equal to 10" }),
		animate: z.boolean(),
		colored: z.boolean(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			depth: 0,
			animate: false,
			colored: false,
		},
	});

	const SVGRef = useRef<SVGSVGElement>(null);

	function onSubmit(data: z.infer<typeof formSchema>) {
		SVGRef.current!.innerHTML = "";
		LinearRenderer(SVGRef.current, { ...data, id: params.fracID });
	}

	return (
		<article className="flex gap-3 py-2">
			<div className="flex w-1/3 justify-center">
				<Form {...form}>
					<form
						className="w-4/5 space-y-8"
						onSubmit={form.handleSubmit(onSubmit)}
						onReset={() => {
							form.reset();
							SVGRef.current!.innerHTML = "";
						}}
					>
						<div>
							<FormField
								control={form.control}
								name="depth"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel className="w-1/3 text-lg">Depth</FormLabel>
											<FormControl className="w-2/3">
												<Input type="number" placeholder="Depth" className="h-6" {...field} />
											</FormControl>
										</div>
										<FormDescription>The iterative depth for the fractal</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="animate"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel className="w-1/3 text-lg">Animate</FormLabel>
											<FormControl>
												<Switch checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
										</div>
										<FormDescription>Animate the rendition</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="colored"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-row items-center justify-between">
											<FormLabel className="w-1/3 text-lg">Colored</FormLabel>
											<FormControl>
												<Switch checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
										</div>
										<FormDescription>Make it colorful</FormDescription>
									</FormItem>
								)}
							/>
						</div>
						<div className="flex w-full justify-between gap-4">
							<Button type="submit" size="lg">
								Draw
							</Button>
							<Button type="reset" size="lg">
								Reset
							</Button>
							<Button type="button" size="lg">
								Save
							</Button>
						</div>
					</form>
				</Form>
			</div>
			<div className="aspect-square w-2/3  bg-gray-300">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1600 1600"
					width="100%"
					height="100%"
					xmlSpace="preserve"
					xmlnsXlink="http://wwww3.org/1999/xlink"
					ref={SVGRef}
				></svg>
			</div>
			<Toaster />
		</article>
	);
};

export default Linear;
