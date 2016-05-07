from leg import Leg
import json

class Route(object):
    length = property(lambda self: sum([int(leg.distance.get('value')) for leg in self.legs]))
    length_km = property(lambda self: self.length / 1000.00)
    st_location = property(lambda self: self.legs[0].start_location)
    end_location = property(lambda self: self.legs[-1].end_location)

    @property
    def waypoints(self):
        waypoints = []
        for leg in self.legs:
            if leg.start_location not in waypoints:
                waypoints.append(leg.start_location)
        return waypoints

    def __init__(self, route_id=None, route_json=None, pois=None):
        self.route_id = route_id
        self.pois = pois
        self.legs = [Leg(leg_json) for leg_json in route_json.get('legs')]

    def get_metadata(self):
        return {"length": self.length_km, "pois": [poi.__dict__ for poi in self.pois]}

    def rank(self, max_distance):
        return self.distance_rank(max_distance) + self.poi_rank()

    def distance_rank(self, max_distance):
        return abs(self.length_km - max_distance)

    def poi_rank(self):
        max_rank = max([poi.yapq_grade for poi in self.pois])
        rank = 5 - max_rank
        return rank
