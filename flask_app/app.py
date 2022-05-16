import json
from gevent.pywsgi import WSGIServer

from flask import Flask, jsonify, make_response
from objdict import ObjDict

from flask_app.routes import api

app = Flask(__name__)
app.config["DEBUG"] = True
app.config["JSON_SORT_KEYS"] = False
app.secret_key = "(!TsPpOrTaL@)"


app.register_blueprint(api.get_blueprint())


@app.errorhandler(400)
def handle_400_error(_error):
    """Return a http 400 error to client"""
    dataDict = ObjDict()
    dataDict.status = False
    dataDict.result = "Misunderstood"
    # Serializing json
    json_object = json.dumps(dataDict)
    json_object = json.loads(json_object)
    return make_response(jsonify({"response": json_object}), 400)


@app.errorhandler(401)
def handle_401_error(_error):
    """Return a http 401 error to client"""
    dataDict = ObjDict()
    dataDict.status = False
    dataDict.result = "Unauthorised"
    # Serializing json
    json_object = json.dumps(dataDict)
    json_object = json.loads(json_object)
    return make_response(jsonify({"response": json_object}), 401)


@app.errorhandler(404)
def handle_404_error(_error):
    """Return a http 404 error to client"""
    dataDict = ObjDict()
    dataDict.status = False
    dataDict.result = "URL not found"
    # Serializing json
    json_object = json.dumps(dataDict)
    json_object = json.loads(json_object)
    return make_response(jsonify({"response": json_object}), 404)


@app.errorhandler(500)
def handle_500_error(_error):
    """Return a http 500 error to client"""
    dataDict = ObjDict()
    dataDict.status = False
    dataDict.result = "Server error. Please try after sometimes."
    # Serializing json
    json_object = json.dumps(dataDict)
    json_object = json.loads(json_object)
    return make_response(jsonify({"response": json_object}), 500)


@app.errorhandler(405)
def handle_405_error(_error):
    """Return a http 405 error to client"""
    dataDict = ObjDict()
    dataDict.status = False
    dataDict.result = "Method not allowed"
    # Serializing json
    json_object = json.dumps(dataDict)
    json_object = json.loads(json_object)
    return make_response(jsonify({"response": json_object}), 405)


@app.errorhandler(Exception)
def all_exception_handler(_error):
    dataDict = ObjDict()
    dataDict.status = False
    dataDict.result = _error.args[0]
    # Serializing json
    json_object = json.dumps(dataDict)
    json_object = json.loads(json_object)
    return make_response(jsonify({"response": json_object}), 500)
    