import Login from "./Login.js";
import NotFound from "../../components/NotFound"
import { Route, Switch } from "react-router-dom";

const LoggedOut = () => {
    return (
        <>
          <Switch>
            <Route exact path="/"><Login /></Route>
            <Route><NotFound /></Route>
          </Switch>
        </>
    );
};

export default LoggedOut;
