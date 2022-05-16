
from flask_app.converter.fetch_sppech import FetchSpeech
from flask_app.converter.text_to_speech import TextToSpeech
from flask_app.database.db import Database
from flask_app.logger.logger import exc_logger, logger




class Main:

    def __init__(self):
        self.logger = logger 
        self.database = Database()      


    @staticmethod
    def getInstance():
        """ Static method to fetch the current instance. """
        return Main()

    def text_to_speech(self, uName, text, language):
        return TextToSpeech(self).text_to_speech(uName, text, language)

    def speech_to_text(self, uName, language):
        return TextToSpeech(self).record_voice(uName, language)

    def fetch_speech(self, uname):
        return FetchSpeech(self).fetch_speech(uname)

    def fetch_speech_all(self):
        return FetchSpeech(self).fetch_speech_all()

    def store_speech(self, uName, voice, param):
        return FetchSpeech(self).store_speech(uName, voice, param)

    def update_speech(self, uName, voice):
        return FetchSpeech(self).update_speech(uName, voice)
