// app/(dashboard)/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome to your Dashboard!
      </h1>
      <p className="text-gray-600">
        You can start by searching for exercises or viewing your saved workout programs from the sidebar.
      </p>
      
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold text-gray-700">Next Steps</h2>
        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
          <li>Go to 'Search Exercises' to find new workouts.</li>
          <li>Visit 'My Programs' to see your saved routines.</li>
        </ul>
      </div>
    </div>
  );
}