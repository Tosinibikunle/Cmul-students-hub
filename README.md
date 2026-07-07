# CMUL Students Hub

A full-stack web application for managing students at CMUL using ReactJS frontend, Django/DRF backend, and Docker containerization.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Django 4.2, Django REST Framework
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **API**: RESTful API with DRF

## Project Structure

```
Cmul-students-hub/
├── frontend/              # React application
├── backend/              # Django application
├── docker-compose.yml    # Multi-container setup
├── Dockerfile            # Backend container
└── README.md            # This file
```

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.10+ (for local backend development)

### Using Docker

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

### Local Development

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## API Documentation

DRF provides automatic API documentation at:
- Swagger UI: http://localhost:8000/api/docs/
- ReDoc: http://localhost:8000/api/redoc/

## Contributing

See CONTRIBUTING.md for guidelines.
