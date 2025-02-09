from flask import Flask
from flask_cors import CORS
from lib.db import db

import routes.words
import routes.groups
import routes.study_sessions as study_sessions
import routes.dashboard
import routes.study_activities

app = Flask(__name__)

# Configure CORS to allow all origins
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize database
db.init(app)

# Load routes
routes.words.load(app)
routes.groups.load(app)
study_sessions.load(app)
routes.dashboard.load(app)
routes.study_activities.load(app)

if __name__ == '__main__':
    app.run(debug=True)