#!/bin/bash
# Cuizzy Project Launcher (Bash version)
# Run this script to start the project with a local server

PORT=8000
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "============================================================"
echo "🥐 Launching Cuizzy Project"
echo "============================================================"
echo "📁 Project Directory: $PROJECT_DIR"
echo "🌐 Server: http://localhost:$PORT"
echo "============================================================"
echo ""
echo "✅ Server starting..."
echo ""

cd "$PROJECT_DIR"

# Check if port is already in use
if lsof -i ":$PORT" > /dev/null; then
    echo "❌ Error: Port $PORT is already in use!"
    echo "Try: kill -9 \$(lsof -ti:$PORT)"
    echo "Or use a different port"
    exit 1
fi

# Start Python HTTP server
python3 -m http.server $PORT 2>/dev/null &
SERVER_PID=$!

echo "🚀 Server running at http://localhost:$PORT"
echo "📱 Open in browser or use CLICKTOOPEN.html"
echo "⌨️  Press CTRL+C to stop the server"
echo ""

# Try to open browser
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:$PORT" 2>/dev/null &
elif command -v open > /dev/null; then
    open "http://localhost:$PORT" 2>/dev/null &
fi

# Wait for server
wait $SERVER_PID
