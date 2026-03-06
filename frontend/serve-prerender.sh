#!/bin/bash
# serve-prerender.sh - Serve the prerendered build
cd /app/frontend
npx serve -s build -l 3000
