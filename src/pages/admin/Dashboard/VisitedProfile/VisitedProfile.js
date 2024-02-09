import React, { useEffect, useState } from 'react'
import "assets/css/Dashboard/VisitedProfile.css"
import BoldHeading from 'components/BoldHeading/BoldHeading';
import { VectorMap } from "react-jvectormap";
const VisitedProfile = ({ visitedProfiles }) => {

  const handleClick = (e, countryCode) => {
    console.log(countryCode);
  };
  const [marker, setMarker] = useState([]);
 
  useEffect(() => {
    const lm = [];
   
    if (Object.keys(visitedProfiles).length > 0
      && Object.keys(visitedProfiles.data).length > 0) {
      visitedProfiles.data.map(item => {
        if (
          item?.latitude !== null
          && item?.longitude !== null
          && item?.latitude !== ''        
          && item?.longitude !== '') {
          lm.push({
            latLng: [item.latitude, item.longitude],
            name: `${item.first_name} ${item.last_name}`,
            company: `${item?.company_name}`
          })
        }
      })
    }
    setMarker(lm);
  }, [visitedProfiles]);
  return (
    <div className="col-xl-8 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing" style={{marginTop:"10px"}}>
      <div className="widget widget-chart-one">
        <BoldHeading
          Boldheading="Licensees who visited your profile"
        />
        <div className="">
          <div className="row mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div id="world-map" className='talaMap' style={{ borderRadius: "16px", overflow: "hidden", backgroundColor: "#1b4d70" }}>
                <VectorMap
                  map={"world_mill"}
                  backgroundColor="transparent"
                  zoomOnScroll={false}
                  containerStyle={{
                    width: "100%",
                    height: "520px"
                  }}
                  onRegionClick={handleClick}
                  containerClassName="map"
                  markerStyle={{
                    initial: {
                      fill: '#F8E23B',
                      stroke: '#383f47'
                    }
                  }}
                  markers={marker}
                  onMarkerTipShow={function (e, el, code) {
                    
                    el.html(el.html() + `
                    <br /> 
                    ${marker[code].company}`);

                  }}


                  regionStyle={{
                    hover: {
                      "fill-opacity": 0.8,
                      cursor: "pointer"
                    },
                    selected: {
                      fill: "#2938bc"
                    },
                    selectedHover: {}
                  }}
                  regionsSelectable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default VisitedProfile