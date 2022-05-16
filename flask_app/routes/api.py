from flask import Blueprint, jsonify, request, Response
from flask_app.constant.constant import Constant
from flask_app.logger.logger import exc_logger, logger
from objdict import ObjDict
from flask_app.main import Main
from flask_app.utilities.utilities import Utilities

app = Blueprint('api', __name__)


def get_blueprint():
    """Return the blueprint for the main app module"""
    return app


@app.route('/')
def init():
    dataDict, dictResp = ObjDict(), {}
    dictResp['result'] = f"{Constant.PROJECT_NAME} api's are integrated successfully"
    dictResp['version'] = 'v1.0.0'
    logger.info("TSP api's are working fine.")

    # Serializing json
    return Utilities.prepareResonpe(dataDict, dictResp, True, jsonify)

@app.route('/api/v1/text/speech', methods = ['POST'])
def textToSpeech():
    dataDict, dictResp, flag = ObjDict(), {}, False

    logger.info(f'{Constant.PROJECT_NAME} - execute text-to-speech Api')

    # post parameter send by client
    param = request.get_json(silent=True)

    # Validate User Name
    uName = Utilities.isParameterEmpty(param, 'uid', dictResp)
    if uName is None:
        logger.error('uid' + Constant.ERROR_MESSAGE)
        return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)

    language = Utilities.isParameterEmpty(param, 'language', dictResp)
    if language is None:
        language = 'en'

    text = Utilities.isParameterEmpty(param, 'text', dictResp)
    if text is None:
        logger.error('text' + Constant.ERROR_MESSAGE)
        return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)

    try:
        path = Main.getInstance().text_to_speech(uName, text, language)
        def generate(path):
            with open(path, "rb") as fmp3:
                data = Utilities.encode_voice(fmp3.read(1024))
                return data
                
        return Response(generate(path), mimetype="audio/mpeg3")
    except Exception as e:
        dictResp['result'] = str(e)
        logger.error(str(e))

    return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)

@app.route('/api/v1/speech/text', methods = ['POST'])
def speechToText():
    dataDict, dictResp, flag = ObjDict(), {}, False

    logger.info(f'{Constant.PROJECT_NAME} - execute speech-to-text Api')

    # post parameter send by client
    param = request.get_json(silent=True)

    # Validate User Name
    uName = Utilities.isParameterEmpty(param, 'uid', dictResp)
    if uName is None:
        logger.error('uid' + Constant.ERROR_MESSAGE)
        return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)

    language = Utilities.isParameterEmpty(param, 'language', dictResp)
    if language is None:
        language = 'en'

    try:
        path = Main.getInstance().text_to_speech(uName, language)
        def generate(path):
            with open(path, "rb") as fmp3:
                data = fmp3.read(1024)
                while data:
                    yield data
                    data = fmp3.read(1024)
        return Response(generate(path), mimetype="audio/mpeg3")
    except Exception as e:
        dictResp['result'] = str(e)
        logger.error(str(e))

    return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)

@app.route('/api/v1/fetch/speech', methods = ['POST'])
def fetchSpeech():
    dataDict, dictResp, flag = ObjDict(), {}, False

    logger.info(f'{Constant.PROJECT_NAME} - execute fetch speech Api')

    # post parameter send by client
    param = request.get_json(silent=True)

    # Validate User Name
    uName = Utilities.isParameterEmpty(param, 'uid', dictResp)
    if uName is None:
        logger.error('uid' + Constant.ERROR_MESSAGE)
    
    try:
        res = Main.getInstance().fetch_speech(uName) if uName is not None else  Main.getInstance().fetch_speech_all()
        dictResp['result'] = res
        flag = True
    except Exception as e:
        dictResp['result'] = str(e)
        logger.error(str(e))

    return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)


@app.route('/api/v1/store/speech', methods = ['POST'])
def storeSpeech():
    dataDict, dictResp, flag = ObjDict(), {}, False

    logger.info(f'{Constant.PROJECT_NAME} - execute store speech Api')

    # post parameter send by client
    param = request.get_json(silent=True)

    # Validate User Name
    uName = Utilities.isParameterEmpty(param, 'uid', dictResp)
    if uName is None:
        logger.error('uid' + Constant.ERROR_MESSAGE)
        return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)

    # Validate User Name
    voice = Utilities.isParameterEmpty(param, 'pronounciation', dictResp)
    if voice is None:
        logger.error('pronounciation' + Constant.ERROR_MESSAGE)
        return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)
    
    try:
        res = Main.getInstance().store_speech(uName, voice, param)
        dictResp['result'] = res
        flag = True
    except Exception as e:
        dictResp['result'] = str(e)
        logger.error(str(e))

    return Utilities.prepareResonpe(dataDict, dictResp, flag, jsonify)