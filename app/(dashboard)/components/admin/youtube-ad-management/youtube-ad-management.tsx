'use client'

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./column"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { CircleNotch, Plus } from "@phosphor-icons/react"
import { toast } from "sonner"
import { AdYoutubeDBType, CreateAdYoutubeSchema } from "@/types/adYoutube"
import { CreateAdYoutube } from "@/app/(dashboard)/action/adYoutubeActions"
import { useState } from "react"

export const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export default function YoutubeAdManagement({ adYoutubes }: { adYoutubes: AdYoutubeDBType[] }) {

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
                <CardTitle className="text-2xl font-bold">
                    Ad Youtube Management
                </CardTitle>
                <AddAdBannerDialog />
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={adYoutubes} />
            </CardContent>
        </Card>
    )
}

const AddAdBannerDialog = () => {

    const [isShownCreateDialog, setIsShownCreateDialog] = useState(false);

    const formAdYoutube = useForm<AdYoutubeDBType>({
        resolver: zodResolver(CreateAdYoutubeSchema),
        defaultValues: {
            description: "",
            link: "",
            thumbnail: ""
        },
    });

    const handleSubmit = async (values: AdYoutubeDBType) => {
        toast.loading("Creating Ad...", {
            id: "create-ad-youtube",
        });
        try {
            createAdYoutube(values)
        } catch {
            toast.error("Something went wrong", {
                id: "create-ad-youtube",
            });

            formAdYoutube.setError('root', {
                message: 'An error occurred during creating Ad'
            })
        }
    }

    const { mutate: createAdYoutube, isPending: isCreatingAd } = useMutation({
        mutationFn: CreateAdYoutube,
        onSuccess: async (data: { success: boolean, message?: string }) => {
            if (!data.success) {
                formAdYoutube.setError('root', {
                    message: data.message
                });
                return;
            }

            formAdYoutube.reset();
            setIsShownCreateDialog(false)

            toast.success("Ad Created successfully!", {
                id: "create-ad-youtube",
            });
        },
        onError: (_e) => {
            toast.error("Something went wrong", {
                id: "create-ad-youtube",
            });

            formAdYoutube.setError('root', {
                message: "An error occured during creating Ad"
            });
        },
    });

    const handleLinkChange = (link: string) => {
        const videoId = extractYouTubeId(link);
        if (videoId) {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // High-quality thumbnail
            formAdYoutube.setValue("thumbnail", thumbnailUrl); // Update the form field with the thumbnail
        } else {
            formAdYoutube.setValue("thumbnail", ""); // Clear thumbnail if not a valid YouTube link
        }
    }

    return (
        <Dialog open={isShownCreateDialog} onOpenChange={setIsShownCreateDialog}>
            <DialogTrigger asChild>
                <Button size={"lg"} className="ml-4 font-semibold">
                    <Plus size={18} weight="bold" className="mr-2" />
                    Create New Ad
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold">Create New Ad</DialogTitle>
                </DialogHeader>
                <Form {...formAdYoutube}>
                    <form onSubmit={formAdYoutube.handleSubmit(handleSubmit)}>
                        <div className="space-y-8">

                            <FormField
                                control={formAdYoutube.control}
                                name="description"
                                render={({ field }) =>
                                    <FormItem>
                                        <FormLabel>Deskripsi Iklan</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Deskripsi iklan..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }
                            />

                            <FormField
                                control={formAdYoutube.control}
                                name="link"
                                render={({ field }) =>
                                    <FormItem>
                                        <FormLabel>Tautan Iklan</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="URL Iklan..." {...field} type="url" onChange={(e) => {
                                                    field.onChange(e); // Update the form field value
                                                    handleLinkChange(e.target.value); // Extract and set the thumbnail
                                                }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }
                            />

                            {formAdYoutube.watch("thumbnail") && (
                                <div>
                                    <span className="text-sm mb-3 font-semibold">YouTube Thumbnail Preview</span>
                                    <img
                                        src={formAdYoutube.watch("thumbnail")}
                                        width={360}
                                        alt="YouTube Thumbnail"
                                        className="rounded object-cover aspect-video"
                                    />
                                </div>
                            )}

                            <FormRootError />
                            <div className="text-center px-10">
                                <Button type="submit" variant="default" className="w-full py-5 font-bold" disabled={isCreatingAd}>
                                    {isCreatingAd ? <CircleNotch className="animate-spin" size={32} weight="bold" /> : "Buat Iklan"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}