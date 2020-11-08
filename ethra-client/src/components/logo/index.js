import React from 'react'
import { Link } from "react-router-dom";
import "./index.scss"
function Logo() {
    return (
          <Link to="/" className="logo logo--nav">
          SWE497
        </Link>
    )
}

export default Logo
