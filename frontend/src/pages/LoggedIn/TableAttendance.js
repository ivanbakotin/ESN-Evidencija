import { useState, useEffect, useContext } from "react"
import { UserlistContext } from "../../context/Context";
import { Link } from "react-router-dom";

const TableAttendance = (props) => {

    const { userlist } = useContext(UserlistContext);

    const [ users, setUsers ] = useState([])

    const [ sortedName, setSortedName ] = useState(false)
    const [ sortedEver, setSortedEver ] = useState(false)
    const [ sortedNow, setSortedNow ] = useState(false)

    useEffect(() => {
        if (userlist) {
            if (props.location.state) {
                setUsers(userlist.filter(user => user.tim == "Presco"))
            } else {
                setUsers(userlist.filter(user => user.tim != "Presco"))
            }
        }
    }, [userlist, props])

    function sortByName() {
        if (sortedName) {
            users.sort((a, b) => a.ime.toLowerCase() > b.ime.toLowerCase() ? -1 : 1)
        } else {
            users.sort((a, b) => a.ime.toLowerCase() > b.ime.toLowerCase() ? 1 : -1)
        }
        setSortedName(!sortedName)
        setUsers([...users])
    }

    function sortByEver() {
        if (sortedEver) {
            users.sort((a, b) => a.now1 - b.now1)

        } else {
            users.sort((a, b) => b.now1 - a.now1)
        }
        setSortedEver(!sortedEver)
        setUsers([...users])
    }

    function sortByNow() {
        if (sortedNow) {
            users.sort((a, b) => a.last2 - b.last2)
        } else {
            users.sort((a, b) => b.last2 - a.last2)
        }
        setSortedNow(!sortedNow)
        setUsers([...users])
    }

    return (
        <table>
            <tbody>
            <tr>
              <th onClick={sortByName}>Član</th>
              <th onClick={sortByEver}>Dolasci</th>
              <th onClick={sortByNow}>Dolasci ovaj mjesec</th>
            </tr>
            {users.map(user => { 
                return (      
                    <tr key={user.id}>
                        <td>
                            <Link to={{pathname:`/korisnik/${user.id}`}}>
                                {user.ime} {user.prezime}
                            </Link>
                        </td>
                        <td>{user.now1}</td>
                        <td>{user.last2}</td>
                    </tr> 
                )   
            })  
            }
            </tbody>
        </table>
    )
};

export default TableAttendance;
