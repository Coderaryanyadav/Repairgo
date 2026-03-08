# Repargo – Instant Mobile Repair at Your Doorstep

**Repargo** is a complete, scalable, on-demand platform streamlining mobile device repair. It instantly matches customers securely with verified technicians utilizing dynamic background Geo-Spatial worker queues, tracks movements securely in real-time, and administers jobs dynamically.

---

## 🛠 Platform Architecture & Repositories

This Monorepo contains the active execution framework for 5 distinct projects:

1. **/backend**: The core Node.js/Express Engine. Handles the REST Interface, Socket.IO WebSockets mapping, and BullMQ Worker match execution loops. Connected continuously to MongoDB and Redis caching.
2. **/customer-app**: The Expo (React Native) Customer interface. Maps jobs securely utilizing Expo Location hooks.
3. **/technician-app**: The exact mirror interface for workers utilizing explicit push-notification acceptance flows via `Firebase Cloud Messaging`.
4. **/admin-dashboard**: A responsive `Next.js` and `TailwindCSS` interface tracking active matching loops, computing daily revenues, and administering tech verification gates.
5. **/scripts**: Executables mapping immediate structural orchestrations and testing.

## 🚀 Getting Started Locally

### Dependencies Required
- Node.js (v18+)
- Docker & Docker Compose (For auto-spinning Redis and MongoDB Instances safely)

### Local Spin-Up Runner
Navigate to the root directory and start the script:
```bash
# Triggers Docker Databases -> Worker Engine -> Backend Sockets -> Admin Web UI
./scripts/dev-start.sh
```

*(To terminate safely: `./scripts/dev-stop.sh` or `Ctrl+C`)*

### Testing The Backend Integration
```bash
cd backend
npm install
npm test
```

## 📚 API Specifications (Module 8 & 12)
Comprehensive endpoints mapped natively via standard formats ensuring robust client-integration:
* **OpenAPI 3.0 / Swagger**: [backend/docs/openapi.yaml](backend/docs/openapi.yaml)
* **Postman Extractor**: [backend/docs/postman_collection.json](backend/docs/postman_collection.json)

## 📌 System Visualizations (Module 15)
Architectural diagrams mapped precisely documenting:
- Core Platform Interaction Maps
- Redis -> BullMQ Matching Interval Loops
- WebSocket Location Ping Streaming
*Reference File:* `docs/MODULE_15_System_Diagrams.md` (Usually rendered locally alongside Artifacts).

---

*Repargo Platform | Enterprise Architecture Deployment.*
