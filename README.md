<div align="center">
  <img src="https://smartrise.io/wp-content/uploads/2021/02/Smartrise-Logo-Color-Large.png" alt="Smartrise Logo" width="300"/>
  <h1>🚀 Smartrise API</h1>
  <p><i>The central orchestration hub for the elevator monitoring ecosystem.</i></p>
</div>

---

## 📖 Overview
Smartrise API is the central backend orchestration layer for the elevator monitoring system. Built with **Node.js** and **Express**, it provides a reliable and scalable foundation for managing elevator data, user authentication, and system reporting.

---

## 🏗️ Core Modules

The system is organized into specialized modules, each handling a specific domain of the monitoring ecosystem:

| Module | Description |
| :--- | :--- |
| 🔐 **Authentication & Authorization** | Secure user login, registration, and role-based access control (RBAC). |
| 🛗 **Car Controls** | Interface for sending commands to elevators (e.g., car calls, mode changes). |
| 👥 **Group Proxy** | Manages communication and routing for multiple elevator groups. |
| 🗄️ **Database (Sequelize)** | ORM layer for PostgreSQL, handling persistence for faults, alarms, and history. |
| 📊 **Reports** | High-performance reporting engine for historical data and analytics. |
| 🔌 **Real-time Engine (Socket)** | WebSocket-based telemetry stream from edge devices. |
| 🛡️ **Security** | Dynamic security layers and request validation. |

---

## 🚀 Development Deployment

To get the development environment up and running using Docker Compose:

### Prerequisites
- Docker and Docker Compose installed.
- A local `.env` file (see `.env.example` if available).

### Quick Start
Run the following command from the project root:

```bash
docker compose -f docker-compose.dev.yaml up smartrise_api_dev
```

If you want to start the entire developer stack (including database and redis):

```bash
docker compose -f docker-compose.dev.yaml up
```

- **API URL**: `http://localhost:9300`
- **Health Check**: `http://localhost:9300/health` (or root path)

---

## 🛠️ Architecture Details
- **`modules/socket`**: `PiManager` and `SocketLogic` maintain persistent connections to edge controllers.
- **`database/models`**: Central data schema defining faults, alarms, and service logs.
- **`middlewares`**: Security and proxy layers for cross-group request handling.

---

<div align="center">
  <p>© 2026 Smartrise Engineering. All rights reserved.</p>
</div>
