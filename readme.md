# Description
# Set Up
## Docker
docker-compose up
## Kafka and ksqlDB

### Connect to CLI
To get into the ksqlDB cli, open a new terminal and run:
docker exec -it ksqldb-cli ksql http://ksqldb-server:8088

### Create Streams
Create a stream that will be written to from web app:

CREATE STREAM riderLocations (profileId VARCHAR, latitude DOUBLE, longitude DOUBLE)
  WITH (kafka_topic='locations', value_format='json', partitions=1);

Create stream that calculates the distance from a given point (in this case, SAU):
CREATE stream currentLocations AS
  SELECT profileId,
         latitude,
         longitude, ROUND(GEO_DISTANCE(latitude, longitude, 35.04758, -85.0498), 2) as DistanceFromSouthern
FROM riderlocations
EMIT CHANGES;

### Push Query
SELECT * FROM currentLocations
WHERE DistanceFromSouthern <= 5
EMIT CHANGES;

