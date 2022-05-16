import base64
import json
import os
import flask_app

import yaml
from flask_app.constant.constant import Constant


class Utilities:
    @staticmethod
    def isParameterEmpty(param, paramName, dictResp):
        try:
            val = str(param.get(paramName)).strip()
            if val and not str(val).isspace() and len(str(val)) > 0 and val != 'None':
                return val
            else:
                dictResp["result"] = paramName + Constant.ERROR_MESSAGE

        except Exception:
            dictResp["result"] = str(paramName) + Constant.ERROR_MESSAGE

        return None

    @staticmethod
    def prepareResonpe(resDict, msgDict, flag, jsonifyObj):
        resDict.status = flag

        for key, val in msgDict.items():
            resDict[key] = val

        # Serializing json
        json_object = resDict.dumps()
        json_object = json.loads(json_object)

        # Based on jsonify object
        # return object
        temp_obj = None
        if jsonifyObj is None:
            temp_obj =  json_object
        else:
            temp_obj = jsonifyObj({"response": json_object})

        temp_obj.headers.add('Access-Control-Allow-Origin', '*')
        temp_obj.headers.add("Access-Control-Allow-Headers", "*")
        temp_obj.headers.add("Access-Control-Allow-Methods", "*")
        return temp_obj        

    @staticmethod
    def readConfig(configPath):
        PATH = os.path.dirname(flask_app.__file__)
        conf = os.path.join(PATH, configPath)
        config = None
        try:
            with open(conf, "r") as f:
                config = yaml.safe_load(f.read())
        except Exception:
            config = None

        return config

    @staticmethod
    def decode(message):
        message_bytes = message.encode("ascii")
        base64_bytes = base64.b64encode(message_bytes)
        return base64_bytes.decode("ascii")

    @staticmethod
    def encode(message):
        base64_bytes = message.encode("utf-8")
        message_bytes = base64.b64decode(base64_bytes)
        return message_bytes.decode("utf-8")

    @staticmethod
    def decode_voice(message):
        return base64.b64decode(message)

    @staticmethod
    def encode_voice(message):
        return base64.b64encode(message)

if __name__ == "__main__":
    print(Utilities.decode('Hackathon22!'))