import React, { useState, useEffect } from "react";
import flight from "assets/img/flight3.png"
import talalogo from "assets/img/translogo1.png"
import "assets/css/Login.css"
import log1 from "assets/img/sign8.png"
import { useForm } from "react-hook-form";
import { forgetPassword } from "redux/Actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { setInitialStateF } from "redux/Reducers/AuthenticationSlice";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMessageF, errorF } = useSelector(state => state.authentication);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [disable, setDisable] = useState(false);
  const { isSuccess } = useSelector(state => state.authentication);
  const { isLoggedin } = useSelector(state => state.loggedin);
  useEffect(() => {
    if (isSuccess || isLoggedin) {
      navigate(`/dashboard`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isMessageF) {
      toast.success(`${isMessageF?.msg}`, {
        toastId: 'success',
        autoClose: 2000
      });
      setValue('email', '');
      setTimeout(() => {
        dispatch(setInitialStateF());
        setDisable(true);
        // navigate(`/reset-password/${isMessageF?.token}`);
      }, 1000);
    }
    if (errorF && Object.keys(errorF).length > 0
      && typeof errorF.message !== "undefined") {
      toast.error(`${errorF.message}`, {
        toastId: 'success',
        autoClose: 2000
      });
      dispatch(setInitialStateF());
      setDisable(false);
    }
  }, [isMessageF, errorF]);
  const onSubmit = (data) => {
    dispatch(forgetPassword(data))
    setDisable(true);
  }

  return (
    <section className="login-block">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="auth-box card">
              <div className="card-block login-form-box checkout-page-style">
                <div className='col-12 d-flex justify-content-center '>
                  <img src={talalogo} className="img-fluid" style={{ width: "150px" }} />
                </div>
                <h3 className="mb-30" style={{ fontSize: "20px", color: "#515365", fontWeight: "700" }}>Forgot Password?</h3>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-box mb-5 mt-4">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className='col-12'
                      {...register("email", {
                        onChange: (e) => { dispatch(setInitialStateF()); },
                        required: "Email should not be empty"
                      })}
                      readOnly={disable}
                    />
                    {errors.email && <span className="error d-block">{errors.email.message}</span>}
                  </div>
                  <div className='col-12 d-flex justify-content-center mb-4'>
                    <button type="submit" className="col-12 col-md-8 col-xl-8 col-lg-8 col-sm-12 btn btn-sm bg-gradient-primary text-white">
                      Send Password Reset Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ForgetPassword;
