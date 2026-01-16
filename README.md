# ⚡ Electricity Bill Payment System

A modern, web-based application for managing electricity bills. This system allows administrators to generate monthly bills and customers to view and pay them securely online.

## ✨ Features

-   **Modern User Interface**: Built with Glassmorphism design principles using **EJS** and custom CSS.
-   **Role-Based Access**:
    -   **Admin**: Generate bills for any registered user.
    -   **User**: View dashboard, track bill history, and make payments.
-   **Secure Authentication**: Role-based login and signup flow.
-   **Bill Management**: Real-time status updates (Paid/Unpaid).

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (Mongoose)
-   **Frontend**: EJS (Embedded JavaScript Templating), CSS3 (Glassmorphism)

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) installed.
-   A MongoDB connection string (configured in `config/db.js`).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd electricity-bill-payment-system
    ```

2.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

### ▶️ Running the Application

1.  **Start the Server**:
    ```bash
    npm start
    ```
    *The server will start on `http://localhost:3000`*

2.  **Open your browser**:
    Visit [http://localhost:3000](http://localhost:3000)

### 🔑 Admin Setup

There is no default admin account. To create one, run the included seed script:

1.  Stop the server if it's running.
2.  Run the seed script:
    ```bash
    node seed_admin.js
    ```
3.  **Default Credentials**:
    -   **Email**: `admin@example.com`
    -   **Password**: `admin123`

## 📁 Project Structure

```
backend/
├── config/         # Database configuration
├── models/         # Mongoose models (User, Bill)
├── public/         # Static assets (CSS, Images)
├── views/          # EJS Templates (UI)
├── app.js          # Main application file & routes
├── seed_admin.js   # Script to create admin user
└── package.json    # Dependencies and scripts
```


