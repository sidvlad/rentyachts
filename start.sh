#!/bin/bash

echo "========================================"
echo "   ON THE SEA - Local Server"
echo "========================================"
echo ""

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "Starting server at http://localhost:8080"
    echo "Press Ctrl+C to stop"
    echo ""
    npx http-server -p 8080 -o
    exit 0
fi

# Check if Python 3 is installed
if command -v python3 &> /dev/null; then
    echo "Starting server at http://localhost:8080"
    echo "Press Ctrl+C to stop"
    echo ""
    open http://localhost:8080 2>/dev/null || xdg-open http://localhost:8080 2>/dev/null &
    python3 -m http.server 8080
    exit 0
fi

# Check if Python is installed
if command -v python &> /dev/null; then
    echo "Starting server at http://localhost:8080"
    echo "Press Ctrl+C to stop"
    echo ""
    open http://localhost:8080 2>/dev/null || xdg-open http://localhost:8080 2>/dev/null &
    python -m http.server 8080
    exit 0
fi

echo "ERROR: Neither Node.js nor Python found!"
echo "Please install Node.js from https://nodejs.org"
exit 1
