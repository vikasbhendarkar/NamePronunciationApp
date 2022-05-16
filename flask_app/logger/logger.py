import logging
import logging.config
import yaml
import os
import flask_app
from flask_app.constant.constant import Constant

PATH = os.path.dirname(flask_app.__file__)
conf = os.path.join(PATH, Constant.LOGGER_PATH.format(Constant.RESOURCE_PATH))

with open(conf, "r") as f:
    config = yaml.safe_load(f.read())
    logging.config.dictConfig(config)

logger = logging.getLogger("access")
exc_logger = logging.getLogger("exception")
