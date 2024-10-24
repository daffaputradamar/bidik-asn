import { Card, CardContent } from "@/components/ui/card";
import { EventCalendarType } from "@/types/eventCalendar";
import { format } from "date-fns";

export default function EventList({ events }: {
    events: EventCalendarType[]
}) {
    return (
        <Card className="bg-white shadow-sm overflow-y-auto">
            <CardContent className="p-4 flex flex-col gap-y-6">
                {(!events || events.length == 0) && (
                    <div className="text-center text-muted-foreground">
                        Tidak ada event
                    </div>
                )}
                {
                    (events && events.length > 0) && events.map((event, i) => (
                        <div key={event.id}>
                            <div className="flex gap-4 p-5">
                                <div className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white font-bold text-lg`} style={{ backgroundColor: event.eventCategoryColor}}>
                                    {format(event.dtfrom, 'd')}
                                </div>
                                <div>
                                    <h3 className="font-semibold" style={{
                                        color: event.eventCategoryColor
                                    }}>{event.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {format(event.dtfrom, 'dd MMM')} - {format(event.dtto, 'dd MMM')}
                                    </p>
                                    <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: event.description}}></div>
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