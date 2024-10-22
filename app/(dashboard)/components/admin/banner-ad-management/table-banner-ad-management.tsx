'use client'

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./column"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdBannerDBType, CreateAdBannerSchema, AdBannerType } from "@/types/adBanner"
import { useMutation } from "@tanstack/react-query"
import { CreateAdBanner } from "@/app/(dashboard)/action/adBannerAction"
import { Textarea } from "@/components/ui/textarea"
import { CircleNotch, Plus } from "@phosphor-icons/react"
import { toast } from "sonner"
import { useRef, useState } from "react"

export default function BannerAdManagement({ adBanners: bannerAds }: { adBanners: AdBannerDBType[] }) {

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
                <CardTitle className="text-2xl font-bold">
                    Ad Banner Management
                </CardTitle>
                <AddAdBannerDialog />
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={bannerAds} />
            </CardContent>
        </Card>
    )
}

const AddAdBannerDialog = () => {

    const [isShownCreateDialog, setIsShownCreateDialog] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formAdBanner = useForm<AdBannerType>({
        resolver: zodResolver(CreateAdBannerSchema),
        defaultValues: {
            title: "",
            description: "",
            link: "",
            file: undefined,
        },
    });

    const handleSubmit = async (values: AdBannerType) => {
        toast.loading("Creating Ad...", {
            id: "create-ad-banner",
        });
        try {
            const formData = new FormData();

            formData.append("title", values.title);
            if (values.description) {
                formData.append("description", values.description);
            }
            formData.append("link", values.link);
            formData.append("file", values.file)
            createAdBanner(formData)
        } catch {
            toast.error("Something went wrong", {
                id: "create-ad-banner",
            });

            formAdBanner.setError('root', {
                message: 'An error occurred during creating Ad'
            })
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            formAdBanner.setValue("file", fileList[0]);
        }
        else {
            formAdBanner.setError("file", {
                message: "Gagal upload gambar"
            })
        }
    };

    const { mutate: createAdBanner, isPending: isCreatingAd } = useMutation({
        mutationFn: CreateAdBanner,
        onSuccess: async (data: { success: boolean, message?: string }) => {
            if (!data.success) {
                formAdBanner.setError('root', {
                    message: data.message
                });
                return;
            }
            formAdBanner.reset();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';  // Reset the file input value
            }

            setIsShownCreateDialog(false)

            toast.success("Ad Created successfully!", {
                id: "create-ad-banner",
            });
        },
        onError: (_e) => {
            toast.error("Something went wrong", {
                id: "create-ad-banner",
            });

            formAdBanner.setError('root', {
                message: "An error occured during creating Ad"
            });
        },
    });

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
            <Form {...formAdBanner}>
                <form onSubmit={formAdBanner.handleSubmit(handleSubmit)}>
                    <div className="space-y-8">

                        <FormField
                            control={formAdBanner.control}
                            name="title"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Judul Iklan</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Judul iklan..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />

                        <FormField
                            control={formAdBanner.control}
                            name="description"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Deskripsi Iklan</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Judul iklan..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />

                        <FormField
                            control={formAdBanner.control}
                            name="link"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Tautan Iklan</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="URL Iklan..." {...field} type="url" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />

                        <FormField
                            control={formAdBanner.control}
                            name="file"
                            render={({ }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            id="file"
                                            name="file"
                                            ref={fileInputRef}
                                            required
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a file to upload (max 1MB).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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