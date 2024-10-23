import { DeleteAdYoutube, UpdateAdYoutube } from "@/app/(dashboard)/action/adYoutubeActions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AdYoutubeDBType, CreateAdYoutubeSchema } from "@/types/adYoutube";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, DotsThree, Pencil, Trash } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { extractYouTubeId } from "./youtube-ad-management";

export const columns: ColumnDef<AdYoutubeDBType>[] = [
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Deskripsi" className="text-base font-bold" />
            )
        },
    },
    {
        accessorKey: "link",
        header: "URL Youtube",
        cell: ({ row }) => {
            const link = row.getValue("link") as string;
            const truncatedLink = link.length > 20 ? `${link.substring(0, 50)}...` : link;

            return (
                <Link href={row.getValue("link")} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {truncatedLink}
                </Link>
            )
        }
    },
    {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <a href={row.getValue("thumbnail")} target="_blank">
                        <img
                            src={row.getValue("thumbnail")}
                            width={360}
                            alt={row.getValue("description")}
                            className="rounded object-cover aspect-video"
                        />
                    </a>
                </div>
            )
        }
    },
    
    {
        id: "actions",
        cell: ({ row }) => <RowActions adYoutube={row.original} />
    },
]

function RowActions({ adYoutube }: { adYoutube: AdYoutubeDBType }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    return (
        <>
            <DeleteAdYoutubeDialog
                open={showDeleteDialog}
                setOpen={setShowDeleteDialog}
                adYoutubeId={adYoutube.id}
            />
            <EditAdYoutubeDialog open={showUpdateDialog} setOpen={setShowUpdateDialog} adYoutube={adYoutube} />
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

function DeleteAdYoutubeDialog({ open, setOpen, adYoutubeId }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, adYoutubeId: number }) {

    const deleteMutation = useMutation({
        mutationFn: DeleteAdYoutube,
        onSuccess: async () => {
            toast.success("Product deleted successfully", {
                id: 'delete-ad-youtube',
            });

        },
        onError: () => {
            toast.error("Something went wrong", {
                id: 'delete-ad-youtube',
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
                                id: 'delete-ad-youtube',
                            });
                            deleteMutation.mutate(adYoutubeId);
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}



const EditAdYoutubeDialog = ({ open, setOpen, adYoutube }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, adYoutube: AdYoutubeDBType }) => {

    const formUpdateYoutube = useForm<AdYoutubeDBType>({
        resolver: zodResolver(CreateAdYoutubeSchema),
        defaultValues: {
            description: adYoutube.description,
            link: adYoutube.link,
            thumbnail: adYoutube.thumbnail
        },
    });

    const handleSubmit = async (values: AdYoutubeDBType) => {
        toast.loading("Updating Ad...", {
            id: "update-ad-youtube",
        });
        try {
            
            updateAdYoutube({ id: adYoutube.id, form: values })
        } catch {
            toast.error("Something went wrong", {
                id: "update-ad-youtube",
            });

            formUpdateYoutube.setError('root', {
                message: 'An error occurred during creating Ad'
            })
        }
    }


    const { mutate: updateAdYoutube, isPending: isUpdatingAd } = useMutation({
        mutationFn: UpdateAdYoutube,
        onSuccess: async (data: { success: boolean, message?: string }) => {
            if (!data.success) {
                formUpdateYoutube.setError('root', {
                    message: data.message
                });
                return;
            }
            formUpdateYoutube.reset();

            setOpen(false)

            toast.success("Ad Created successfully!", {
                id: "update-ad-youtube",
            });
        },
        onError: (_e) => {
            toast.error("Something went wrong", {
                id: "update-ad-youtube",
            });

            formUpdateYoutube.setError('root', {
                message: "An error occured during creating Ad"
            });
        },
    });

    const handleLinkChange = (link: string) => {
        const videoId = extractYouTubeId(link);
        if (videoId) {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // High-quality thumbnail
            formUpdateYoutube.setValue("thumbnail", thumbnailUrl); // Update the form field with the thumbnail
        } else {
            formUpdateYoutube.setValue("thumbnail", ""); // Clear thumbnail if not a valid YouTube link
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold">Update Ad</DialogTitle>
                </DialogHeader>
                <Form {...formUpdateYoutube}>
                    <form onSubmit={formUpdateYoutube.handleSubmit(handleSubmit)}>
                        <div className="space-y-8">

                        <FormField
                                control={formUpdateYoutube.control}
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
                                control={formUpdateYoutube.control}
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

                            {formUpdateYoutube.watch("thumbnail") && (
                                <div>
                                    <span className="text-sm mb-3 font-semibold">YouTube Thumbnail Preview</span>
                                    <img
                                        src={formUpdateYoutube.watch("thumbnail")}
                                        width={360}
                                        alt="YouTube Thumbnail"
                                        className="rounded object-cover aspect-video"
                                    />
                                </div>
                            )}
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