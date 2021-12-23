import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { UserlistContext } from "../../context/Context";
import sendFetch from "../../utils/sendFetch"
import receiveFetch from "../../utils/receiveFetch"
import searchData from "../../utils/searchData"
import { timovi } from "../../utils/helper_arrays";

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background: #c8d8e4;
`;

const Formstyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #cacede;
    
    h1 {
        width: 100%;
        padding: 1rem;
        font-size: 3rem;
        background-color: #2b6777;
        text-align: center;
    }

    input[type=submit] {
        font-size: 2.5rem;
        margin: 1rem;
    }
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem;
    background-color: #f0f1f5;
    font-size: 3rem;
    padding: 1.5rem;

    label {
        margin-right: 1rem;
    }
`;

const Inputdiv = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    margin: 3rem;
`;

const Input = styled.input`
    font-size: 3rem;
`;

const Addedclan = styled.div`
    font-size: 1.5rem;
    margin: 0.5rem;
    border: 0.1rem gray solid;
    
    ${({ active }) => active && `background-color: green;`}
`;

const Clanovi = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
`;

const Eventform = () => {

    const { type, id } = useParams()

    const { userlist } = useContext(UserlistContext)
    
    const [ filtered, setFiltered ] = useState([])

    const [ clanovi, setClanovi ] = useState([])

    const [ eventinfo, setEventinfo ] = useState({
        ime_eventa: "",
        ime_organizatora: "",
        datum: "",
        cijena: "",
        tim: type
    })

    const { ime_eventa, ime_organizatora, datum, cijena, tim } = eventinfo

    useEffect(() => {
        setFiltered(userlist)

        async function fetchData() {
            const res  = await receiveFetch("/api/get_eventform", "POST", { id })
            setEventinfo(res)
            if (res.dolasci[0]) setClanovi(res.dolasci)
        }
        if (id) fetchData()
    }, [userlist])
    
    function sendEventinfo(e) {
        e.preventDefault()
        
        const info = [ eventinfo, clanovi ] 

        if (id) sendFetch("/api/update_event", "POST", info)
        else sendFetch("/api/create_event", "POST", info)
        
        window.location.href = `/tim/${type}` 
    }

    function pushClan(e) {
        const clan_id = Number(e.target.getAttribute("name"))
        
        if (clanovi.includes(clan_id)) setClanovi(clanovi.filter(c => c !== clan_id));
        else setClanovi(prev => [ ...prev, clan_id ])
    }
    
    function Searchbar(e) {
        const search = searchData(e, userlist, "clanovi")
        setFiltered(search)
    }
    
    function handleInput(e) {
        setEventinfo(prev => ({ ...prev, [e.target.name]: e.target.value}))
    }

    return (
        <Wrapper>
        <Formstyled onSubmit={sendEventinfo}>
            <h1>Obrazac za event</h1>

            <Div>
                <Inputdiv>
                <label htmlFor="ime_eventa">Ime eventa:</label>
                <input onChange={handleInput} type="text" id="ime_eventa" name="ime_eventa" value={ime_eventa}/>
                </Inputdiv>

                <Inputdiv>
                <label htmlFor="ime_organizatora">Ime organizatora:</label>
                <input onChange={handleInput} type="text" id="ime_organizatora" name="ime_organizatora" value={ime_organizatora}/>
                </Inputdiv>
            </Div>

            <Div>
            <Inputdiv>
                <label htmlFor="cijena">Cijena po osobi:</label>
                <input onChange={handleInput} type="number" id="cijena" name="cijena" value={cijena}/>
                </Inputdiv>

                <Inputdiv>
                <label htmlFor="datum">Datum održavanja:</label>
                <input required onChange={handleInput} type="date" id="datum" name="datum" value={datum}/>
                </Inputdiv>
            </Div>

            <Div onChange={handleInput}>
                <label htmlFor="tim">Odaberi tim:</label>
                <select value={tim} name="tim" id="tim">
                    {timovi.map(tim => <option value={tim}>{tim}</option>)}
                </select>
            </Div>

            <Input onChange={Searchbar} type="search" placeholder="Pretraži..." />

            <Div>
                <label>Odaberi članove koji su prisustovali:</label>
                <Clanovi>
                {filtered && filtered.length ? filtered.map(user => {
                    return (
                        <Addedclan 
                            active={clanovi.includes(user.id)} 
                            onClick={pushClan} 
                            name={user.id} 
                            key={user.id}
                        >
                            {user.ime} {user.prezime} {user.tim}
                        </Addedclan>
                    )
                }
                )
                
                :
                
                <Div>
                    Nema članova za prikazati...
                </Div>
            }
            </Clanovi>
            </Div>

            <Input value="Spremi" type="Submit"/>
        </Formstyled>
        </Wrapper>
    )
}

export default Eventform;
