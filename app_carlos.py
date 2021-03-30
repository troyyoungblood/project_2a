from flask import Flask, render_template,json, jsonify, request
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
import psycopg2
import pandas as pd
from secrets import username, password
import json
import os


# Connect to sql database
# Connect to sql database
rds_connection_string = f"{username}:{password}@localhost:5432/etl_team5"
engine = create_engine(f'postgresql://{rds_connection_string}')
print('connected')

app = Flask(__name__)


# Home route - landing page
@app.route ('/')
def index():
    return render_template('index.html')

###########################################
########### start of map laoding activities
###########################################
from datalayer import Datalayer
db = Datalayer()

# create route that renders map.html template
@app.route("/data")
def data():

    mls_df = db.getRawDataFromDB()
    geojson = db.convertToGeoJSon(mls_df)

    # check name of file being passed to map.html
    return render_template("map.html",data=jsonify(geojson))
    # return jsonify(geojson)

# create route that renders map.html template
@app.route("/scatter")
def scatter():
    return render_template("index_scatter.html")

# create route that renders index.html template
@app.route("/map")
def map():
    return render_template("map.html")

# 404 error handling
@app.errorhandler(404)
def page_not_found(error):
    # directed to 404 html
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.debug = True
    app.run()

