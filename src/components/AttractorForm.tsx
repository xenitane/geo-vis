import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
// import { Switch } from "$/switch";
import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";

function schemaMaker(maxOrder: number, symbols: [string, number][]) {
    const zodOb: {
        [key: string]: z.ZodTypeAny;
        order: z.ZodNumber;
        // animate: z.ZodBoolean;
    } = {
        order: z.coerce
            .number()
            .min(0, { message: "should be greater than or equal to 0" })
            .max(maxOrder, { message: `should be less than or equal to ${maxOrder}` })
            .int({ message: "Must be an Integer Value" }),
        // animate: z.boolean(),
    };
    for (const sym of symbols) zodOb[sym[0]] = z.coerce.number().finite();

    return z.object(zodOb);
}

export type formSchema = Required<z.infer<ReturnType<typeof schemaMaker>>>;

interface FormProps {
    handleSubmit: SubmitHandler<formSchema>;
    DrawableReset: () => void;
    maxOrder: number;
    handleSave: () => void;
    symbols: [string, number][];
}

const AttractorForm = forwardRef<HTMLParagraphElement, FormProps>(
    ({ handleSubmit, DrawableReset, handleSave, maxOrder, symbols }, ref) => {
        const defaultValues: Required<{ [key: string]: unknown; order: number /* ; animate: boolean */ }> = {
            order: maxOrder,
            // animate: false,
        };
        for (const sym of symbols) defaultValues[sym[0]] = sym[1];
        const schema = schemaMaker(maxOrder, symbols);
        const form = useForm<formSchema>({
            resolver: zodResolver(schema),
            defaultValues,
        });

        return (
            <Form {...form}>
                <form
                    className="w-full"
                    onSubmit={(evt) => void form.handleSubmit(handleSubmit)(evt)}
                    onReset={() => {
                        DrawableReset();
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
                                        <FormLabel className={cn("w-1/3 text-base", "lg:text-lg")}>Depth</FormLabel>
                                        <FormControl className="w-11">
                                            <Input type="number" className="h-6 p-2 text-center" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormDescription>
                                        The iterative depth for the fractal
                                        <br />
                                        Must be between 0 and{` ${maxOrder}`}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {symbols.length > 0 && (
                            <>
                                <Separator className={cn("my-2 bg-neutral-950", "dark:bg-neutral-50")} />
                                <div className={cn("text-xl", "lg:text-2xl")}>Attractor Paramerters</div>
                                <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                                    {symbols.map(([sym_name]) => (
                                        <FormField
                                            key={sym_name}
                                            control={form.control}
                                            name={sym_name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center justify-between">
                                                        <FormLabel className={cn("w-1/3 text-base", "lg:text-lg")}>
                                                            {sym_name}
                                                        </FormLabel>
                                                        <FormControl className="w-2/3">
                                                            <Input type="number" className="h-6 p-2 text-center" {...field} />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm font-medium text-red-500 dark:text-red-900" ref={ref}></p>
                                <Separator className={cn("my-2 bg-neutral-950", "dark:bg-neutral-50")} />
                            </>
                        )}
                        {/* <FormField
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
						/> */}
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
    }
);

AttractorForm.displayName = "AttractorForm";

export default AttractorForm;
