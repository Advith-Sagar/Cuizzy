#!/usr/bin/env python3
"""
Cuizzy Project Launcher
Run this script to start the project with a local server
"""

import http.server
import socketserver
import os
import webbrowser
import time
from pathlib import Path

PORT = 8000
HANDLER = http.server.SimpleHTTPRequestHandler

def main():
    # Get the directory where this script is located
    project_dir = Path(__file__).parent.absolute()
    os.chdir(project_dir)
    
    print("=" * 60)
    print("🥐 Launching Cuizzy Project")
    print("=" * 60)
    print(f"📁 Project Directory: {project_dir}")
    print(f"🌐 Server: http://localhost:{PORT}")
    print("=" * 60)
    print("\n✅ Server starting...\n")
    
    try:
        with socketserver.TCPServer(("", PORT), HANDLER) as httpd:
            print(f"🚀 Server running at http://localhost:{PORT}")
            print("📱 Open in browser or use CLICKTOOPEN.html")
            print("⌨️  Press CTRL+C to stop the server\n")
            
            # Wait a moment then open browser
            time.sleep(1)
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print("🌍 Opening browser...\n")
            except:
                print("⚠️  Could not auto-open browser\n")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped")
    except OSError as e:
        print(f"\n❌ Error: Port {PORT} is already in use!")
        print(f"Try: lsof -i :{PORT} (to find process)")
        print(f"Or use a different port\n")

if __name__ == '__main__':
    main()
