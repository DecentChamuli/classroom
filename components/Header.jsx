import React from 'react'
import styled from 'styled-components'
import { AiOutlinePlus } from "react-icons/ai";

const Header = () => {
  return (
    <Container>
        <div className="left"><h2>Classroom</h2></div>
        <div className="right">
            <div className="plusIcon"><AiOutlinePlus /></div>
        </div>
    </Container>
  )
}

export default Header

const Container = styled.div`
    border-bottom: 0.0625rem solid #e0e0e0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 50px 30px;
    height: 7vh;
    .left > h2{
        color: #5F6368;
    }
    .plusIcon{
        font-size: 27px;
        /* padding: 10px; */
        padding: 1px 0;
        cursor: pointer;
        color: #35383b;
        background-color: #c1c5c5;
        border-radius: 100px;
    }
    .plusIcon:hover{
        color: red;
    }
`
