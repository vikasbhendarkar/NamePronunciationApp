import random

from flask_app.create_dict.create_dict import create_dict

class FetchSpeech:
    
    __FETCH_ALL_SPEECH_QUERY = "SELECT * FROM employee"
    __UPDATE_SPEECH_QUERY = "UPDATE employee SET pronounciation = '{0}', status = '{2}' WHERE eid = '{1}'"
    __FETCH_SPEECH_QUERY = "SELECT * FROM employee WHERE eid = '{0}'"
    __INSERT_SPEECH_QUERY = 'INSERT INTO employee (eid, uid, fname, lname, preferred_name, pronounciation, status) VALUES (%s, %s, %s, %s, %s, %s, %s) '

    def __init__(self, mainObj) -> None:
        self.obj = mainObj

    def fetch_speech(self, uName):
        # self.obj.database.execute('DROP TABLE employee')
        # self.obj.database.execute('CREATE TABLE IF NOT EXISTS employee (eid VARCHAR PRIMARY KEY, uid VARCHAR, fname VARCHAR, lname VARCHAR, preferred_name VARCHAR, pronounciation VARCHAR, status VARCHAR)')
        self.obj.database.execute(FetchSpeech.__FETCH_SPEECH_QUERY.format(uName))
        result = self.obj.database.fetchall()
        mydict = create_dict()
    
        for row in result:
            mydict.add('employee',({"eid": row[0], "uid":row[1],"fname":row[2], "lname": row[3], "preferred_name": row[4], "pronounciation": row[5], "status": row[6]}))
        return mydict

    def store_speech(self, uName, voice, param):
        status = 'completed'
        if voice is None or voice == '':
            status = 'pending'

        self.obj.database.execute(FetchSpeech.__INSERT_SPEECH_QUERY, (uName, param.get('uid'), param.get('fname'), 
        param.get('lname'), param.get('preferred_name'), voice, status))
        return 'Store data successfully.'

    def fetch_speech_all(self):
        self.obj.database.execute(FetchSpeech.__FETCH_ALL_SPEECH_QUERY)
        result = self.obj.database.fetchall()
        mydict = create_dict()
        index = 1
        for row in result:
            mydict.add(index,({"eid": row[0], "uid":row[1],"fname":row[2], "lname": row[3], "preferred_name": row[4], "pronounciation": row[5], "status": row[6]}))
            index = index + 1

        return mydict

    def update_speech(self, uName, voice):
        status = 'completed'
        if voice is None or voice == '':
            status = 'pending'

        self.obj.database.execute(FetchSpeech.__UPDATE_SPEECH_QUERY.format(voice, uName, status))
        return 'Update data successfully.'