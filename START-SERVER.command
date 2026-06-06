#!/bin/bash

# ON THE SEA - Local Server for Mac
# Double-click this file to start

cd "$(dirname "$0")"

echo ""
echo "========================================"
echo "   ON THE SEA - Yacht Charter"
echo "========================================"
echo ""
echo "Starting local server..."
echo ""

# Open browser after delay
(sleep 2 && open "http://localhost:8080") &

# Try Python 3 (usually on Mac)
if command -v python3 &> /dev/null; then
    echo "Server running at http://localhost:8080"
    echo "Admin panel: http://localhost:8080/admin/"
    echo ""
    echo "Press Ctrl+C to stop"
    python3 -m http.server 8080
    exit 0
fi

# Try Python 2
if command -v python &> /dev/null; then
    echo "Server running at http://localhost:8080"
    echo "Admin panel: http://localhost:8080/admin/"
    echo ""
    echo "Press Ctrl+C to stop"
    python -m SimpleHTTPServer 8080
    exit 0
fi

# Try Ruby (built-in on Mac)
if command -v ruby &> /dev/null; then
    echo "Server running at http://localhost:8080"
    echo "Admin panel: http://localhost:8080/admin/"
    echo ""
    echo "Press Ctrl+C to stop"
    ruby -run -ehttpd . -p8080
    exit 0
fi

# Try PHP
if command -v php &> /dev/null; then
    echo "Server running at http://localhost:8080"
    echo "Admin panel: http://localhost:8080/admin/"
    echo ""
    echo "Press Ctrl+C to stop"
    php -S localhost:8080
    exit 0
fi

echo ""
echo "ERROR: No server found!"
echo ""
echo "Please install Xcode Command Line Tools:"
echo "  xcode-select --install"
echo ""
read -p "Press Enter to close..."
