#import geopandas as gpd
import pandas as pd
from shapely.geometry import Polygon, MultiPolygon
import ast
import requests

SERVER_URL = "http://localhost:8000"
CREATE_FIGURES_URL = SERVER_URL + '/create_figures'

df = pd.read_csv('raw_data.csv')

figures = []

for i, r in df.iterrows():

    footprints = ast.literal_eval(r.footprints_used)

    if footprints['type'] == 'Polygon':
        figure = Polygon(footprints['coordinates'][0])

    elif footprints['type'] == 'MultiPolygon':

        polygons = [Polygon(polygon[0]) for polygon in footprints['coordinates']]
        figure = MultiPolygon(polygons)

    else:
        raise Exception('Figure is not a polygon or a multigone.')

    figures.append({
        "org_id": r.org_id,
        "figure": f"{figure}"
    })

response = requests.put(CREATE_FIGURES_URL, json=figures)
response.raise_for_status()