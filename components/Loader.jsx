import React from 'react'

const Loader = () => {
  return (
    <>
        <style jsx>
            {`
              .custom{
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
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
                animation: ball .5s ease infinite alternate
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
      <span className="customText">Loading Data...</span>
    </div>
    </>
  )
}

export default Loader