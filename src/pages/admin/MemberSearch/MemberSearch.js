import React from 'react'
import "assets/css/MemberSearch/MemberSearch.css"
import MemberSearchResult from './MemberSearchResult/MemberSearchResult'
import SearchBox from 'components/Search/SearchBox';
const MemberSearch = () => {
 
  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-lg-12 layout-spacing">
          <SearchBox heading="Licensee Search" type="member"/>
          <br />
          <MemberSearchResult />
          <br /><br /><br />
        </div>
      </div>
    </div>
  )
}

export default MemberSearch