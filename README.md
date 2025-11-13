# RnR Social Tickets Hub

This is a ticket reservation application for events, built with Vite, React, TypeScript, and shadcn-ui. It uses Firebase for backend services.

## Features

- Browse a list of events.
- View event details.
- Reserve tickets for an event.
- Check the status of your ticket reservation.
- Admin panel for event and ticket management.

## Technologies Used

- **Frontend:**
  - [Vite](https://vitejs.dev/)
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [shadcn-ui](https://shadcn.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Router](https://reactrouter.com/)
  - [TanStack Query](https://tanstack.com/query/latest)
- **Backend:**
  - [Firebase](https://firebase.google.com/) (Firestore, Auth, Storage)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone <https://github.com/gachezra/rnr-social-tickets-hub.git>
   ```

2. Navigate to the project directory:

   ```sh
   cd rnr-social-tickets-hub
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   VITE_FIREBASE_API_KEY="your-firebase-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-firebase-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-firebase-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-firebase-messaging-sender-id"
   VITE_FIREBASE_APP_ID="your-firebase-app-id"
   VITE_FIREBASE_MEASUREMENT_ID="your-firebase-measurement-id"
   ```

5. Start the development server:

   ```sh
   npm run dev
   ```

## Deployment

This project can be deployed to any static hosting service. To build the project, run:

```sh
npm run build
```