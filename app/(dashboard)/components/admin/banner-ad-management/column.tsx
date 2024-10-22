import { DeleteAdBanner, UpdateAdBanner } from "@/app/(dashboard)/action/adBannerAction";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdBannerDBType, AdBannerType, UpdateAdBannerSchema } from "@/types/adBanner";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, DotsThree, Pencil, Trash } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const columns: ColumnDef<AdBannerDBType>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Judul" className="text-base font-bold" />
            )
        },
    },
    {
        accessorKey: "filePath",
        header: "Gambar",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <a href={row.getValue("filePath")} target="_blank">
                        <img
                            src={row.getValue("filePath")}
                            width={360}
                            alt={row.getValue("title")}
                            className="rounded object-cover aspect-[3/1] md:aspect-[5/1]"
                        />
                    </a>
                </div>
            )
        }
    },
    {
        accessorKey: "link",
        header: "Tautan",
        cell: ({ row }) => {
            return (
                <Link href={row.getValue("link")} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {row.getValue("link")}
                </Link>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <RowActions adBanner={row.original} />
    },
]

function RowActions({ adBanner }: { adBanner: AdBannerDBType }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    return (
        <>
            <DeleteProductDialog
                open={showDeleteDialog}
                setOpen={setShowDeleteDialog}
                adBannerId={adBanner.id}
            />
            <EditAdBannerDialog open={showUpdateDialog} setOpen={setShowUpdateDialog} adBanner={adBanner} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="none" size="sm">
                        <span className="sr-only">Open menu</span>
                        <DotsThree size={28} weight="bold" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="flex items-center gap-2 text-accent cursor-pointer"
                        onSelect={() => {
                            setShowUpdateDialog((prev) => !prev);
                        }}
                    >
                        <Pencil /> Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        className="flex items-center gap-2 text-destructive cursor-pointer hover:bg-destructive"
                        onSelect={() => {
                            setShowDeleteDialog((prev) => !prev);
                        }}
                    >
                        <Trash /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

function DeleteProductDialog({ open, setOpen, adBannerId }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, adBannerId: number }) {

    const deleteMutation = useMutation({
        mutationFn: DeleteAdBanner,
        onSuccess: async () => {
            toast.success("Product deleted successfully", {
                id: 'delete-ad-banner',
            });

        },
        onError: () => {
            toast.error("Something went wrong", {
                id: 'delete-ad-banner',
            });
        },
    });
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        product
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/70 text-white"
                        onClick={() => {
                            toast.loading("Deleting product...", {
                                id: 'delete-ad-banner',
                            });
                            deleteMutation.mutate(adBannerId);
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}



const EditAdBannerDialog = ({ open, setOpen, adBanner }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, adBanner: AdBannerDBType }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const formUpdateBanner = useForm<AdBannerType>({
        resolver: zodResolver(UpdateAdBannerSchema),
        defaultValues: {
            title: adBanner.title,
            description: adBanner.description ?? undefined,
            link: adBanner.link
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            formUpdateBanner.setValue("file", fileList[0]);
        }
        else {
            formUpdateBanner.setError("file", {
                message: "Gagal upload gambar"
            })
        }
    };

    const handleSubmit = async (values: AdBannerType) => {
        toast.loading("Updating Ad...", {
            id: "update-ad-banner",
        });
        try {
            const formData = new FormData();

            formData.append("title", values.title);
            if (values.description) {
                formData.append("description", values.description);
            }
            formData.append("link", values.link);
            formData.append("file", values.file)
            updateAdBanner({ id: adBanner.id, form: formData })
        } catch (e) {
            toast.error("Something went wrong", {
                id: "update-ad-banner",
            });

            formUpdateBanner.setError('root', {
                message: 'An error occurred during creating Ad'
            })
        }
    }


    const { mutate: updateAdBanner, isPending: isUpdatingAd } = useMutation({
        mutationFn: UpdateAdBanner,
        onSuccess: async (data: { success: boolean, message?: string }) => {
            if (!data.success) {
                formUpdateBanner.setError('root', {
                    message: data.message
                });
                return;
            }
            formUpdateBanner.reset();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';  // Reset the file input value
            }

            setOpen(false)

            toast.success("Ad Created successfully!", {
                id: "update-ad-banner",
            });
        },
        onError: (_e) => {
            toast.error("Something went wrong", {
                id: "update-ad-banner",
            });

            formUpdateBanner.setError('root', {
                message: "An error occured during creating Ad"
            });
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold">Update Ad</DialogTitle>
                </DialogHeader>
                <Form {...formUpdateBanner}>
                    <form onSubmit={formUpdateBanner.handleSubmit(handleSubmit)}>
                        <div className="space-y-8">

                            <FormField
                                control={formUpdateBanner.control}
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
                                control={formUpdateBanner.control}
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
                                control={formUpdateBanner.control}
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

                            <div>
                                <span className="text-sm mb-3 font-semibold">Preview Current File</span>
                                <img
                                    src={adBanner.filePath}
                                    width={360}
                                    alt={adBanner.fileName}
                                    className="rounded object-cover aspect-[3/1] md:aspect-[5/1]"
                                />
                            </div>
                            <FormField
                                control={formUpdateBanner.control}
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
                                <Button type="submit" variant="default" className="w-full py-5 font-bold" disabled={isUpdatingAd}>
                                    {isUpdatingAd ? <CircleNotch className="animate-spin" size={32} weight="bold" /> : "Update Iklan"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}