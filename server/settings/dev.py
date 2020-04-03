from server.settings.common import *

SECRET_KEY = '5!g6h4!z6v^vwnvv^=xpo5js)0g4(89193@ncb0!&og(n9o%ak'
DEBUG = True
ALLOWED_HOSTS = ['0.0.0.0', 'localhost', '127.0.0.1']

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': True,
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(FRONTEND_DIR, 'webpack-stats.json'),
    }
}
