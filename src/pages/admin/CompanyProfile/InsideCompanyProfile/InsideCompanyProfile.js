import React, { useEffect, useState } from 'react'
import "assets/css/CompanyProfile/CompanyProfile.css"
import BoldHeading from 'components/BoldHeading/BoldHeading';
import { VectorMap } from "react-jvectormap";

const InsideCompanyProfile = ({ data, info, bInfo, country, branchId }) => {

  const handleClick = (e, countryCode) => {
    console.log(countryCode);
  };

  const [marker, setMarker] = useState([]);
  useEffect(() => {
    const lm = [];
    if (
      info?.latitude !== null
      && info?.longitude !== null
      && info?.latitude !== ''
      && info?.longitude !== ''
    ) {
      lm.push({
        latLng: [info.latitude, info.longitude],
        name: info.city
      })
    }
    if (data.length > 0) {
      data.map(item => {
        if (item?.latitude !== null
          && item?.longitude !== null
          && item?.latitude !== ''
          && item?.longitude !== '') {
          lm.push({
            latLng: [item.latitude, item.longitude],
            name: item.city
          })
        }
      })
    }
    setMarker(lm);
  }, [info, data])


  return (
    <div className="col-xl-12 col-lg-8 col-md-12" style={{marginTop:"25px"}}>     
      <div className="profile-info">
        <div className="widget-header">
          <BoldHeading
            Boldheading="Company Location"
          />
        </div>
        <br />
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
  )
}

export default InsideCompanyProfile