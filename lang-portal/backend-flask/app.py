from flask import Flask
from flask_cors import CORS
from lib.db import Db

import routes.words
import routes.groups
import routes.study_sessions as study_sessions
import routes.dashboard
import routes.study_activities

def get_allowed_origins(app):
    try:
        cursor = app.db.cursor()
        cursor.execute('SELECT url FROM study_activities')
        urls = cursor.fetchall()
        # Convert URLs to origins (e.g., https://example.com/app -> https://example.com)
        origins = set()
        for url in urls:
            try:
                from urllib.parse import urlparse
                parsed = urlparse(url['url'])
                origin = f"{parsed.scheme}://{parsed.netloc}"
                origins.add(origin)
            except:
                continue
        return list(origins) if origins else ["*"]
    except:
        return ["*"]  # Fallback to allow all origins if there's an error

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_mapping(DATABASE='db/app.db')
    
    # Initialize database
    app.db = Db(database=app.config['DATABASE'])
    
    # Configure CORS
    CORS(app)
    
    # Load routes
    routes.study_sessions.load(app)
    routes.words.load(app)
    routes.groups.load(app)
    routes.dashboard.load(app)
    routes.study_activities.load(app)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)