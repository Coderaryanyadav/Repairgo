#!/bin/bash
# Repargo Dev Environment Terminator

echo "🛑 Shutting down Repargo Environment..."

# 1. Kill Node Processes mapped functionally
echo "Killing Backend Event API and Matching Worker..."
pkill -f "nodemon src/index.js"
pkill -f "node workers/matchingWorker.js"
pkill -f "next dev"

# 2. Stop Docker Background Instances Safely
echo "Stopping Docker DB Containers..."
cd ../deployment
docker-compose stop

echo "✅ Environment successfully terminated."
