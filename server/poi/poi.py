class POI:
    def __init__(self, geoname_id= None, title=None,
                 lon=None, lat=None, yapq_grade=None):
        self.geoname_id = geoname_id
        self.title = title
        self.lon = lon
        self.lat = lat
        self.yapq_grade = yapq_grade

    def __hash__(self):
        return self.geoname_id

    def __eq__(self, other):
        return self.geoname_id == other.geoname_id

    def __str__(self):
        return str(self.geoname_id)