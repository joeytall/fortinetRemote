# Fortinet Threads Monitor

Develop a program in Django and Python that reads “threat” meta files and renders them in a table using ajax. Each record in the table should include all fields of the meta file. Each row should also be color coded based on the records threat level (rating). The table should also allow sorting (optional, adds complexity). If a new record is detected and should be included in the table based on its state state (time-period0, an alert should be presented to the user informing them to reload the table.

## Installation

1. Install [Django Python](https://docs.djangoproject.com/en/1.8/topics/install/)
2. Install watchdog:
`sudo pip install watchdog`
3. In **Root** folder, run the project:
`python manage.py runserver`
4. In **Fortinet** folder, start watchdog:
`python watchdog.py`

*Watchdog has to be started in order to monitor new meta files.*

## Usage

![picture alt](https://github.com/joeytall/fortinetRemote/blob/master/fortinet/static/page.png)

1. Every Column can be sorted.

2. The entire table can be searched.

3. The two datetimepicker dropdown can be selected to filter the time period.

4. Drop new thread meta files in **Fortinet/static/metafiles** to update the table (works if watchdog.py is running)

5. Threads per page can be changed.
 
6. Reset button resets the time period filter.

## Third Party Tools Used

1. jQuery
2. [dynatable](http://www.dynatable.com/): *table search/sort*
3. [watchdog](https://pypi.python.org/pypi/watchdog): *monitor directory change*
