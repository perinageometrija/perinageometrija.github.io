#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'ninjas'
SITENAME = 'Perina Geometrija'
SITEURL = 'https://perinageometrija.com'
KEYWORDS = 'pera,matematika,matematicka,gimnazija,geometrija,perina,4d,euklidski,pancevo,krompir,haiku'

PATH = 'content'

TIMEZONE = 'Europe/Belgrade'

DEFAULT_LANG = 'sr'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Theme
THEME = 'theme'

# Blogroll
LINKS = (('Cern', 'https://www.cern.ch/'),
         ('Uncyclopedia', 'https://uncyclopedia.ca/wiki/Main_Page'),
         ('/b/', 'https://4chan.org/b'),
#         ('encyclopediadramatica', 'https://encyclopediadramatica.rs/Main_Page'),
        )

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

STATIC_PATHS = ['images', 'static', 'uploads', 'asembler', 'baze', 'instatropics', 'numericka', 'pascal']
READERS = {'html': None}

ARTICLE_SAVE_AS = 'vesti/{slug}.html'
ARTICLE_URL = 'vesti/{slug}.html'

PAGE_SAVE_AS = '{slug}.html'

from datetime import date
CURRENTYEAR = date.today().year

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
