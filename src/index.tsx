import React from "react"
import ReactDOM from "react-dom"
import App from "./app.tsx"

import "./styles.css"

/* Invite link
 * Remember to adjust appconfig.json as needed in public folder
 * alt1://addapp/ url given by preview goes here /appconfig.json
 *
 * Example for this template
 * alt1://addapp/https://57eftn.csb.app/
 */

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
