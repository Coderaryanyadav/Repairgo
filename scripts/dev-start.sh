w#!/bin/bash
# Repargo Local Development Environment Runner
# Launches Docker infrastructure mapping services sequentially
export PATH="/usr/local/bin:$PATH"

# Resolve to repargo root directory regardless of where script is called
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR/.."

echo "🚀 Booting Repargo Local Environment..."

# 1. Start Support Infrastructure
echo "1️⃣ Starting Redis & MongoDB inside Docker..."
cd deployment
docker compose up -d redis mongodb
cd ..

# Wait for DB mapping
sleep 3
echo "✅ Databases ready!"

# 2. Start the Matching Worker Node Process 
echo "2️⃣ Booting Redis Matching Engine Worker..."
cd backend
npm run worker & # Assumes "worker": "node workers/matchingWorker.js" in package.json
WORKER_PID=$!

# 3. Start Backend HTTP/Socket.IO Sever
echo "3️⃣ Booting Backend Event API..."
npm run dev & # Assumes "dev": "nodemon src/index.js"
SERVER_PID=$!

# 4. Start Next.js Admin Dashboard
echo "4️⃣ Booting Web App components..."
cd ../admin-dashboard
npm run dev &
ADMIN_PID=$!

function cleanup() {
    echo "🛑 Shutting down environment..."
    kill $WORKER_PID $SERVER_PID $ADMIN_PID
    cd "$DIR/../deployment" && docker compose stop
    exit
}

trap cleanup SIGINT SIGTERM

echo "--------------------------------------------------------"
echo "✅ Framework Online!"
echo "Backend/WebSockets : http://localhost:5000"
echo "Admin Dashboard    : http://localhost:3000"
echo "Press Ctrl+C to terminate all execution instances."
echo "--------------------------------------------------------"

wait
