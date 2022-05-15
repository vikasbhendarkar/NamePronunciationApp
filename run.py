from wsgiserver import WSGIServer
from flask_app.app import app

# As flask is not a production suitable server, we use will
# a WSGIServer instance to serve our flask application. 
if __name__ == '__main__':  
    WSGIServer(app, host='0.0.0.0', port=8000).start()
