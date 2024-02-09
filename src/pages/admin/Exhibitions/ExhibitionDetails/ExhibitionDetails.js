import React, { useState, useEffect } from 'react'
import "assets/css/Exhibitions/Exhibitions.css"
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTeamMembers,
  getExhibition
} from "redux/Actions/EventExhibition";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { useNavigate } from "react-router-dom";
import AddEvent from './AddEvent';
import Exhibition from './Exhibition';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { FiInbox } from "react-icons/fi"
import { ToastContainer, toast } from 'react-toastify';
import { setInitialState } from "redux/Reducers/EventExhibitionSlice";

const ExhibitionDetails = ({
  setShowDetails,
  showDetails }) => {
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  useEffect(() => {
    const data = {};
    if (year) {
      data.year = year
    }
    else {
      data.year = showDetails
    };
    if (month) { data.month = month }
    dispatch(getExhibition(data));
  }, [month, showDetails]);

  const onChange = (date, dateString) => {
    if (dateString !== '') {
      setMonth(moment(dateString).format('MM'));
      setYear(moment(dateString).format('YYYY'));
    } else {
      setMonth(false);
    }
  };
  const { isSuccess, isError } = useSelector(state => state.exhibition);
  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(isSuccess).length > 0
        && typeof isSuccess.msg !== 'undefined') {
        toast.success(`${isSuccess.msg}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      dispatch(setInitialState(false));
      dispatch(getExhibition({ year: showDetails }))
    }
    if (isError) {
      if (Object.keys(isError).length > 0
        && Object.keys(isError.error).length > 0
        && typeof isError.error.exhibitions !== 'undefined'
        && isError.error.exhibitions.length > 0) {
        toast.error(`${isError.error.exhibitions[0]}`, {
          toastId: 'error',
          autoClose: 1000
        })
      }
      dispatch(setInitialState(false));
    }
  }, [isSuccess, isError]);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    tokenExp,
    teamMember,
    exhibitionDetails,
  } = useSelector(state => state.exhibition);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp]);

  useEffect(() => {
    dispatch(getTeamMembers());
  }, []);

  const [isTrash, setIsTrash] = useState()
  const exhbitionHandle = (event) => {
    exhibitionDetails.data.map((data) => {
      const isTrashed = data.is_trash === 1
      setIsTrash(isTrashed)
    })
    setActive(event.target.id);
  }
  // const [isTrash, setIsTrash] = useState()
  const exhbitionUpcomingHandle = (event) => {
    exhibitionDetails.data.map((data) => {
      const isTrashed = data.is_trash === 0
      setIsTrash(isTrashed)
    })
    setActive(event.target.id);
  }

  const [active, setActive] = useState("1");
  return (
    <div className="layout-px-spacing">
      <ToastContainer />
      <div className="row layout-spacing layout-top-spacing" id="cancel-row">
        <div className="col-lg-12">
          <div className="widget-content searchable-container grid">
          <div className="card-box">
              <div className="row">
                <div className="col-xl-12 col-lg-12 align-self-center d-flex flex-md-row flex-column w-100">
                  <div className='col-12 col-md-3 mb-3 mb-md-0 mb-xl-0 mb-lg-0 d-flex justify-content-center justify-content-md-start justify-content-xl-start justify-content-lg-start'>
                    <Space direction="vertical">
                      <DatePicker onChange={onChange} className='datepicker' picker="month" />
                    </Space>
                  </div>
                  <div className='col-12 col-md-9 d-flex flex-md-row flex-column justify-content-center'>
                    <div className="col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">
                      <button type="button" style={{ fontSize: "13px" }} onClick={() => setShow(true)}
                        className='btn btn-outline-success contactUs' href="https://youtube.com/c/shortcode"
                      >
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <div className=''> Add Event</div>
                      </button>
                    </div>
                    <div className="col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">
                      <button
                        key={1}
                        id={"1"}
                        type="button"
                        style={{ fontSize: "13px" }}
                        className={active === "1" ? "btn btnactive" : "btn btn-outline-success"}
                        onClick={exhbitionUpcomingHandle}
                      >
                        Upcoming Events
                      </button>
                    </div>
                    <div className="col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">
                      <button type="button"
                        key={3}
                        id={"3"}
                        className={active === "3" ? "btn btnactive" : "btn btn-outline-success"}
                        style={{ fontSize: "13px" }}
                        onClick={() => setShowDetails(1)}
                      >
                        Event Attendees
                      </button>
                    </div>
                    <div className="col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">
                      <button type="button"
                        key={2}
                        id={"2"}
                        className={active === "2" ? "btn btnactive" : "btn btn-outline-success"}
                        style={{ fontSize: "13px" }}
                        onClick={exhbitionHandle}
                      >
                        View Past Events
                      </button>
                    </div>                   
                  </div>
                
                  <AddEvent show={show} setShow={setShow} year={showDetails} />
                </div>
              </div>
            </div>
            {isTrash === false ?
              <div className="col-xl-12 col-md-12 col-sm-12 col-12 mt-4">
                <h5 style={{ textAlign: "center", color: "white", backgroundColor: "#1b4d70", padding: "15px" }}>
                  Past Events
                </h5>
              </div>
              :
              <div className="col-xl-12 col-md-12 col-sm-12 col-12 mt-4">
                <h5 style={{ textAlign: "center", color: "white", backgroundColor: "#1b4d70", padding: "15px" }}>
                  Upcoming Events
                </h5>
              </div>
            }
            {Object.keys(exhibitionDetails).length > 0
              && exhibitionDetails.data.length > 0
              ? exhibitionDetails.data.map((item, index) => {
                return (
                  <Exhibition
                    key={`ex${index}`}
                    item={item}
                    teamMember={teamMember}
                    isTrash={isTrash}
                  />
                )
              }) :
              <div className="card-box col-lg-12" style={{ marginTop: "25px" }}>
                <div className='d-flex flex-column justify-content-center dataNotfound'>
                  <div className='d-flex justify-content-center'>
                    <FiInbox style={{ fontSize: "30px", color: "#666666" }} />
                  </div>
                  <div className='d-flex justify-content-center' style={{ color: "#666666" }}>
                    Data not found...
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExhibitionDetails
