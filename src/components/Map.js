import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
const CENTER = { lat: 37.7749, lng: -122.4194 };
const NORTHWEST = { lat: 37.808983, lng: -122.520341 };
const SOUTHEAST = { lat: 37.708826, lng: -122.362412 };

const seaCliff = {
  type: "Feature",
  properties: {
    link: "http://en.wikipedia.org/wiki/Sea_Cliff,_San_Francisco,_California",
    name: "Seacliff",
  },
  geometry: {
    type: "MultiPolygon",
    coordinates: [
      [
        [
          [-122.49345526799993, 37.78351817100008],
          [-122.49372649999992, 37.78724665100009],
          [-122.49358666699993, 37.78731259500006],
          [-122.49360569399994, 37.78752774600008],
          [-122.49283007399993, 37.787882585000034],
          [-122.4927566799999, 37.78773917700005],
          [-122.48982906399993, 37.789482184000065],
          [-122.48899105699991, 37.78928318700008],
          [-122.4878640209999, 37.78958817900008],
          [-122.48736904899994, 37.78942984100007],
          [-122.48598032899991, 37.79080370600008],
          [-122.48581537399991, 37.79070384600004],
          [-122.48557750799989, 37.790559847000054],
          [-122.4850531269999, 37.79036813300007],
          [-122.4842660519999, 37.789411709000035],
          [-122.48407706799992, 37.78939909400009],
          [-122.4838230019999, 37.78928250300004],
          [-122.48370738599994, 37.788776950000056],
          [-122.4839269609999, 37.788315201000046],
          [-122.4839504329999, 37.78802775100007],
          [-122.48414271299993, 37.78777522900009],
          [-122.4841506649999, 37.787554653000086],
          [-122.48463982999994, 37.78753212700008],
          [-122.48464285299991, 37.787378785000044],
          [-122.48431022499994, 37.78735203400004],
          [-122.4841736059999, 37.78731086500005],
          [-122.48407980499991, 37.78579452900004],
          [-122.48728636499993, 37.78564884000008],
          [-122.48715071499993, 37.783785427000055],
          [-122.49345526799993, 37.78351817100008],
        ],
      ],
    ],
  },
};
function Map() {
  const [map, setMap] = useState(null);
  const [districtData, setDistrictData] = useState();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  useEffect(() => {
    if (isLoaded) {
      console.log("loaded google Maps API");
    }
  }, [isLoaded]);
  // On Mount
  useEffect(() => {
    fetch("./GeoData.json")
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((geoData) => {
        console.log("need to lood data");
      });
  }, []);

  function featureMouseOverHandler(e) {
    console.log(e);
  }
  const onMapLoad = function (m) {
    setMap(m);
    m.data.addGeoJson(seaCliff);
    m.data.addListener("mouseover", (e) => {
      console.log(e);
      map.data.getFeatureById(e.feature.getId()).style
    });
  };

  return (
    isLoaded && (
      <Box pos="absolute" w="100%" h="100%">
        <GoogleMap
          clickableIcons={false}
          options={{
            restriction: {
              latLngBounds: {
                north: NORTHWEST["lat"],
                south: SOUTHEAST["lat"],
                west: NORTHWEST["lng"],
                east: SOUTHEAST["lng"],
              },
            },
          }}
          center={CENTER}
          zoom={15}
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        ></GoogleMap>
      </Box>
    )
  );
}

export default Map;