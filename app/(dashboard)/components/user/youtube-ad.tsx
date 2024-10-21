'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

export default function YoutubeAd() {
    const youtubeItems = [
        {
            image: "/placeholder.svg?height=400&width=800",
            title: "Space Iklan",
        },
        {
            image: "/placeholder.svg?height=400&width=800",
            title: "Space Iklan",
        },
        {
            image: "/placeholder.svg?height=400&width=800",
            title: "Space Iklan",
        },
        {
            image: "/placeholder.svg?height=400&width=800",
            title: "Space Iklan",
        },
        {
            image: "/placeholder.svg?height=400&width=800",
            title: "Space Iklan",
        },
    ]

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Belajar dari Youtuber Pilihan</h2>

            <Carousel className="w-full mx-auto relative" opts={{
                align: "start",
                loop: true,
            }}>
                <CarouselContent>
                    {youtubeItems.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                <img src={item.image} alt={`Youtube thumbnail ${item.title}`} className="w-full h-full object-cover" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute inset-0 flex items-center justify-between p-4">
                    <CarouselPrevious
                        className="relative top-5 -translate-y-1/2 left-0 bg-white border-0 hover:bg-primary bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 rounded-full"
                        icon={<CaretLeft weight="bold" />}
                    />
                    <CarouselNext
                        className="relative top-5 -translate-y-1/2 right-0 bg-white border-0 hover:bg-primary bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 rounded-full"
                        icon={<CaretRight weight="bold" />}
                    />
                </div>
            </Carousel>
        </div>
    )
}