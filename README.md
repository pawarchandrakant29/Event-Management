# Event Management Application

## Overview
The Event Management Application enables users to seamlessly create, manage, and participate in events. With an intuitive interface and powerful tools, users can plan events, send invitations, track RSVPs, and much more.

---

## Features

- **Event Creation**:
  - Add event details like title, date, time, location, and description.
  - Upload images or flyers for events.
- **Event Management**:
  - Edit and delete events.
  - Manage participant lists and RSVPs.
- **User Roles**:
  - Admin: Full control over events and users.
  - User: RSVP and view event details.
---

## Technology Stack

- **Frontend**:
  - Framework: React.js
  - Styling: Bootstrap

- **Backend**:
  - Framework: Node.js with Express.js
  - Database: MongoDB

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pawarchandrakant29/Event-Management.git
   cd Event-Management
   ```

2. Install dependencies for the backend and frontend:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Include the following variables:
     ```env
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET_KEY=your_secret_key
     ```

4. Run the application:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```

5. Open the app in your browser at `http://localhost:5173`.

---
