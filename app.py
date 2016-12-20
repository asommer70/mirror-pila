from flask import Flask, request, url_for, render_template, jsonify
import ConfigParser
import urllib, json
import serial
import subprocess

config = ConfigParser.RawConfigParser()
config.read('defaults.cfg')
WEATHER_API_KEY = config.get('openweathermap', 'api_key')
CITY_ID = config.get('openweathermap', 'city_id')
WEATHER_URL = config.get('openweathermap', 'url')
WEATHER_UNITS = config.get('openweathermap', 'units')
API_PARAMS = "?id=" + CITY_ID + "&units=" + WEATHER_UNITS + "&appid=" + WEATHER_API_KEY


app = Flask(__name__)

@app.route('/')
def index():
    name = 'Beans...'
    return render_template('index.html', name=name)




@app.route('/api/weather')
def weather():
    response = urllib.urlopen(WEATHER_URL + "/weather" + API_PARAMS) 
    data = json.loads(response.read())
    return jsonify(data)

@app.route('/api/forecast')
def forecast():
    response = urllib.urlopen(WEATHER_URL + "/forecast" + API_PARAMS)
    data = json.loads(response.read())
    return jsonify(data)


#@app.route('/api/inside_temp')
#def inside_temp():
#    #monitor_status = subprocess.check_output("xset -q | grep 'Monitor is On'", shell=True)
#    
#    ser = serial.Serial('/dev/ttyACM0', 9600)
#   
#    count = 0
#    while 1:
#        #input = ser.readline()
#        input = ser.readline()
#        #print input
#        ++count
#        #if (count > 0): 
#        return jsonify(input)
#        #else:
#        #    return jsonify({'temp': 'unknown'})
#        
#        #if (input[12:18] == 'motion'):
#            #if (monitor_status != ""):
#                #subprocess.call(["xset", "dpms", "force", "on"])
#    
#
