import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom";
import { EventlistContext } from "../../context/Context";
import sendFetch from "../../utils/sendFetch";
import filterData from "../../utils/filterData";
import searchData from "../../utils/searchData";

const Eventlist = () => {

    const { id } = useParams()
    
    const [ events, setEvents ] = useState([])
    const [ filtered, setFiltered ] = useState([])

    const { eventlist } = useContext(EventlistContext);

    useEffect(() => {
        if (eventlist) {
            setEvents(eventlist.filter(event => event.tim == id))
            setFiltered(eventlist.filter(event => event.tim == id))
        }
    }, [eventlist])

    function deleteEvent(e) {
        const event_id = e.target.name
        sendFetch("/api/delete_event", "DELETE", { event_id })
        filterData(event_id, eventlist)
        setFiltered(eventlist.filter(event => event.tim == id))
    }
    
    function Searchbar(e) {
        const search = searchData(e, events, "eventi")
        setFiltered(search)
    }

    return (
        <section className="wrapper">
            <Link className="search" to={{pathname:`/event_obrazac/${id}`}}>Dodaj event +</Link>

            <input onChange={Searchbar} type="search" placeholder="Pretraži evente..." />

            <div className="list">
            {filtered && filtered.length ? filtered.map(event => {
                return (
                    <div className="one" key={event.id}>
                        <Link className="card" to={{pathname:`/event/${event.id}`}}>
                            {event.ime_eventa} {event.ime_organizatora}
                        </Link>
                        <div>
                            <Link to={{pathname:`/event_obrazac/${id}/${event.id}`}} className="fas fa-edit"/>
                            <Link onClick={deleteEvent} name={event.id} className="fas fa-trash-alt" />
                        </div>
                    </div>
                )
            })

            :

                <div className="one">
                    Nema eventa za prikazati...
                </div>
            }
            </div>
        </section>
    )
};

export default Eventlist;
