'use strict';

import ToDos from './todos';
import BusinessEntities from './business-entities';

/*
app.js is the proverbial public static void main() of our JavaScript application. 

*/

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
// end::vars[]

//tag::app[]

/*
 * In essence, app.js is the proverbial public static void main() of our JavaScript application. 
 */
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {businessEntities: []};
	}

/*	
	componentDidMount() {
//		client({method: 'GET', path: '/api/businessEntities/19981215793'}).done(response => {
		
		var urlStr = "/api/businessEntities/search/findByPartialEntityName?entityName=Hope";
		client({method: 'GET', path: urlStr}).done(response => {
			this.setState({businessEntities: response.entity._embedded.businessEntities});
		});		
	}
*/
	/*
	  <ToDos />
	 */
	render() {
		return (
			<div id="container">
			  <BusinessEntities />
		    </div>
		)
	}
}
//end::app[]


// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
