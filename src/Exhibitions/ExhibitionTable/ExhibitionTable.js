import React, { useState, useEffect } from 'react'
import "assets/css/Exhibitions/Exhibitions.css"
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getExhibitionList, getExhibition } from "redux/Actions/EventExhibition";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { FaPaperPlane } from "react-icons/fa";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTeamMembers } from "redux/Actions/EventExhibition";
import Exhibition from "../ExhibitionDetails/Exhibition"
import { Select } from 'antd';
import { companyList } from "redux/Actions/Company";
import { loctaionsCountryList } from "redux/Actions/Member";
import { RotatingLines } from 'react-loader-spinner';
import { setClickedMember } from "redux/Reducers/LoggedSlice";
import { toast } from 'react-toastify';
import { setInitialState } from "redux/Reducers/EventExhibitionSlice";
import { BsArrowLeftShort } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBScrollbar,
  MDBCardFooter,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { FaMinus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ExhibitionTable = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const [show, setShow] = useState(false);
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name'
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Licensee Name',
      dataIndex: 'member_name',
      key: 'member_name'
    },
    {
      title: 'Team Member Name',
      dataIndex: 'team_members',
      key: 'team_members'
    },
    {
      title: 'Location',
      dataIndex: 'country',
      key: 'country'
    },
    {
      title: 'Event Name',
      dataIndex: 'exhibition_name',
      key: 'exhibition_name',
    },
    {
      title: 'Event Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Booth No',
      dataIndex: 'booth_number',
      key: 'booth_number'
    },
    {
      title: 'Connect',
      dataIndex: 'connecticon',
      key: 'connect',
      render: (item) => {
        return (
          <>
            {/* <button type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleOnClick(item?.id, item)}>
            Click Here
          </button> */}
            <div onClick={() => setShow(true)}>
              <FaPaperPlane style={{ cursor: "pointer" }} />
            </div>
          </>)
      }
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const {
    exhibitionDetails,
    teamMember,
    isSuccess } = useSelector(state => state.exhibition);
  const [eventHead, setEventHead] = useState(false);

  useEffect(() => {
    if (typeof id !== 'undefined') {
      const data = exhibitionDetails.data.find((item) => item.id == id);
      dispatch(getTeamMembers());
      const ye = data?.year.split('/');
      setEventHead(data);
      if (isSuccess) {
        if (Object.keys(isSuccess).length > 0
          && typeof isSuccess.msg !== 'undefined') {
          toast.success(`${isSuccess.msg}`, {
            toastId: 'success',
            autoClose: 1000
          })
        }
        dispatch(setInitialState(false));
        dispatch(getExhibition({ year: ye[2] }))
      }
      dispatch(getExhibitionList({ event_id: id }))
    } else {
      dispatch(getExhibitionList({}));
    }
  }, [id, isSuccess, exhibitionDetails])

  const { isLoading, tokenExp, exhibitionList } = useSelector(state => state.exhibition);
  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp]);
  const [exhibition, setExhibition] = useState([]);
  const [rowSeleted, setRowSelected] = useState(false);
  // useEffect(() => {
  //   if (rowSeleted) {
  //     if (Object.keys(exhibitionList).length > 0
  //       && exhibitionList.data.length > 0) {
  //       dispatch(setClickedMember(rowSeleted));
  //       navigate(`/companyprofile/${rowSeleted.company_id}/${rowSeleted.member_id}`)
  //     }
  //   }
  // }, [rowSeleted])

  useEffect(() => {
    let tex = [];
    if (Object.keys(exhibitionList).length > 0
      && Object.keys(exhibitionList.data).length > 0) {
      exhibitionList.data.map((item, index) => {
        tex.push({
          key: index,
          allocated_id: item.allocated_id ? item.allocated_id : '-',
          arrival: item.arrival ? item.arrival : '-',
          attended_at: item.attended_at ? item.attended_at : '-',
          attending: item.attending ? item.attending : '-',
          booth_number: item.booth_number ? item.booth_number : '-',
          company_exhibiting: item.company_exhibiting ? item.company_exhibiting : '-',
          company_id: item.company_id ? item.company_id : '-',
          company_name: item.company_name ? item.company_name : '-',
          connect: item.connect ? item.connect : '-',
          country: item.country ? item.country : '-',
          departure: item.departure ? item.departure : '-',
          email: item?.member_email ? item?.member_email : '-',
          event_date: item?.event_date ? item?.event_date : '-',
          exhibition_name: item?.exhibition_name ? item?.exhibition_name : '-',
          id: item.member_id ? item.member_id : '-',
          is_canceled: item.is_canceled ? item.is_canceled : '-',
          member_email: item.member_email ? item.member_email : '-',
          member_id: item.member_id ? item.member_id : '-',
          member_name: item.member_name ? item.member_name : '-',
          month: item.month ? item.month : '-',
          other_team_members: item.other_team_members ? item.other_team_members : '-',
          team_members: item.team_members ? item.team_members : '-',
          connecticon: <FaPaperPlane style={{ cursor: "pointer" }} />
        })
      });
    }
    setExhibition(tex);
  }, [exhibitionList]);

  const { companyListData } = useSelector(state => state.company);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    let company = [];
    if (Object.keys(companyListData).length > 0
      && companyListData.data.length) {
      companyListData.data.map(item => {
        company.push({
          value: item.company_name,
          label: item.company_name
        })
      })
    }
    setCompany(company);
  }, [companyListData])
  const { countryList } = useSelector(state => state.member);
  const [country, setCountry] = useState([]);
  useEffect(() => {
    let country = [];
    if (Object.keys(countryList).length > 0
      && countryList.data.length) {
      countryList.data.map(item => {
        country.push({
          value: item,
          label: item
        })
      })
    }

    setCountry(country);
  }, [countryList]);
  useEffect(() => {
    dispatch(companyList());
    dispatch(loctaionsCountryList());
  }, []);

  const [SCD, setSCD] = useState({});
  const handleOnChange = (value, name) => {
    setSCD({ [name]: value })
    let finaldata = {};
    if (typeof id !== 'undefined') {
      finaldata.event_id = id;
    }
    if (typeof value !== 'undefined') {
      finaldata[name] = value;
    }
    dispatch(getExhibitionList(finaldata));
  }

  return (
    <>
      <div className="col-xl-12 col-lg-12 align-self-center w-100 mt-3 mb-3">
        <Link onClick={() => navigate(-1)}>
          <div className="btn btn-sm readmorebtn text-white p-1">
            <i className="las la-arrow-left">
              <BsArrowLeftShort />
            </i>
            Back
          </div>
        </Link>
      </div>
      {typeof id !== 'undefined' &&
        <>
          <Exhibition
            key={`ex54`}
            item={eventHead}
            teamMember={teamMember}
          />
        </>
      }
      <div className="layout-pxx-spacing col-xl-12 col-lg-4 col-md-12 col-12 col-sm-12 mb-4">
        <div className="statbox widget box box-shadow">
          <div className="widget-header">
            <div className="col-12 d-flex flex-md-row flex-column mb-5 ">
              <div className="col-12 col-md-4">
                <h4 className='annualTitles'>Exhibition</h4><br />
              </div>
              <div className='col-12 d-flex flex-md-row flex-column col-md-8 justify-content-md-end justify-content-start gap-3'>
                <div className='col-12 col-md-5 d-flex justify-content-end  contact-options'>
                  <Select
                    value={SCD?.company}
                    allowClear
                    showSearch
                    style={{ width: "100%", marginTop: "10px" }}
                    placeholder={'Select Company Name'}
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    optionFilterProp={'children'}
                    options={company}
                    onChange={(value) => {
                      handleOnChange(value, 'company');
                    }}
                  />
                </div>
                <div className='col-12 col-md-5 d-flex justify-content-end  contact-options'>
                  <Select
                    value={SCD?.country}
                    allowClear
                    showSearch
                    style={{ width: "100%", marginTop: "10px" }}
                    placeholder={'Select Country'}
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    optionFilterProp={'children'}
                    options={country}
                    onChange={(value) => {
                      handleOnChange(value, 'country');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-100'>
            {!isLoading ?
              <Table
                scroll={{
                  x: 600,
                }}
                columns={columns}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => {
                      setRowSelected(record);
                    }
                  };
                }}
                expandable={{
                  expandedRowRender: (record) => (
                    <div
                      style={{
                        margin: 0,
                      }}
                    >
                      Arrival Date - {record.arrival}<br />
                      Departure Date - {record.departure}
                    </div>
                  ),
                }}
                dataSource={exhibition}
                pagination={{
                  defaultPageSize: 20,
                  showSizeChanger: true,
                  pageSizeOptions: ['20', '50', '100']
                }}
              />
              :
              <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
                <RotatingLines
                  strokeColor="#bbce00"
                  strokeWidth="5"
                  animationDuration="1.00"
                  width="70"
                  visible={true}
                />
              </div>
            }
          </div>
        </div>
        <Modal show={show} onHide={() => setShow(false)} dialogClassName="">
          {/* <Modal.Header closeButton>
            <Modal.Title>Connect</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            {/* <MDBContainer fluid className="py-5"> */}
            <MDBRow className="d-flex justify-content-center">
              <MDBCol md="12" lg="12" xl="12">
                <MDBCard>
                  <MDBCardHeader
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ borderTop: "4px solid #BBCE00" }}
                  >
                    <h5 className="mb-0">Chat messages</h5>
                    <div className="d-flex flex-row align-items-center">
                      {/* <span className="badge bg-warning me-3">20</span> */}
                      <FaMinus
                        className="me-3 text-muted"
                      />
                      <IoMdClose
                        className="me-3 text-muted"
                        style={{fontSize:"18px"}}
                      />
                    </div>
                  </MDBCardHeader>
                  {/* <MDBScrollbar
                      suppressScrollX
                      style={{ position: "relative", height: "400px" }}
                    > */}
                  <MDBCardBody>
                    <div className="d-flex justify-content-between">
                      <p className="small mb-1">Timona Siera</p>
                      <p className="small mb-1 text-muted">23 Jan 2:00 pm</p>
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-3 rounded-3"
                          style={{ backgroundColor: "#e2f3ff" }}
                        >
                          For what reason would it be advisable for me to think
                          about business content?
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="small mb-1 text-muted">23 Jan 2:05 pm</p>
                      <p className="small mb-1">Johny Bullock</p>
                    </div>
                    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                      <div>
                        <p className="small p-2 me-3 mb-3 text-white rounded-3" style={{backgroundColor:"#BBCE00"}}>
                          Thank you for your believe in our supports
                        </p>
                      </div>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="small mb-1">Timona Siera</p>
                      <p className="small mb-1 text-muted">23 Jan 5:37 pm</p>
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-3 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing elit
                          similique quae consequatur
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="small mb-1 text-muted">23 Jan 6:10 pm</p>
                      <p className="small mb-1">Johny Bullock</p>
                    </div>
                    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                      <div>
                        <p className="small p-2 me-3 mb-3 text-white rounded-3 " style={{backgroundColor:"#BBCE00"}}>
                          Dolorum quasi voluptates quas amet in repellendus
                          perspiciatis fugiat
                        </p>
                      </div>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                    </div>
                  </MDBCardBody>
                  {/* </MDBScrollbar> */}
                  <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                    <MDBInputGroup className="mb-0">
                      <input
                        className="form-control"
                        placeholder="Type message"
                        type="text"
                      />
                      <MDBBtn color="" style={{ paddingTop: ".55rem",backgroundColor:"green" }}>
                        Send
                      </MDBBtn>
                    </MDBInputGroup>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            {/* </MDBContainer> */}
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default ExhibitionTable
