'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CalendarBlank, CircleNotch, Plus } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { categoryEvent, CreateEventCalendarSchema, getCategoryColor, InsertEventCalendarType } from "@/types/eventCalendar";
import { CreateEvent } from "../../action/eventAction";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import RichTextEditorV2 from "@/components/ui/rich-text-v2";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";

export default function AddEvent() {
    const [isShownCreateDialog, setIsShownCreateDialog] = useState(false);

    const formEvent = useForm<InsertEventCalendarType>({
        resolver: zodResolver(CreateEventCalendarSchema),
        defaultValues: {
            title: "",
            dtfrom: undefined,
            dtto: undefined,
            description: ""
        },
    });

    const handleSubmit = async (values: InsertEventCalendarType) => {
        toast.loading("Creating Event...", {
            id: "create-event",
        });
        try {
            const _values: InsertEventCalendarType = {
                ...values
            }
            createEvent(_values)
        } catch {
            toast.error("Something went wrong", {
                id: "create-event",
            });

            formEvent.setError('root', {
                message: 'An error occurred during creating Ad'
            })
        }
    }

    const { mutate: createEvent, isPending: isCreatingEvent } = useMutation({
        mutationFn: CreateEvent,
        onSuccess: async (data: { success: boolean, message?: string }) => {
            if (!data.success) {
                formEvent.setError('root', {
                    message: data.message
                });
                return;
            }

            formEvent.reset();
            setIsShownCreateDialog(false)

            toast.success("Event Created successfully!", {
                id: "create-event",
            });
        },
        onError: (_e) => {
            toast.error("Something went wrong", {
                id: "create-event",
            });

            formEvent.setError('root', {
                message: "An error occured during creating Event"
            });
        },
    });

    const handleChangeCategory = (category: string) => {
        formEvent.setValue("eventCategoryColor", getCategoryColor(category));
    }

    return (
        <Collapsible
            open={isShownCreateDialog}
            onOpenChange={setIsShownCreateDialog}
            className="space-y-2"
        >
            <CollapsibleTrigger asChild>
                <Button size={"lg"} className="font-semibold">
                    <Plus size={18} weight="bold" className="mr-2" />
                    Create New Event
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
                <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                        <h1 className="font-bold">Create New Event</h1>
                        <Form {...formEvent}>
                            <form onSubmit={formEvent.handleSubmit(handleSubmit)}>
                                <div className="space-y-8">

                                    <FormField
                                        control={formEvent.control}
                                        name="title"
                                        render={({ field }) =>
                                            <FormItem>
                                                <FormLabel>Judul Event</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Judul Event..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        }
                                    />

                                    <FormField
                                        control={formEvent.control}
                                        name="eventCategory"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Kategori Event</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(e) => {
                                                        field.onChange(e);
                                                        handleChangeCategory(e)
                                                    }} defaultValue={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Pilih Kategori" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categoryEvent.map((category) => (
                                                                <SelectItem key={category} value={category}>
                                                                    {category}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex flex-col md:flex-row gap-x-4 items-center">
                                        <FormField
                                            control={formEvent.control}
                                            name="dtfrom"
                                            render={({ field }) =>
                                                <FormItem className="flex flex-col flex-1">
                                                    <FormLabel>Tanggal Mulai</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-100 pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarBlank className="ml-auto opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={(value) => {
                                                                    if (!value) return;
                                                                    field.onChange(value);
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            }
                                        />

                                        <FormField
                                            control={formEvent.control}
                                            name="dtto"
                                            render={({ field }) =>
                                                <FormItem className="flex flex-col flex-1">
                                                    <FormLabel>Tanggal Berakhir</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-100 pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarBlank className="ml-auto opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={(value) => {
                                                                    if (!value) return;
                                                                    field.onChange(value);
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            }
                                        />
                                    </div>

                                    {/* <FormField
                                        control={formEvent.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <RictTextEditor
                                                        placeholder="Description"
                                                        onChange={(value) => {
                                                            field.onChange(value);
                                                        }}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}

                                    <FormField
                                        control={formEvent.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <RichTextEditorV2 placeholder="Description..." content={field.value} onChange={(data) => {
                                                        field.onChange(data);
                                                    }} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <FormRootError />
                                    <div className="text-center px-10">
                                        <Button type="submit" variant="default" className="w-full py-5 font-bold" disabled={isCreatingEvent}>
                                            {isCreatingEvent ? <CircleNotch className="animate-spin" size={32} weight="bold" /> : "Buat Event"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>


            </CollapsibleContent>
        </Collapsible>
    )
}