import json
import os

from datetime import datetime

from google.appengine.api import users
from google.appengine.ext import ndb

from webapp2 import WSGIApplication, Route

import jinja2
import webapp2


env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
    extensions=['jinja2.ext.autoescape'])


class ModelEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return str(obj)


class Story(ndb.Model):
    title = ndb.StringProperty()
    author = ndb.StringProperty()
    date = ndb.DateTimeProperty(auto_now_add=True)


class Page(ndb.Model):
    content = ndb.TextProperty()
    num = ndb.IntegerProperty()


class StoryListApi(webapp2.RequestHandler):
    def get(self):
        storyQuery = Story.query()
        storiesJson = [story.to_dict() for story in storyQuery.fetch()]
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(storiesJson, cls=ModelEncoder))

    def post(self):
        data = json.loads(self.request.body)
        story = Story()
        story.title = data['title']
        story.author = data['author']
        story.put()

        pages = []
        for pageData in data['pages']:
            page = Page(parent=story.key)
            page.content = pageData['content']
            page.num = 1
            page.put()
            pages.append(page.to_dict())

        output = story.to_dict()
        output['pages'] = pages

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(output, cls=ModelEncoder))


class MainPage(webapp2.RequestHandler):
    def get(self):
        template = env.get_template('index.html')
        self.response.write(template.render())


application = WSGIApplication([
    Route(r'/', handler=MainPage),
    Route(r'/api/v1/stories', handler=StoryListApi),
], debug=True)