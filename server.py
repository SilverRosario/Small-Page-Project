import http.server
import json
import os
import urllib.parse

IMAGE_FOLDER = 'collection'
PORT = 8000

class ImageListHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == '/images':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            images = [
                file_name
                for file_name in sorted(os.listdir(IMAGE_FOLDER))
                if os.path.isfile(os.path.join(IMAGE_FOLDER, file_name))
                and file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
            ]
            self.wfile.write(json.dumps(images).encode('utf-8'))
        elif parsed_path.path == '/shutdown':
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.end_headers()
            self.wfile.write(b'Shutting down server...')
            # Shutdown must be called on the server instance from a different thread.
            def stop_server():
                self.server.shutdown()
            import threading
            threading.Thread(target=stop_server, daemon=True).start()
        else:
            super().do_GET()

    def log_message(self, format, *args):
        # Suppress normal HTTP server logging for a cleaner console.
        pass

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or '.')
    server_address = ('', PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, ImageListHandler)
    print(f'Serving on http://localhost:{PORT}/')
    print('Open Chenstare.html in your browser, then refresh after adding new images.')
    print('To stop the server, visit http://localhost:8000/shutdown or press Ctrl+C.')
    httpd.serve_forever()
