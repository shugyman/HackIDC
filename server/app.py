from flask import Flask, request
import json

from poi.poi_calculator import get_pois
from route.routes_calculator import calculate_routes
from route.route import Route

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/GetPOI')
def get_poi():
    lon = request.args.get("lon")
    lat = request.args.get("lat")
    return json.dumps([poi.__dict__ for poi in get_pois(lon, lat)])

@app.route('/GetRoutes')
def get_routes():
    lon = request.args.get("lon")
    lat = request.args.get("lat")
    pois = json.loads(request.args.get("pois"))
    distance = request.args.get("distance")
    return json.dumps([route.__dict__ for route in calculate_routes(lon, lat, pois, distance)])


@app.route('/GetRoute')
def get_route():
    route_id = request.args.get("route_id")
    return json.dumps(Route())


if __name__ == '__main__':
    app.run(port=80, debug=True)