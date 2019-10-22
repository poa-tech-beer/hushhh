import styled from "styled-components"
import imgSend from "../images/send.svg"
import imgCopy from "../images/copy.svg"
import imgShare from "../images/share.svg"

const Button = styled.button`
  display: block;
  height: 96px;
  width: 96px;
  border: none;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  position: absolute;
  margin-left: -48px;
  background-repeat: no-repeat;
  background-color: inherit;
`
const SendButton = styled(Button)`
  background-image: url(${imgSend});
  border-radius: 48px;
  left: 50%;
  top: 60%;
`
const CopyButton = styled(Button)`
  background-image: url(${imgCopy});
  display: flex;
  position: inherit;
  margin-left: 10px;
`

const ShareButton = styled(Button)`
  position: fixed;
  background-image: url(${imgShare});
  bottom: 15%;
  left: 50%;
`
const Title = styled.h1`
  font-family: "Nanum Pen Script";
  font-style: normal;
  font-weight: normal;
  font-size: 1.5em;
  text-align: center;
  margin-top: 10vw;
`

const ShareText = styled.h2`
  display: flex;
  text-decoration: underline white;
  font-size: 1.5em;
  justify-content: center;
  align-items: center;
`

export { SendButton, CopyButton, ShareButton, Title, ShareText }
