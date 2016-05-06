class POI:
    def __init__(self, geoname_id= None, title=None,
                 lon=None, lat=None, yapq_grade=None):
        self.geoname_id = geoname_id
        self.title = title
        self.lon = lon
        self.lat = lat
        self.yapq_grade = yapq_grade
