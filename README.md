# Scheduled Notification System

A simple full-stack application built using Django (Backend) and Angular (Frontend) that allows users to subscribe to daily report notifications. Reports can be delivered in PDF or HTML format and include a sample graph. The system includes a scheduled backend task using Celery and Redis. Authentication is mocked to keep the system stateless.

---

## Demo

[Watch the video](https://www.youtube.com/watch?v=nezOwgWVxgY)

---

## Features

* Subscribe to daily reports within a selected date range
* Choose between PDF and/or HTML formats
* View current active subscriptions
* Preview PDF and HTML reports
* View history of sent reports
* Scheduled report generation and (simulated) email sending

---

## Tech Stack

### Backend

* Django
* Django REST Framework
* Celery
* Redis
* ReportLab (PDF generation)
* Matplotlib (Graph generation)

### Frontend

* Angular
* Standalone Components
* Angular Services for API communication

---

## Project Structure

```
Repo Root/
├── Backend/
│   ├── scheduled_notification/       # Django project & celery config
│   ├── app/                          # Django app with models/views/tasks
│   ├── templates/                    # HTML report template
│   ├── requirements.txt              # Python dependencies
│   └── manage.py
├── Frontend/
│   ├── src/app/components/           # Angular components
│   ├── src/app/services/             # Angular services
│   ├── src/app/models/             # Angular models
│   ├── angular.json, package.json    # Angular project config
```

---

## Setup Instructions

### Prerequisites

* Python 3.12+
* Redis
* Node.js and npm

---

## Backend Setup (Django)

```bash
cd Backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run migrations and seed dummy data
python manage.py makemigrations app
python manage.py migrate
python manage.py seed_dummy_data

# Start Redis (in a new terminal)
redis-server

# Start Django server
python manage.py runserver

# Start Celery worker (new terminal)
celery -A scheduled_notification worker --loglevel=debug
```

---

## Frontend Setup (Angular)

```bash
cd Frontend
npm install

# Start the Angular development server
ng serve
```

---

## API Endpoints

### Subscriptions

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/api/subscribe/`     | Subscribe to daily report  |
| POST   | `/api/unsubscribe/`   | Cancel all subscriptions   |
| GET    | `/api/subscriptions/` | List current subscriptions |

### Reports

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| GET    | `/api/preview/pdf/`  | Preview PDF report                |
| GET    | `/api/preview/html/` | Preview HTML report               |
| GET    | `/api/history/`      | View report history               |
| GET    | `/api/trigger-task/` | Trigger report sending via Celery |

> **Note:** Emails are printed to the console using Django's console email backend.

> **Note:** Base URLs: Backend – http://localhost:8000, Frontend – http://localhost:4200
---

## Frontend Features

* Date range picker for subscriptions
* Format selection: PDF / HTML / Both
* Real-time loading indicators
* View subscription status
* View report history (mocked)

---

## Demonstration Workflow

1. Start the backend (Django, Redis, Celery)
2. Start the frontend (Angular)
3. Subscribe using the frontend form
4. View subscriptions
5. View sent history and preview reports

---

## Notes

* No real user login is implemented
* PDF generation uses mock bar chart
* HTML preview is rendered from template
* Celery + Redis handle scheduled email simulation

---