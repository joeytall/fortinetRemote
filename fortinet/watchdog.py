#!/usr/bin/python
import sys, time, logging, json
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

class MyHandler(PatternMatchingEventHandler):
    patterns = ["*.json"]

    def process(self, event):
        """
        event.event_type
            'modified' | 'created' | 'moved' | 'deleted'
        event.is_directory
            True | False
        event.src_path
            path/to/observed/file
        """
        # the file will be processed there
        print event.src_path, event.event_type  # print now only for degug

    def on_modified(self, event):
        self.process(event)

    def on_created(self, event):
        path = event.src_path
        self.process(event)
        try:
          self.addNewData(path)
        except ValueError:
          print "Oops! something went wrong."

    def addNewData(self, filename):
        jsonfile = open(filename)
        data = json.load(jsonfile)
        with open('./static/metafiles/sampleMetaFile.json', 'r+w+') as originalFile:
          originalData = json.load(originalFile)
          for newThread in data:
            originalData.append(newThread)
          newData = json.dumps(originalData, indent=4, sort_keys=True)
          originalFile.seek(0)
          originalFile.write(newData)
          originalFile.truncate()

if __name__ == '__main__':
    args = sys.argv[1:]
    observer = Observer()
    observer.schedule(MyHandler(), path=args[0] if args else './static/metafiles/')
    observer.start()
    print ("watchdog started!")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
