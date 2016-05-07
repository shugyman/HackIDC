class Leg(object):
    def __init__(self, leg_json):
        for key in leg_json:
            setattr(self, key, leg_json.get(key))
