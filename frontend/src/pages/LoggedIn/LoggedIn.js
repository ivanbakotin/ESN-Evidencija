import Svitimovi from "./SviTimovi"
import TimDetalji from "./TimDetalji"
import UserForm from "./UserForm"
import EventForm from "./EventForm"
import UserDetails from "./UserDetails"
import EventDetails from "./EventDetails"
import NotFound from "../../components/NotFound"
import Navbar from "../../components/Navbar"
import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom";
import { UserlistContext, EventlistContext } from "../../context/Context";
import useFetchGet from "../../hooks/useFetchGet"
import TableAttendance from "./TableAttendance"

const LoggedIn = () => {

	const [ userlist, setUserlist ] = useState([])
  const [ eventlist, setEventlist ] = useState([])

  const fetchUsers = useFetchGet("/api/get_users")

  useEffect(() => {
    if (fetchUsers) {
      setUserlist(fetchUsers[0])
      setEventlist(fetchUsers[1])
    }
  }, [fetchUsers])

  return (
	    <main className="logged-in-wrapper">
          <Navbar />
		      <UserlistContext.Provider value={{userlist, setUserlist}}>
          <EventlistContext.Provider value={{eventlist, setEventlist}}>
              <Switch>
                <Route exact path="/" ><Svitimovi /></Route>
                <Route path="/tim/:id" ><TimDetalji /></Route>
                <Route path="/korisnik_obrazac/:type/:id?"><UserForm /></Route>
                <Route path="/event_obrazac/:type/:id?" ><EventForm /></Route>
                <Route path="/korisnik/:id" ><UserDetails /></Route>
                <Route path="/event/:id" ><EventDetails /></Route>
                <Route path="/table" render={(props) => <TableAttendance {...props} />}/>
                <Route><NotFound /></Route>
              </Switch>
          </EventlistContext.Provider>
		      </UserlistContext.Provider>
      </main>
  );
};

export default LoggedIn;
