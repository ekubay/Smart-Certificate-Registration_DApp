#/bin/bash

export FLASK_ENV=development
export FLASK_APP=run_app.py

flask run --host="0.0.0.0" --port=7777