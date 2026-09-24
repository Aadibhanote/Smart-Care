# SmartCare - Intelligent Healthcare Management System

SmartCare is a full-stack healthcare management platform designed to streamline doctor appointments, organ/blood donation requests, user profile management, and AI-based healthcare assistance. The system includes dedicated portals for users, doctors, and admins, making it a comprehensive and scalable medical support solution.

---

##  Features

###  User Panel
-  Book appointments with doctors
-  View and manage appointment history
-  Edit and update profile details
-  Request organ or blood donation
-  24/7 AI HealthCare Chatbot assistance

###  Doctor Panel
-  Manage patient appointments
-  View user details and medical history
-  Update consultation status

###  Admin Panel
-  Add and manage doctors
-  Monitor system activity and user requests

---



---

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS


### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Others
- Axios
- JWT for authentication


---

##  Installation

```bash


# Install client dependencies
cd User
npm install
cd admin
npm install

# Install server dependencies
cd  Backend
npm install

# Add environment variables
# Create a .env file in /server with necessary keys (e.g., DB URI, JWT secret, API keys)

# Run the app
cd backend  # for backend
npm run dev   
cd Frontend   # for frontend
cd vite-project
npm run dev    
