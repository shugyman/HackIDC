from geopy.distance import vincenty
from itertools import permutations

from route import Route
from poi.cache import POICache

MAX_DIST_MULTIPLIER = 1.2


def calculate_routes(lat, lon, pois, distance):
    poi_objects = get_poi_objects(pois)

    max_dist = distance * MAX_DIST_MULTIPLIER
    possible_routes = get_possible_routes(lat, lon, poi_objects, max_dist)

    google_routes = get_google_routes(possible_routes)

    final_routes = []
    for route in google_routes:
        if assert_google_route(route):
            final_routes.append(route)

    return final_routes


def get_poi_objects(poi_ids):
    cache = POICache()
    return [cache.cache[id] for id in poi_ids]


def get_possible_routes(lat, lon, pois, max_dist):
    possible_routes = []
    for i in xrange(1, len(pois) + 1):
        for permu in permutations(pois, i):
            if assert_initial_route(lat, lon, permu, max_dist):
                possible_routes.append(permu)

    return possible_routes


def get_google_routes(possible_routes):
    return possible_routes


def assert_initial_route(lat, lon, pois, max_dist):
    d = 0
    prev = (lat, lon)
    for p in pois:
        cur = (p.lat, p.lon)
        d += calc_dis(prev, cur)
        prev = p

    # close the circle
    last = pois[-1]
    d += calc_dis((last.lon, last.lat), (lon, lan))

    return d <= max_dist


def assert_google_route(route):
    return True


def calc_dis(p1, p2):
    return vincenty(p1, p2).km

