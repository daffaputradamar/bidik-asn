import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export default function EventList({ events }: {
    events: {
        id: number;
        title: string;
        startDate: Date;
        endDate: Date;
        time: string;
        location: string;
        color: string;
    }[]
}) {
    return (
        <Card className="bg-white shadow-sm overflow-y-auto">
            <CardContent className="p-4 flex flex-col gap-y-6">
                {
                    events.map((event, i) => (
                        <div key={event.id}>
                            <div className="flex gap-4 p-5">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`} style={{ backgroundColor: event.color}}>
                                    {format(event.startDate, 'd')}
                                </div>
                                <div>
                                    <h3 className="font-semibold" style={{
                                        color: event.color
                                    }}>{event.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {format(event.startDate, 'dd MMM')} - {format(event.endDate, 'dd MMM')}
                                    </p>
                                    <p className="text-sm text-gray-500">{event.time}</p>
                                    {event.location && <p className="text-sm text-gray-500">{event.location}</p>}
                                </div>
                            </div>
                            {i !== events.length - 1 && <hr />}
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    )
}