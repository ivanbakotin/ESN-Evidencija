import Userlist from "./UserList";
import Eventlist from "./EventList";
import { useParams } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    background-color: #c8d8e4;
    font-size: 3rem;
    flex-direction: column;

`;

const Title = styled.h1`
    font-size: 4rem;
    padding: 1.5rem;
    align-self: center;
`;

const TimDetalji = () => {

    const { id } = useParams()

    return (
        <Wrapper>
            <Title>{id} tim</Title>
            <Userlist />
            <Eventlist />                   
        </Wrapper>
    )
}

export default TimDetalji;
