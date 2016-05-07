from leg import Leg
import json

class Route(object):
    length = property(lambda self: sum([int(leg.distance.get('value')) for leg in self.legs]))
    length_km = property(lambda self: self.length / 1000.00)
    st_location = property(lambda self: self.legs[0].start_location)
    end_location = property(lambda self: self.legs[-1].end_location)
    pois_total_grade = property(lambda self: sum(poi.yapq_grade for poi in self.pois))

    def __init__(self, route_id=None, route_json=None, pois=None):
        self.route_id = route_id
        self.pois = pois
        self.legs = [Leg(leg_json) for leg_json in route_json.get('legs')]

    def get_metadata(self):
        return {"length": self.length_km, "pois": [poi.__dict__ for poi in self.pois],
                "total_yapq_grade": self.pois_total_grade}
