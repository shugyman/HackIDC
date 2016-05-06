from geopy.distance import vincenty
from itertools import permutations

from route import Route
from poi.cache import POICache
from google_api import get_route
import uuid


def calculate_routes(lat, lon, pois, max_dist):
    # Get POI objects from cache by id.
    poi_objects = get_poi_objects(pois)

    # Get the possible routes where the minimal distance of the routes passing through a bunch of pois
    # is shorter than the user's max distance allowed,
    possible_routes = get_possible_routes(lat, lon, poi_objects, max_dist)

    # Get the routes as a google route.
    google_routes = get_google_routes(lat, lon, possible_routes)

    # Final filter the google routes.
    final_routes = []
    for route in google_routes:
        if assert_google_route(route):
            final_routes.append(route)

    sort_routes(final_routes, max_dist)

    return final_routes


def get_poi_objects(poi_ids):
    cache = POICache()
    return [cache.cache[id] for id in poi_ids]


def get_possible_routes(lat, lon, pois, max_dist):
    # Get all the permutations of all the pois.
    # If there is a permutation of a set of pois that match our criteria, the order doesn't matter.
    # That's why I store it in sets.

    possible_routes = []
    for i in xrange(1, len(pois) + 1):
        for permu in permutations(pois, i):
            if assert_initial_route(lat, lon, permu, max_dist):
                permu_set = set(permu)
                if permu_set not in possible_routes:
                    possible_routes.append(permu_set)

    return possible_routes


def get_google_routes(lat, lon,  possible_routes):
    routes = []
    for route in possible_routes:
        routes.append(Route(str(uuid.uuid4()), get_route((lat, lon), (lat, lon), [(poi.lat, poi.lon) for poi in route]), route))
    return routes


def assert_initial_route(lat, lon, pois, max_dist):
    # check if the possible distance of the route exceeds the max user wanted distance.

    d = 0
    prev = (lat, lon)
    for p in pois:
        cur = (p.lat, p.lon)
        d += calc_dis(prev, cur)
        prev = cur

    # close the circle
    last = pois[-1]
    d += calc_dis((last.lat, last.lon), (lat, lon))

    return d <= max_dist


def assert_google_route(route):
    return True


def calc_dis(p1, p2):
    return vincenty(p1, p2).km


def sort_routes(routes, distance):
    return sorted(routes, key = lambda route: abs(route.length_km - distance))