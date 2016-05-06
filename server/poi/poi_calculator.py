from poi import POI
from keys import AMADEUS_KEY
import requests

def get_pois(latitude, longitude, rad):
    pois_lst = []
    yapq_url = "https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-circle"
    payload = {
    "apikey": AMADEUS_KEY,
    "latitude": latitude,
    "longitude": longitude,
    "radius": rad,
    "category": "landmark",
    "number_of_images": 0,
    }
    r = requests.get(yapq_url, params=payload)
    if r.status_code == 200:
        for poi in r.json().get('points_of_interest'):
            pois_lst.append(POI(**parse_poi_dict(poi)))
    else:
        return None

    return pois_lst

def parse_poi_dict(poi):
    geoname_id = poi.get('geoname_id', "N/A")
    title = poi.get('title', "N/A")
    location = poi.get('location')
    lat = location.get('latitude') if location else "N/A"
    lon = location.get('longitude') if location else "N/A"
    grades = poi.get('grades')
    yapq_grade = grades.get('yapq_grade') if grades else "N/A"
    return {"geoname_id": geoname_id, "title": title,
            "lon": lon, "lat": lat, "yapq_grade": yapq_grade}
