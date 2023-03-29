from flask import Flask, request, make_response, jsonify
from lib.service import FiguresManager
from http import HTTPStatus
from flask_cors import cross_origin

app = Flask(__name__)

figures_manager = FiguresManager()

def _json_error(message, status_code):
    return make_response(jsonify(dict(error=message)), status_code)

def _200(data):
    return make_response(jsonify(data), HTTPStatus.OK)

def _201(data):
    return make_response(jsonify(data), HTTPStatus.CREATED)

def _400(message):
    return _json_error(message, HTTPStatus.BAD_REQUEST)


@app.route("/", methods=['GET'])
def health():
    return _200('App is healthy')

@app.route("/create_figures", methods=["PUT"])
@cross_origin()
def create_figures():
    "Create figures in the DB, from figures_data."

    figures_data = request.get_json()

    if not figures_data:
        return _json_error("No figures' data provided.", HTTPStatus.BAD_REQUEST)  
    
    try:
        figures_manager.create_figures(figures_data)
        return _201(figures_data)
    except Exception as err:
        return _400(str(err))
    
@app.route("/get_org_ids", methods=['GET'])
@cross_origin()
def get_org_ids():
    "Get all organisations IDs in the DB."
    try:
        org_ids = figures_manager.get_org_ids()
        return _200(org_ids)
    except Exception as err:
        return _400(str(err))

@app.route("/get_figures", methods=['GET'])
@cross_origin()
def get_figures():
    "Get all figures in the DB."
    try:
        figures = figures_manager.get_figures()
        return _200(figures)
    except Exception as err:
        return _400(str(err))
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5000)