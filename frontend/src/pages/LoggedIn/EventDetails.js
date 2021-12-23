import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import receiveFetch from "../../utils/receiveFetch";

const Wrapper = styled.div`
    font-size: 4rem;
    display: flex;
    flex: 1;
    background: #c8d8e4;
    flex-direction: column;
    align-items: center;

    ol {
        li {
            a {
                color: black;
                font-size: 3rem;

                :hover {
                    color: gray;
                }
            }
        }
    }
`;

const Eventdetails = () => {

    const { id } = useParams()

    const [ event, setEvent ] = useState()
    const [ users, setUsers ] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await receiveFetch("/api/get_eventdetails", "POST", { id })
            setEvent(res)
            if (res.json_agg[0]) setUsers(res.json_agg)
        }
        fetchData()
    }, [])

    return (
        <Wrapper>
            {event && 
            <div>
                {event.ime_eventa}
                {event.datum}
            </div>
            }
            <ol start="1">
            {users && users.length ? users.map(user => {
                return (
                        <li>
                    <Link key={user.id} to={{pathname: `/korisnik/${user.id}`}}>
                            {user.ime} {user.prezime}
                    </Link>
                        </li>
                )
            })
            :
            <div>
                Nema članova!
            </div>
        }
        </ol>
        </Wrapper>
    )
};

export default Eventdetails;
