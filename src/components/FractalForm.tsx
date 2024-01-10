import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";

function schemaMaker(maxDepth: number) {
	return z.object({
		depth: z.coerce
			.number()
			.min(0, { message: "should be greater than or equal to 0" })
			.max(maxDepth, { message: `should be less than or equal to ${maxDepth}` }),
		animate: z.boolean(),
		colored: z.boolean(),
	});
}

export type formSchema = z.infer<ReturnType<typeof schemaMaker>>;

interface FormProps {
	handleSubmit: SubmitHandler<formSchema>;
	SVGReset: () => void;
	maxDepth: number;
	handleSave: () => void;
}

const FractalForm: FC<FormProps> = ({ handleSubmit, SVGReset, handleSave, maxDepth }) => {
	const schema = schemaMaker(maxDepth);
	const form = useForm<formSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			depth: 0,
			animate: false,
			colored: false,
		},
	});

	return (
		<Form {...form}>
			<form
				className="w-4/5"
				onSubmit={(evt) => void form.handleSubmit(handleSubmit)(evt)}
				onReset={() => {
					SVGReset();
					form.reset();
				}}
			>
				<div>
					<FormField
						control={form.control}
						name="depth"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between">
									<FormLabel className="w-1/3 text-lg">Depth</FormLabel>
									<FormControl className="w-11">
										<Input type="number" className="h-6" {...field} />
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
				<div className="flex w-full justify-between gap-4 pt-4">
					<Button type="submit" className="w-1/4 rounded-md">
						Draw
					</Button>
					<Button type="reset" className="w-1/4 rounded-md">
						Reset
					</Button>
					<Button type="button" onClick={handleSave} className="w-1/4 rounded-md">
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default FractalForm;
