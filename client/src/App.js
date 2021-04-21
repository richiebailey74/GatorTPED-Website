//react imports
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

//router and local imports
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./routes/Routes";
import Appbar from "./appbar/Appbar";
import background from "./images/bg.jpg";

export default function App() {

    document.body.style.backgroundImage = `url(${background})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';

    return (
        <div /*className={classes.root} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}*/>
            <CssBaseline/>
            
            {/* Everything in this App has to be wrapped in a BrowserRouter to function properly*/}
                <Router>
                    <div>
                        <Appbar /> {/* Appbar which includes login dropdown and swing out sidebar */}
                        <Routes /> {/* Routing functions for subpages */}
                    </div>
                </Router>
        </div>
    );
}