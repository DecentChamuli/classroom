import Head from 'next/head'
import React, { useContext } from 'react'
import { RiLoader3Line } from 'react-icons/ri'
import AuthContext from '../stores/authContext'

export const DotsLoader = ({loadingText}) => (
  <>
    <style jsx>
      {`
        .custom{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 10%;
        }
        .balls{
          display: flex;
        }
        .ball{
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: transparent;
          outline: 3px solid gray;
          margin-right: 15px;
          animation: ball .5s ease infinite alternate;
        }
        .ball2{
          animation-delay: 0.1s;
        }
        .ball3{
          animation-delay: 0.2s;
        }
        .customText{
          font-weight: 700;
          margin-top: 5px
        }
        @keyframes ball{
          to{
            transform: translateY(-12px);
          }
        }
      `}
    </style>
    <div className='custom'>
      <div className="balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
      <span className="customText">{loadingText}</span>
    </div>
  </>
)

export const CircularLoader = ({color}) => (
  <>
    <style jsx>
      {`
        .loadingIcon{
          color: ${color};
          display: flex;
          justify-content: center;
          font-size: 32px;
          animation: moveCircular 1.2s infinite ;
        }
        @keyframes moveCircular{
          to{
            transform: rotate(360deg);
          }
        }
      `}
    </style>
    <span className="loadingIcon"><RiLoader3Line /></span>
  </>
)

export const FullPageLoader = () => {

  const { pageLoading } = useContext(AuthContext)

  if(!pageLoading) return null

  else return (
    <>
      <style jsx>
        {`
          .container{
            background-color: #f5f3f3;
            height: 100vh;
            width: 100vw;
            top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
            overflow-y: hidden;
            // position: absolute;
            position: fixed;
          }
          .loadingText{
            font-size: 18px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .dots{
            display: flex;
            padding-top: 6px;
            align-items: center;
            margin-left: 10px;
          }
          span{
            animation: appearDelay .5s ease infinite alternate;
            opacity: 1;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background-color: transparent;
            outline: 2px solid gray;
            margin-right: 10px;
          }
          .dot2{
            animation-delay: 0.1s;
          }
          .dot3{
            animation-delay: 0.2s;
          }
          @keyframes appearDelay {
            to{
              opacity: 0;
            }
          }
          @keyframes moveCircular{
            to{
              transform: rotate(360deg);
            }
          }
          .lds-dual-ring{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
          }
          .lds-dual-ring:after {
            content: "";
            display: block;
            width: 25px;
            height: 25px;
            margin: 5px;
            border-radius: 50%;
            border: 5px solid #000;
            border-color: #000 gray gray gray;
            animation: lds-dual-ring 0.8s linear infinite;
          }
          @keyframes lds-dual-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <Head>
        <title>Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className='container'>
        <div className="lds-dual-ring"></div>
        <div className="loadingText">
          <p>Loading</p>
          <div className="dots">
            <span className='dot1'></span>
            <span className='dot2'></span>
            <span className='dot3'></span>
          </div>
        </div>
      </div>
    </>
  )
}