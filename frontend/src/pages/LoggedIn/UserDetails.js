import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import receiveFetch from "../../utils/receiveFetch"

const Wrapper = styled.div`
    font-size: 5rem;
    background: #c8d8e4;
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
`;

const Styledlink = styled(Link)`
    padding: 2rem;
`;

const Userdetails = () => {

    const { id } = useParams()

    const [ user, setUser ] = useState()
    const [ events, setEvents ] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await receiveFetch("/api/get_userdetails", "POST", { id })
            setUser(res)
            if (res.json_agg[0]) setEvents(res.json_agg)
        }
        fetchData()
    }, [])

    return (
        <Wrapper>
            {user && 
            <div>
                {user.ime} {user.prezime} 
                <br/>    
                {user.tel} 
                <br/>
                {user.razina} 
                <br/>
                {user.email} 
                <br/>
                {user.tim} 
                <br/>
                {user.spol} 
                <br/>
                {user.datum}
            </div>
            }

            {events && events.length ? events.map(event => {
                return (
                    <Styledlink 
                        key={event.id}
                        to={{pathname:`/event/${event.id}`}}
                    >
                        {event.ime_eventa}
                    </Styledlink>
                )
            })
            :
            <div>
                Nema evenata...
            </div>
        }
            
        </Wrapper>
    )
};

export default Userdetails;
