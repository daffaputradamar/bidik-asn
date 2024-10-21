'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import Autoplay from "embla-carousel-autoplay"

export default function BannerCarouselAd() {
    const bannerItems = [
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
        <Carousel className="w-full mx-auto relative" opts={{
            align: "start",
            loop: true,
        }} plugins={[
            Autoplay({
                delay: 5000
            })
        ]}>
            <CarouselContent>
                {bannerItems.map((item, index) => (
                    <CarouselItem key={index}>
                        <Card className="border-0 rounded-xl">
                            <CardContent className="p-0 relative aspect-[3/1] md:aspect-[5/1]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10 flex flex-col justify-center items-center text-white rounded-xl">
                                    <h2 className="text-4xl font-bold mb-2">{item.title}</h2>
                                </div>
                            </CardContent>
                        </Card>
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
    )
}