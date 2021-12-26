import { Link } from "react-router-dom"
import { useState } from "react";
import styled from "styled-components"

const Navstyle = styled.nav`
    display: flex;
    justify-content: flex-end;
    background: #ffffff;
`;

const Styledlink = styled(Link)`
    align-self: center;
    display: flex;
    color: black;
    margin: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
    font-size: 3rem;
    text-decoration: none;
    border-radius: 4rem;
    background: rgb(166, 173, 179);

    :hover {
        background: rgb(111, 116, 120);
    }

    @media (max-width: 726px) {
        display: none;
    }
`;

const Burgerbar = styled.div`
    font-size: 3rem;
    padding: 1rem;
    z-index: 1;

    :focus {
      outline: none;
    }

    .div1, .div2, .div3 {
        margin: 1rem;
        width: 3.5rem;
        height: 0.5rem;
        background: black;
        transition: 0.5s;
    }

    .div1 {
        ${({ open }) => open && `-webkit-transform: rotate(-45deg) translate(-1.1rem, 1rem);
                                 transform: rotate(-45deg) translate(-1.1rem, 1rem);`};
    }
    .div2 {
        ${({ open }) => open && `opacity: 0`};
    }
    .div3 {
        ${({ open }) => open && `-webkit-transform: rotate(45deg) translate(-1.1rem, -1rem);
                                 transform: rotate(45deg) translate(-1.1rem, -1rem);`};
    }

    @media (min-width: 727px) {
        display: none;
    }
`;

const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #2b6777;
    height: 100vh;
    padding: 2.5rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: transform 0.3s ease-in-out;
    transform: ${({ open }) => open ? `translateY(0)` : `translateY(-100%)`};

    @media (min-width: 727px) {
        transform: translateY(-100%);
    }

    a {
        margin-block: 1rem;
        text-decoration: none;
        font-size: 3.5rem;
        text-align: center;
        padding: 3rem;
        color: #ffffff;
    }
  
`;

const Navbar = () => {

    const [ open, setOpen ] = useState(false)

    function Logout() {
        fetch("/auth/logout")
        localStorage.clear()
        window.location.href="/"
    }

    function openBurger() {
        setOpen(!open)
    }

    return (
        <Navstyle>
            <Styledlink to="/">Timovi</Styledlink>
            <Styledlink to={{pathname:`/table`, state: ""}}>Članovi</Styledlink>
            <Styledlink to={{pathname:`/table`, state: "presco"}}>Presco</Styledlink>
            <Styledlink to="" onClick={Logout}>Odjava</Styledlink>
            
            <Burgerbar open={open} onClick={openBurger}>
      	        <div className="div1"/>
      	        <div className="div2"/>
      	        <div className="div3"/>
            </Burgerbar>
            <StyledMenu open={open}>
                <Link onClick={openBurger} to="/">Timovi</Link>
                <Link onClick={openBurger} to={{pathname:`/table`, state: ""}}>Članovi</Link>
                <Link onClick={openBurger} to={{pathname:`/table`, state: "presco"}}>Presco</Link>
                <Link onClick={openBurger} to="" onClick={Logout}>Odjava</Link>
            </StyledMenu>
        </Navstyle>
    )
}

export default Navbar;
