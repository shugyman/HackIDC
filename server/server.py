import os
import logging

from tornado.web import FallbackHandler, RequestHandler
from tornado.httpserver import HTTPServer
from tornado.wsgi import WSGIContainer, WSGIApplication
from tornado.ioloop import IOLoop

from app import app

# Don't log all the successful requests.
# tornado_logger = logging.getLogger('tornado.access')
# tornado_logger.setLevel(logging.WARN)
#

class _MainHandler(RequestHandler):
    def get(self):
        index_path = os.path.join(TornadoServer._get_static_path(), 'index.html')
        with open(index_path, 'rb') as f:
            data = f.read()
            self.write(data)
        self.finish()


class TornadoServer(object):
    def __init__(self):
        """
        Initializes the server params
        """
        container = WSGIContainer(app)
        path = self._get_static_path()
        settings = {'template_path': path, 'static_path': path, 'debug': True}
        application = WSGIApplication(
            [(r"/", _MainHandler),
             ('.*', FallbackHandler, dict(fallback=container)), ],
            **settings)

        self._server = HTTPServer(application)

    @staticmethod
    def _get_static_path():
        """ Get the location of the service configuration folder """

        folder = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        return folder

    def start_server(self):
        port = 8080
        self._server.listen(port)
        print '>>> Tornado Server started on port : {port} <<<'.format(port=port)
        IOLoop.instance().start()


def main(argv):
    server = TornadoServer()
    server.start_server()


if __name__ == '__main__':
    import sys

    main(sys.argv)