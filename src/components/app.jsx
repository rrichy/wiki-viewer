import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			results: []
		}

		this.updateResults = this.updateResults.bind(this);
	}

	updateResults(e) {
		this.setState({ search: e.target.value});
		fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts&generator=search&pilimit=100&exsentences=2&exintro=1&explaintext=1&gsrsearch=${encodeURI(this.state.search)}&gsrnamespace=0&gsrlimit=10`, {headers : { 
			// 'Content-Type': 'application/json',
			// 'Accept': 'application/json',
			'mode': 'no-cors'
		       }})
			.then(resp => resp.json())
			.then(data => {
				console.log(data.query.pages);
			});
		
	}
	
	render() { 
		return (
			<React.Fragment>
				<input type="text" name="gsrsearch" id="searchId" onChange={this.updateResults} />
			</React.Fragment>
		);
	}
}
 
export default App;