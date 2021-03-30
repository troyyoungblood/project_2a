
from flask import Flask, render_template,jsonify
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, inspect, join, outerjoin, MetaData, Table
import psycopg2
import pandas as pd
import numpy as np
from secrets import username, password

from config import connect_string
    
    
class DataSet():

    def __init__(self):
        self.engine = create_engine(connect_string)
        # self.conn = self.engine.connect()
        # self.connect_string = connect_string
        # self.inspector = inspect(self.engine)
        # self.tables = self.inspector.get_table_names()
        # self.Base = automap_base()
        # self.Base.prepare(self.engine, reflect=True)
        # print(self.tables)
        # self.Subjects = self.Base.classes.mls
        # # self.Subjects = self.Base.classes['elementary_table']
        # self.meta = MetaData()


    def getRawDataFromDB(self):
        session = Session(self.engine)
        conn = self.engine.connect()
        # # ORM setup
        # Base = automap_base()
        # Base.prepare(engine, reflect=True)
        # Session = sessionmaker()
        # Session.configure(bind=engine)

        mls = pd.read_sql_query("SELECT * FROM mls",conn)

        # print(mls)

        return mls


    # def convertToGeoJSon(self,mls):
    #     ## removed rating from end of line to see if har1 will load
    #     properties = ['mls', 'zip', 'subdivision', 'year_built', 'bedrooms', 'full_baths', 'total_baths',  'list_price', 'market_area', 'area', 'elementary','high_school','full_address','latitude','longitude', 'rating']
    #     df_subset = mls[properties]
    #     # Drop any rows that lack lat/long data
    #     # df_geo = df_subset.dropna(subset=['latitude', 'longitude'], axis=0, inplace=False)
    #     df = df_subset.applymap(str)
    #     print('We have {} geotagged rows'.format(len(df)))

    #     lat = "latitude"
    #     lon = "longitude"

    #     # create a new python dict to contain our geojson data, using geojson format
    #     geojson = {'features':[]}

    #     # loop through each row in the dataframe and convert each row to geojson format
    #     for _, row in df.iterrows():
    #         # create a feature template to fill in
    #         feature = {'type':'Feature',
    #         'properties':{},
    #         'geometry':{'type':'Point', 'coordinates':[]}}

    #         # fill in the coordinates
    #         feature['geometry']['coordinates'] = [row[lon],row[lat]]

    #     # for each column, get the value and add it as a new feature property
    #     for prop in properties:
    #         feature['properties'][prop] = row[prop]

    #         # add this feature (aka, converted dataframe row) to the list of features inside our dict
    #         geojson['features'].append(feature)

    #     return geojson