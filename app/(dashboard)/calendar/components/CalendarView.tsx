'use client'
import { Card, CardContent } from "@/components/ui/card"
import { addDays, addMonths, eachDayOfInterval, endOfMonth, format, isSameDay, isWithinInterval, startOfMonth } from "date-fns"
import { useState } from "react"
import EventList from "./EventList"
import { Button } from "@/components/ui/button"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

const events = [
    {
        id: 1,
        title: "Webinar TWK",
        startDate: new Date(2024, 9, 3),
        endDate: new Date(2024, 9, 3),
        time: "00:01 WIB",
        location: "56 Davion Mission Suite 157",
        color: "#a855f7"
    },
    {
        id: 2,
        title: "Pembukaan Tes SKD CPNS 2024",
        startDate: new Date(2024, 9, 16),
        endDate: new Date(2024, 9, 16),
        time: "Official BKN",
        location: "",
        color: "#ec4899"
    },
    {
        id: 3,
        title: "Tryout Akbar Gratis",
        startDate: new Date(2024, 9, 20),
        endDate: new Date(2024, 9, 22),
        time: "08:00 WIB",
        location: "Spesial FR",
        color: "#f97316"
    },
    {
        id: 4,
        title: "Flash Sale Special Day",
        startDate: new Date(2024, 9, 25),
        endDate: new Date(2024, 9, 25),
        time: "00:01 - 23:59 WIB",
        location: "Event 25 Oktober Sale",
        color: "#3b82f6"
    },
    {
        id: 5,
        title: "Flash Sale Special Day",
        startDate: new Date(2024, 8, 25),
        endDate: new Date(2024, 8, 25),
        time: "00:01 - 23:59 WIB",
        location: "Event 25 Oktober Sale",
        color: "#3b82f6"
    },
]

const weekDays = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']

export default function CalendarView() {
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
        return events.filter(event =>
            isWithinInterval(day, { start: event.startDate, end: event.endDate })
        )
    }

    const isFirstDayOfEvent = (day: Date, event: typeof events[0]) => {
        return isSameDay(day, event.startDate)
    }

    const filteredEvents = events.filter(event => {
        const eventStartMonth = event.startDate.getMonth();
        const eventStartYear = event.startDate.getFullYear();
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
                                <CaretRight weight="bold"/>
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
                                                    className={`h-5 opacity-75 ${isFirstDayOfEvent(day, event) ? 'rounded-l' : ''} ${isSameDay(day, event.endDate) ? 'rounded-r' : ''}`}
                                                    title={event.title}
                                                    style={{
                                                        backgroundColor: event.color
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