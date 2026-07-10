import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CMUL Students Hub
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/students" className="text-gray-700 hover:text-blue-600">
              Students
            </Link>
          </li>
          <li>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
