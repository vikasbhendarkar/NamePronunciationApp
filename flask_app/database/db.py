import psycopg2 as yugabute
from flask_app.constant.constant import Constant
from flask_app.logger.logger import exc_logger, logger
from flask_app.utilities.utilities import Utilities


class Database:
    __instance__ = None
    CONNECTIONS = None
    CURSORS = None

    # Load Database Connection while create class object
    def __init__(self):
        if Database.__instance__ is None:
            self.__setDatabaseConnection()
            Database.__instance__ = self
        else:
            logger.info("You cannot create another object of Database class")

    def __enter__(self):
        return self

    def __exit__(self):
        self.close()

    @property
    def cursors(self):
        return Database.CURSORS

    @property
    def connection(self):
        return Database.CONNECTIONS

    # Set DatabaseConnection for all cluster
    def __setDatabaseConnection(self):
        config = Utilities.readConfig(Constant.DATABASE_CONFIG_PATH.format(Constant.RESOURCE_PATH))
        devEnv = config[Constant.DATABASE_SOURCE]["datasource"]     
        self.__addConection(devEnv)       

    # Add Database Connection in Dict Object
    def __addConection(self, dbInfo):
        dbDetails = []
        dbDetails.append(dbInfo["HostAddress"])
        dbDetails.append(dbInfo["Username"])
        dbDetails.append(dbInfo["Password"])
        dbDetails.append(dbInfo["PortNo"])
        dbDetails.append(dbInfo["Database"])
        
        self.__open(dbDetails)

    # Open the Database Connection
    def __open(self, dbInfo):
        __db = yugabute.connect(
            host = dbInfo[0], port = dbInfo[3], user = dbInfo[1], password = Utilities.encode(dbInfo[2]), dbname = dbInfo[4]
        )
        Database.CONNECTIONS = __db
        __db.set_session(autocommit=True)
        try:
            Database.CURSORS = __db.cursor()
        except Exception as e:
            logger.error(str(e))
        logger.info("{}- Database connection successfully!.")

    def commit(self):
        self.conn.commit()

    def close(self, commit=True):
        if commit:
            self.commit()
        self.conn.close()

    def execute(self, sql, params=None):
        self.cursors.execute(sql, params or ())

    def fetchall(self):
        return self.cursors.fetchall()

    def fetchone(self):
        return self.cursors.fetchone()

    def query(self, sql, params=None):
        self.cursors.execute(sql, params or ())
        return self.fetchall()

    @staticmethod
    def get_instance():
        """Static method to fetch the current instance."""
        if not Database.__instance__:
            Database()
        return Database.__instance__

if __name__ == "__main__":
    db = Database()
    db.execute('CREATE TABLE IF NOT EXISTS employee (id int PRIMARY KEY, name varchar, voice varchar)')
    db.execute('SELECT * from employee')
    print(db.fetchall())
