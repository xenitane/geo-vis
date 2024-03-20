import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Switch } from "./ui/switch";
import { FC } from "react";
import { cn } from "../lib/utils";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useComputed, useSignal } from "@preact/signals-react";

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

    const order = useSignal<number>(0);

    const canGoDown = useComputed<boolean>(() => order.value > 0);
    function goDown(evt: React.FormEvent<HTMLButtonElement>) {
        evt.preventDefault();
        order.value--;
    }
    const canGoUp = useComputed<boolean>(() => order.value < maxOrder);
    function goUp(evt: React.FormEvent<HTMLButtonElement>) {
        evt.preventDefault();
        order.value++;
    }
    return (
        <Form {...form}>
            <form
                className="w-full"
                onSubmit={(evt) => void form.handleSubmit(handleSubmit)(evt)}
                onReset={() => {
                    order.value = 0;
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
                                    <FormControl className="w-32">
                                        <div className="relative flex min-w-max items-center justify-between">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className={cn(
                                                    " h-8 w-8 rounded-full",
                                                    "transition-all duration-500 ease-in-out",
                                                    "hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
                                                    "dark:bg-neutral-700"
                                                )}
                                                disabled={!canGoDown.value}
                                                onClick={(evt) => {
                                                    goDown(evt);
                                                    form.setValue("order", order.value);
                                                }}
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                                <span className="sr-only">Previous slide</span>
                                            </Button>
                                            <Input
                                                ref={field.ref}
                                                onBlur={field.onBlur}
                                                name={field.name}
                                                value={field.value}
                                                onChange={(evt) => {
                                                    field.onChange(evt);
                                                    order.value = field.value;
                                                }}
                                                type="number"
                                                className="h-8 w-14 p-2 text-center"
                                            />
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className={cn(
                                                    " h-8 w-8 rounded-full",
                                                    "transition-all duration-500 ease-in-out",
                                                    "hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
                                                    "dark:bg-neutral-700"
                                                )}
                                                disabled={!canGoUp.value}
                                                onClick={(evt) => {
                                                    goUp(evt);
                                                    form.setValue("order", order.value);
                                                }}
                                            >
                                                <ArrowRight className="h-4 w-4" />
                                                <span className="sr-only">Previous slide</span>
                                            </Button>
                                        </div>
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
