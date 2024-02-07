import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";
import { cn } from "@/lib/utils";

function schemaMaker(maxOrder: number) {
	return z.object({
		order: z.coerce
			.number()
			.min(0, { message: "should be greater than or equal to 0" })
			.max(maxOrder, { message: `should be less than or equal to ${maxOrder}` })
			.int({ message: "Must be an Integer Value" }),
		animate: z.boolean(),
		colored: z.boolean(),
	});
}

export type formSchema = z.infer<ReturnType<typeof schemaMaker>>;

interface FormProps {
	handleSubmit: SubmitHandler<formSchema>;
	SVGReset: () => void;
	maxOrder: number;
	handleSave: () => void;
}

const FractalForm: FC<FormProps> = ({ handleSubmit, SVGReset, handleSave, maxOrder }) => {
	const schema = schemaMaker(maxOrder);
	const form = useForm<formSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			order: 0,
			animate: false,
			colored: false,
		},
	});

	return (
		<Form {...form}>
			<form
				className="w-full"
				onSubmit={(evt) => void form.handleSubmit(handleSubmit)(evt)}
				onReset={() => {
					SVGReset();
					form.reset();
				}}
			>
				<div>
					<FormField
						control={form.control}
						name="order"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between">
									<FormLabel className={cn("w-1/3 text-base", "lg:text-lg")}>Order</FormLabel>
									<FormControl className="w-11">
										<Input type="number" className="h-6 p-2 text-center" {...field} />
									</FormControl>
								</div>
								<FormDescription>
									The iterative order for the fractal
									<br />
									Must be between 0 and{` ${maxOrder}`}
								</FormDescription>
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
									<FormLabel className={cn("w-1/3 text-base", "lg:text-lg")}>Animate</FormLabel>
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
									<FormLabel className={cn("w-1/3 text-base", "lg:text-lg")}>Colored</FormLabel>
									<FormControl>
										<Switch checked={field.value} onCheckedChange={field.onChange} disabled />
									</FormControl>
								</div>
								<FormDescription>Make it colorful</FormDescription>
							</FormItem>
						)}
					/>
				</div>
				<div className="flex w-full justify-between pt-4">
					<Button type="submit" className={cn("w-1/4 rounded-md")}>
						Draw
					</Button>
					<Button type="reset" className={cn("w-1/4 rounded-md")}>
						Reset
					</Button>
					<Button type="button" className={cn("w-1/4 rounded-md")} onClick={handleSave} disabled>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default FractalForm;
