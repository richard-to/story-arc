import os

from webapp2 import WSGIApplication
import webapp2
import jinja2


env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
    extensions=['jinja2.ext.autoescape'])


class MainPage(webapp2.RequestHandler):
    def get(self):
        template = env.get_template('index.html')
        self.response.write(template.render())


application = WSGIApplication([
    ('/', MainPage),
], debug=True)