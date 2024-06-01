import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { RemixFormProvider, getValidatedFormData, useRemixForm } from 'remix-hook-form';
import z from 'zod';
import { ContentRating } from "~/db/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { DatePicker } from "~/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Form, json, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { createMovie } from "~/lib/movies";

export const meta: MetaFunction = () => {
    return [
        { title: "Create Movie" },
        { name: "description", content: "Welcome to Cinemas!" },
    ];
};

const schema = z.object({
    name: z.string().max(255).min(1),
    description: z.string().max(1000),
    rating: z.nativeEnum(ContentRating),
    runtime_minutes: z.coerce.number().int().positive().optional(),
    release_date: z.coerce.date().optional(),
})

type FormData = z.infer<typeof schema>;

const resolver = zodResolver(schema);

export const action = async ({ request }: ActionFunctionArgs) => {
    const { errors, data, receivedValues: defaultValues } =
      await getValidatedFormData<FormData>(request, resolver);
    
    if (errors) {
      // The keys "errors" and "defaultValue" are picked up automatically by useRemixForm
      return json({ errors, defaultValues });
    }

    const newMovie = await createMovie(data);

    return redirect(`/admin/movies/${newMovie.id}`);
};

export default function CreateMovie() {
    const form = useRemixForm<FormData>({
        resolver
    });

    const {
        handleSubmit,
        control,
    } = form;

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <h1 className="font-bold text-lg">Create Movie</h1>
            <Form onSubmit={handleSubmit}>
                <RemixFormProvider {...form}>
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Movie name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a movie name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="release_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Release date
                                </FormLabel>
                                <FormControl>
                                    <DatePicker placeholder="Release date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Content rating
                                </FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Content rating" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={ContentRating.GENERAL}>General (G)</SelectItem>
                                            <SelectItem value={ContentRating.PARENTAL_GUIDANCE}>Parental Guidance (PG)</SelectItem>
                                            <SelectItem value={ContentRating.MATURE_AUDIENCES}>Mature (M)</SelectItem>
                                            <SelectItem value={ContentRating.MATURE_AUDIENCES_15}>Mature Accompanied 15+ (MA 15+)</SelectItem>
                                            <SelectItem value={ContentRating.RESTRICTED_18}>Restricted (R 18+)</SelectItem>
                                            <SelectItem value={ContentRating.RESTRICTED_X_18}>Restricted (X 18+)</SelectItem>
                                            <SelectItem value={ContentRating.CHECK_THE_CLASSIFICATION}>Check the Classficiation (CTC)</SelectItem>
                                            <SelectItem value={ContentRating.REFUSED_CLASSIFICATION}>Refused Classficiation (RC)</SelectItem>
                                            <SelectItem value={ContentRating.NOT_APPLICABLE}>Not Applicable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="runtime_minutes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Runtime (Minutes)
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a runtime..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter a description..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create movie</Button>
                </RemixFormProvider>
            </Form>
        </div>
    );
}
