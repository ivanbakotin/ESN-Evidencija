import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom";
import { UserlistContext } from "../../context/Context";
import sendFetch from "../../utils/sendFetch"
import filterData from "../../utils/filterData"
import searchData from "../../utils/searchData"

const Userlist = () => {

    const { id } = useParams()

    const [ filtered, setFiltered ] = useState([])
    
    const { userlist } = useContext(UserlistContext);

    useEffect(() => {
        if (userlist) setFiltered(userlist.filter(user => user.tim == id))
    }, [userlist])

    function deleteUser(e) {
        const user_id = e.target.name
        sendFetch("/api/delete_user", "DELETE", { user_id })
        filterData(user_id, userlist)
        setFiltered(userlist.filter(user => user.tim == id))
    }

    function Searchbar(e) {
        const search = searchData(e, userlist, "clanovi")
        setFiltered(search.filter(user => user.tim == id))
    }

    return (
        <section className="wrapper">
            <Link className="search" to={{pathname:`/korisnik_obrazac/${id}`}}>Dodaj člana +</Link>
            <input onChange={Searchbar} type="search" placeholder="Pretraži članove..." />
            <div className="list">
            {filtered && filtered.length ? filtered.map(user => {
                return (
                    <div className="one" key={user.id}>
                        <Link className="card" to={{pathname:`/korisnik/${user.id}`}}>
                            {user.ime} {user.prezime}
                            <br/>
                            {user.razina}
                        </Link>
                        <div>
                            <Link to={{pathname:`/korisnik_obrazac/${id}/${user.id}`}} className="fas fa-edit"/>
                            <Link onClick={deleteUser} name={user.id} className="fas fa-trash-alt" />
                        </div>
                    </div>
                )
            })

            :

            <div className="one">Nema članova za prikazati...</div>}

            </div>
        </section>
    )
};

export default Userlist;
