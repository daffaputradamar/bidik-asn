'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AdYoutubeDBType } from "@/types/adYoutube"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import Link from "next/link"

export default function YoutubeAd({ adYoutubes }: { adYoutubes: AdYoutubeDBType[] }) {

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Belajar dari Youtuber Pilihan</h2>

            <Carousel className="w-full mx-auto relative" opts={{
                align: "start",
                loop: true,
            }}>
                <CarouselContent>
                    {adYoutubes.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Link href={item.link} target="_blank" rel="noopener noreferrer">
                                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                    <img src={item.thumbnail} alt={`Youtube thumbnail ${item.description}`} className="w-full h-full object-cover" />
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                    <CarouselPrevious
                        className="relative z-10 top-5 -translate-y-1/2 left-0 bg-white border-0 hover:bg-primary bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 rounded-full pointer-events-auto"
                        icon={<CaretLeft weight="bold" />}
                    />
                    <CarouselNext
                        className="relative z-10 top-5 -translate-y-1/2 right-0 bg-white border-0 hover:bg-primary bg-opacity-50 hover:bg-opacity-75 transition-all duration-200 rounded-full pointer-events-auto"
                        icon={<CaretRight weight="bold" />}
                    />
                </div>
            </Carousel>
        </div>

    )
}