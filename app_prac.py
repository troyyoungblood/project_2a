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
# from datalayer import convertToGeoJSon, recordCount
from datalayer import recordCount

# Connect to sql database
engine = create_engine("postgresql://postgres:(#2020)MagHou@localhost:5432/etl_team5")
# engine = create_engine("postgresql://{username}:{password}@localhost:5432/etl_team5")
conn=engine.connect()

# # Connect to sql database
# rds_connection_string = f"{username}:{password}@localhost:5432/etl_team5"
# engine = create_engine(f'postgresql://{rds_connection_string}')
print('connected')

app = Flask(__name__)


# Home route - landing page
@app.route ('/')
def index():
    return render_template('index.html')

# create route that renders map.html template
@app.route("/map")
def map():
    return render_template("map.html")

# create route that renders map.html template
@app.route("/orlando")
def orlado():
    return render_template("index_orlando.html")        

# create route that renders map.html template
@app.route("/scatter")
def scatter():
    return render_template("index_scatter.html")

# ###########################################
# ########### start of data loading activities
# ###########################################
# from data_sql_conn import DataSet
# db_data = DataSet()

# # create route that renders map.html template
# @app.route("/get_data")
# def get_data():

#     # mls_data = db_data.getRawDataFromDB().to_json()
#     mls_data = db_data.getRawDataFromDB().to_dict()
#     # geojson = db.convertToGeoJSon(mls_df)

#     # check name of file being passed to map.html
#     # return render_template("map.html",data=jsonify(geojson))
#     print(type(mls_data))
#     # mls_json = DataFrame.tojson(orient = "records")
#     # # mls_json = jsonify(mls_data)
#     # print(type(mls_json))
#     # print(mls_data)
#     # return (mls_data)

@app.route("/data/count")
def count():

    count = recordCount(conn)

    return (count)


# 404 error handling
@app.errorhandler(404)
def page_not_found(error):
    # directed to 404 html
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.debug = True
    app.run()

