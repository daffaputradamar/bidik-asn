import { auth } from "@/auth";
import AddEvent from "./components/AddEvent"
import CalendarView from "./components/CalendarView"
import { getEvents } from "@/db/queries";

export default async function Calendar() {
  const session = await auth();
  const events = await getEvents()

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold">Kalender</h1>
        {
          session?.user.role === "admin" && <AddEvent />
        }
      </div>
      <CalendarView events={events} />
    </div>
  )
}