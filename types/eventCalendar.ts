import { eventCalendar } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from 'drizzle-zod'
import { z } from "zod";

export const categoryEvent = ['Official BKN', 'Event', 'Webinar', 'TO Akbar']

const categoryColor: { [key: string]: string } = {
    'Official BKN': '#EC4899',
    'Event': '#3B82F6',       
    'Webinar': '#A855F7',     
    'TO Akbar': '#F97316'     
};

export function getCategoryColor(category: string) {
    return categoryColor[category] || '#000000'; // Fallback color
}

export const CreateEventCalendarSchema = createInsertSchema(eventCalendar, {
    description: z.string().min(1, "Description is required")
});

export type EventCalendarType = InferSelectModel<typeof eventCalendar>;
export type InsertEventCalendarType = InferInsertModel<typeof eventCalendar>;
