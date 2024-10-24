'use client'
import { Card, CardContent } from "@/components/ui/card"
import { addDays, addMonths, eachDayOfInterval, endOfMonth, format, isSameDay, isWithinInterval, startOfMonth } from "date-fns"
import { useState } from "react"
import EventList from "./EventList"
import { Button } from "@/components/ui/button"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { EventCalendarType } from "@/types/eventCalendar"

const weekDays = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']

const _events: EventCalendarType[] = [
    {
        id: 1,
        title: "Webinar TWK",
        dtfrom: new Date(2024, 9, 3),
        dtto: new Date(2024, 9, 3),
        eventCategory: "Webinar",
        description: "56 Davion Mission Suite 157",
        eventCategoryColor: "#a855f7",
        createdAt: new Date()
    },
    {
        id: 1,
        title: "BKN",
        dtfrom: new Date(2024, 9, 5),
        dtto: new Date(2024, 9, 10),
        eventCategory: "Official BKN",
        description: "56 Davion Mission Suite 157",
        eventCategoryColor: "#a855f7",
        createdAt: new Date()
    },
]

export default function CalendarView({ events }: { events: EventCalendarType[] }) {
    const currentDate = new Date()
    const [currentMonth, setCurrentMonth] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    })

    const startingDayIndex = startOfMonth(currentMonth).getDay()

    const prevMonthDays = Array(startingDayIndex).fill(null).map((_, index) => {
        return addDays(startOfMonth(currentMonth), index - startingDayIndex)
    })

    const nextMonthDays = Array(42 - daysInMonth.length - startingDayIndex).fill(null).map((_, index) => {
        return addDays(endOfMonth(currentMonth), index + 1)
    })

    const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays]

    const getEventsForDay = (day: Date) => {
        return events.filter(event => {
            return isWithinInterval(day, { start: event.dtfrom, end: event.dtto })
        })
    }

    const isFirstDayOfEvent = (day: Date, event: EventCalendarType) => {
        return isSameDay(day, event.dtfrom)
    }

    const filteredEvents = events.filter(event => {
        const eventStartMonth = event.dtfrom.getMonth();
        const eventStartYear = event.dtfrom.getFullYear();
        const currentMonthValue = currentMonth.getMonth();
        const currentYearValue = currentMonth.getFullYear();

        return eventStartMonth === currentMonthValue && eventStartYear === currentYearValue;
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4 order-2 md:order-1">
                <EventList events={filteredEvents} />
            </div>
            <div className="lg:col-span-3 order-1 md:order-2">
                <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <Button variant={'ghost'} onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
                                <CaretLeft weight="bold" />
                            </Button>
                            <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM') + " " + format(currentMonth, 'yyyy')}</h2>
                            <Button variant={'ghost'} onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                                <CaretRight weight="bold" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-7 gap-px bg-gray-200">
                            {weekDays.map((day) => (
                                <div key={day} className="p-2 text-center font-semibold bg-gray-100">
                                    {day}
                                </div>
                            ))}
                            {allDays.map((day, index) => {
                                const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
                                const isToday = isSameDay(day, new Date())
                                const eventsForDay = getEventsForDay(day)
                                
                                return (
                                    <div
                                        key={index}
                                        className={`p-2 h-24 bg-white relative ${!isCurrentMonth ? 'text-gray-300' : ''} ${isToday ? 'font-extrabold' : ''}`}
                                    >
                                        <span className="absolute top-2 left-2">{format(day, 'd')}</span>
                                        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1">
                                            {eventsForDay.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className={`h-5 opacity-75 ${isFirstDayOfEvent(day, event) ? 'rounded-l' : ''} ${isSameDay(day, event.dtto) ? 'rounded-r' : ''}`}
                                                    title={event.title}
                                                    style={{
                                                        backgroundColor: event.eventCategoryColor
                                                    }}
                                                >
                                                    {isFirstDayOfEvent(day, event) && (
                                                        <span className="text-xs text-white pl-1 truncate">{event.title}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}