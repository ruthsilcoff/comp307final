from server.settings.common import *

SECRET_KEY = '5!g6h4!z6v^vwnvv^=xpo5js)0g4(89193@ncb0!&og(n9o%ak'
DEBUG = False
ALLOWED_HOSTS = ['0.0.0.0', 'localhost']

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': False,
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(FRONTEND_DIR, 'webpack-stats-prod.json'),
    }
}
