from django.shortcuts import render
from django.http import HttpResponse
import json
import os.path
BASE = os.path.dirname(os.path.abspath(__file__))

def getThreadsFromFile():
  metaFile = open(os.path.join(BASE, 'static/metafiles/sampleMetafile.json'))
  threads = json.load(metaFile)
  for thread in threads:
    thread["submittype"] = thread["submit-type"]
    del thread["submit-type"]
  return threads

def index(request):
  threads = getThreadsFromFile()
  context = {"metafile": threads}
  return render(request, 'fortinet/index.html', context)
