function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Students</h2>
          <p className="text-4xl font-bold text-blue-600">--</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Courses</h2>
          <p className="text-4xl font-bold text-green-600">--</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Active Enrollments</h2>
          <p className="text-4xl font-bold text-purple-600">--</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome</h2>
        <p className="text-gray-700">
          Welcome to CMUL Students Hub. This application helps manage student information,
          courses, and enrollments. Get started by exploring the Students and Courses sections.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
