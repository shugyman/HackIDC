from leg import Leg

class Route(object):
    length = property(lambda self: sum(int(leg.distance.get('value') for leg in self.legs)))
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

    def __init__(self, route_id=None, route_json=None):
        self.route_id = route_id
        self.legs = [Leg(leg_json) for leg_json in route_json.get('legs')]
