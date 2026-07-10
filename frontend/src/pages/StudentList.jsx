import { useState, useEffect } from 'react'

function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      // TODO: Replace with actual API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/students/`)
      // const data = await response.json()
      // setStudents(data)
      setStudents([])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-red-600 py-8">Error: {error}</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Students</h1>
      
      {students.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-600">
          No students found.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{student.student_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.user.first_name} {student.user.last_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.level}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default StudentList
