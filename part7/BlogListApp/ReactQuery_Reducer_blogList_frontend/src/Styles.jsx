import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'

const Lists = styled.li`
  padding: 15px;
  color: black;
  font-weight: bold;
  background: rgb(185, 185, 185);
  text-decoration: none;
  display: block;
  width: 80%;
`
const List = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  padding: 50px 0;
`

const Nav = styled.nav`
  border-bottom: 2px solid rgb(185, 185, 185);
  color: rgb(185, 185, 185);
  display: flex;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  border-bottom: 1px solid rgb(185, 185, 185);
`

const NavLinks = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  gap: 15px;
`

const LinkS = styled(NavLink)`
  color: rgb(185, 185, 185);
  font-size: 25px;
  text-transform: capitalize;
  transition: 0.5s ease;
  text-decoration: none;
  &:hover {
    color: black;
  }
`
const Btn = styled.button`
  padding: 10px 15px;
  border-radius: 25px;
  background-color: black;
  border: none;
  color: #fff;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
`

const BlogS = styled(Link)`
  text-decoration: none;
  font-weight: light;
  font-size: 20px;
  color: black;
  // border-bottom: 1px solid rgb(185, 185, 185);
  padding: 20px 20px;
  width: 50%;
  position: relative;
  margin: 0 auto;
  &:after {
    content: '';
    width: 5px;
    height: 100%;
    background: red;
    position: absolute;
    inset: 0;
  }
`

const Main = styled.div`
  padding: 0 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

const FormBtn = styled(Btn)`
  background-color: 1px solid rgb(185, 185, 185);
  color: #fff;
`

const Input = styled.input`
  padding: 16px 8px;
`

const Cmt = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid red;
  width: 40%;
  color: rgb(185, 185, 185);
`

const Lk = styled.a`
  margin: 24px 0;
  padding-top: 32px;
  display: block;
`

const Cancle = styled(FormBtn)`
  background: #fff;
  border: solid red;
  color: red;
`

const Not = styled.div`
  width: 100%;
  background-color: 1px solid rgb(185, 185, 185);
  color: #fff;
`

export const styles = {
  List,
  Lists,
  Nav,
  NavLinks,
  LinkS,
  Btn,
  BlogS,
  Main,
  Form,
  FormBtn,
  Input,
  Cmt,
  Lk,
  Cancle,
}
