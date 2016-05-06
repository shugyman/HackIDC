import googlemaps
from keys import GOOGLE_KEY

def get_route(st_point=None, end_point=None, waypoints=None):
    gmaps = googlemaps.Client(key = GOOGLE_KEY)
    res = gmaps.directions(st_point, end_point, waypoints=waypoints, alternatives=True)
    return res
