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
import styled from "styled-components"
import TableAttendance from "./TableAttendance"

const Wrapper = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

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
	    <Wrapper>
          <Navbar />
		      <UserlistContext.Provider value={{userlist, setUserlist}}>
          <EventlistContext.Provider value={{eventlist, setEventlist}}>
              <Switch>
              <Route exact path="/"><Svitimovi /></Route>
              <Route path="/tim/:id" render={(props) => <TimDetalji {...props} />}/>
              <Route path="/korisnik_obrazac/:type/:id?" render={(props) => <UserForm {...props} />}/>
              <Route path="/event_obrazac/:type/:id?" render={(props) => <EventForm {...props} />}/>
              <Route path="/korisnik/:id" render={(props) => <UserDetails {...props} />}/>
              <Route path="/event/:id" render={(props) => <EventDetails {...props} />}/>
              <Route path="/table" render={(props) => <TableAttendance {...props} />}/>
              <Route><NotFound /></Route>
              </Switch>
          </EventlistContext.Provider>
		      </UserlistContext.Provider>
      </Wrapper>
  );
};

export default LoggedIn;
