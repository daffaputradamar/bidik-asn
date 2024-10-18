import CalendarView from "./components/CalendarView"

export default function Calendar() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Kalender</h1>
        <CalendarView />
      </div>
    )
}