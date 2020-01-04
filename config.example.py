import os
import datetime
basedir = os.path.abspath(os.path.dirname(__file__))

config = {
    'db': {
        'host': '',
        'user': '',
        'passwd': '',
        'port': 3306,
        'db': 'arrplat'
    },
    'redis': {
        'host': '',
        'password': '',
        'port': 6379,
        'db': 0
    },

    'system': {
        'BASEDIR': basedir,
        'SECRET_KEY': os.environ.get('SECRET_KEY') or 'pay-IKJNDFB',
        'FONT_PATH': os.path.join(basedir, 'arrplat/common/font.ttf'),
        'SQLALCHEMY_TRACK_MODIFICATIONS': False,
        'SQLALCHEMY_RECORD_QUERIES': True,
        'ACCESS_EXPIRES': datetime.timedelta(days=7),
        'REFRESH_EXPIRES': datetime.timedelta(days=30),
        'JWT_ACCESS_TOKEN_EXPIRES': False,
        'JWT_REFRESH_TOKEN_EXPIRES': False,
        'JWT_BLACKLIST_ENABLED': True,
        'JWT_BLACKLIST_TOKEN_CHECKS': ['access', 'refresh']
    }
}
