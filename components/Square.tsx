import * as React from "react";
import styled from "styled-components";


interface Props {
    row: number;
    column: number;
}

const Square = styled.div`
  position: relative;
  background: #fff;
  border: 0.1vw solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: $square_len;
  height: $square_len;
  width: $square_len;
`

export default Square;