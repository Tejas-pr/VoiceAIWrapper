# VoiceAIWrapper

A modern full-stack project management application with a React + TypeScript frontend and Django GraphQL backend.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Starting the Application](#starting-the-application)
- [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Apollo Client** - GraphQL client
- **GraphQL** - API query language

### Backend
- **Django 6.0.1** - Web framework
- **Graphene-Django** - GraphQL integration
- **PostgreSQL** - Database

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.12 or higher) - [Download](https://www.python.org/downloads/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Package managers
- **pip** - Python package manager
- **Git** - Version control

**Optional (for Docker setup):**
- **Docker** - [Download](https://www.docker.com/get-started)
- **Docker Compose** - Usually included with Docker Desktop

## 🚀 Local Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd VoiceAIWrapper
```

### Step 2: Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Create a virtual environment:**
   ```bash
   # On macOS/Linux
   python3 -m venv venv
   
   # On Windows
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```bash
   # On macOS/Linux
   source venv/bin/activate
   
   # On Windows
   venv\Scripts\activate
   ```

4. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up the database:**
   
   **Option A: Using PostgreSQL (Recommended)**
   
   Create a PostgreSQL database:
   ```sql
   CREATE DATABASE voiceai_db;
   CREATE USER voiceai_user WITH PASSWORD 'voiceai_pass';
   GRANT ALL PRIVILEGES ON DATABASE voiceai_db TO voiceai_user;
   ```
   
   Update `server/backend/settings.py` with your database credentials:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'voiceai_db',
           'USER': 'voiceai_user',
           'PASSWORD': 'voiceai_pass',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```
   
   **Option B: Using SQLite (Default - No setup needed)**
   
   The project is configured to use SQLite by default for development. No additional setup required.

6. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

7. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

### Step 3: Frontend Setup

1. **Navigate to the client directory:**
   ```bash
   cd ../client
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

## ▶️ Starting the Application

### Start Backend Server

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Activate virtual environment (if not already activated):**
   ```bash
   # On macOS/Linux
   source venv/bin/activate
   
   # On Windows
   venv\Scripts\activate
   ```

3. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```

   The backend will be available at: **http://localhost:8000**
   
   GraphQL endpoint: **http://localhost:8000/graphql/**

### Start Frontend Server

1. **Open a new terminal and navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at: **http://localhost:5173**

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **GraphQL Playground**: http://localhost:8000/graphql/

## 🐳 Docker Setup

### Quick Start with Docker Compose

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode (background):**
   ```bash
   docker-compose up -d --build
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop all services:**
   ```bash
   docker-compose down
   ```

5. **Stop and remove volumes (clears database):**
   ```bash
   docker-compose down -v
   ```

### Docker Services

- **Client (Frontend)**: http://localhost:3000
- **Server (Backend API)**: http://localhost:8000
- **Database (PostgreSQL)**: localhost:5432

### Individual Docker Builds

**Build and run client:**
```bash
cd client
docker build -t voiceai-client .
docker run -p 3000:80 voiceai-client
```

**Build and run server:**
```bash
cd server
docker build -t voiceai-server .
docker run -p 8000:8000 \
  -e DATABASE_HOST=your_db_host \
  -e DATABASE_NAME=voiceai_db \
  -e DATABASE_USER=voiceai_user \
  -e DATABASE_PASSWORD=voiceai_pass \
  voiceai-server
```

### Docker Environment Variables

**Server Environment Variables:**
- `DATABASE_HOST`: Database host (default: `localhost`)
- `DATABASE_PORT`: Database port (default: `5432`)
- `DATABASE_NAME`: Database name (default: `voiceai_db`)
- `DATABASE_USER`: Database user (default: `voiceai_user`)
- `DATABASE_PASSWORD`: Database password (default: `voiceai_pass`)
- `DEBUG`: Enable debug mode (default: `True`)
- `SECRET_KEY`: Django secret key
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of CORS origins

## 📁 Project Structure

```
VoiceAIWrapper/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── graphql/       # GraphQL queries and mutations
│   │   ├── types/          # TypeScript type definitions
│   │   └── apollo/         # Apollo Client configuration
│   ├── public/            # Static assets
│   ├── package.json       # Node dependencies
│   └── vite.config.ts     # Vite configuration
│
├── server/                # Backend Django application
│   ├── backend/          # Django project settings
│   │   ├── settings.py   # Django settings
│   │   ├── urls.py       # URL routing
│   │   └── schema.py     # GraphQL schema
│   ├── core/             # Main Django app
│   │   ├── models.py     # Database models
│   │   └── schema/       # GraphQL schema definitions
│   ├── manage.py         # Django management script
│   └── requirements.txt  # Python dependencies
│
├── docker-compose.yml    # Docker orchestration
└── README.md            # This file
```

## 📡 API Documentation

### GraphQL Endpoint

The application uses GraphQL for API communication.

**Endpoint:** `http://localhost:8000/graphql/`

### Example Queries

**Get all projects:**
```graphql
query GetProjects($organizationSlug: String!) {
  projects(organizationSlug: $organizationSlug) {
    id
    name
    status
    taskCount
    completedTasks
    completionRate
  }
}
```

**Create a project:**
```graphql
mutation CreateProject(
  $organizationSlug: String!
  $name: String!
  $status: String!
  $description: String
) {
  createProject(
    organizationSlug: $organizationSlug
    name: $name
    status: $status
    description: $description
  ) {
    project {
      id
      name
      status
      taskCount
      completedTasks
      completionRate
    }
  }
}
```

### GraphQL Playground

Access the interactive GraphQL playground at: **http://localhost:8000/graphql/**

## 🔧 Troubleshooting

### Port Already in Use

If ports 5173 (frontend) or 8000 (backend) are already in use:

**Frontend:**
- Vite will automatically suggest an alternative port
- Or modify `client/vite.config.ts` to use a different port

**Backend:**
- Change the port in the runserver command:
  ```bash
  python manage.py runserver 8001
  ```
- Update CORS settings in `server/backend/settings.py` if needed

**Docker:**
- Modify port mappings in `docker-compose.yml`:
  ```yaml
  ports:
    - "3001:80"  # Change client port
    - "8001:8000"  # Change server port
  ```

### Database Connection Issues

**PostgreSQL:**
- Ensure PostgreSQL is running:
  ```bash
  # On macOS
  brew services start postgresql
  
  # On Linux
  sudo systemctl start postgresql
  
  # On Windows
  # Check Services panel
  ```

- Verify database credentials in `server/backend/settings.py`
- Check if database exists:
  ```bash
  psql -U voiceai_user -d voiceai_db
  ```

**SQLite:**
- SQLite should work out of the box
- If issues occur, delete `db.sqlite3` and run migrations again:
  ```bash
  rm db.sqlite3
  python manage.py migrate
  ```

### CORS Errors

If you encounter CORS errors:

1. Check `server/backend/settings.py` CORS configuration
2. Ensure frontend URL is in `CORS_ALLOWED_ORIGINS`
3. For Docker, ensure CORS origins include Docker service URLs

### Module Not Found Errors

**Python:**
- Ensure virtual environment is activated
- Reinstall dependencies:
  ```bash
  pip install -r requirements.txt
  ```

**Node:**
- Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Docker Issues

**Container won't start:**
- Check logs: `docker-compose logs`
- Rebuild containers: `docker-compose build --no-cache`

**Database migrations in Docker:**
```bash
docker-compose exec server python manage.py migrate
```

**Create superuser in Docker:**
```bash
docker-compose exec server python manage.py createsuperuser
```

## 📚 Additional Resources

- [Vite Documentation](https://vite.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Django Documentation](https://docs.djangoproject.com/)
- [Graphene-Django Documentation](https://docs.graphene-python.org/projects/django/en/latest/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)

## 📝 Development Notes

- The frontend uses Vite for fast HMR (Hot Module Replacement)
- The backend uses Django's development server with auto-reload
- GraphQL schema is defined in `server/backend/schema.py` and `server/core/schema/`
- CORS is configured to allow requests from `localhost:5173` and `localhost:3000`

## 🎯 Next Steps

1. Start both servers (backend and frontend)
2. Access the application at http://localhost:5173
3. Use GraphQL Playground at http://localhost:8000/graphql/ to explore the API
4. Create projects and manage them through the UI

---

**Tejas P R 🚀**

