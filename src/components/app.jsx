import React, { Component } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFreeCodeCamp, faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Result extends Component {
	render() { 
		return (
			<a className="result" href={"https://en.wikipedia.org/?curid=" + this.props.pageid} target="_blank">
				<h2>{this.props.title}</h2>
				<p>{this.props.description}</p>
			</a>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			results: [],
			show: false
		}

		this.updateResults = this.updateResults.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.showBar = this.showBar.bind(this);
	}

	updateResults(e) {
		e.preventDefault();
		$.ajax({
			url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts&generator=search&pilimit=100&exsentences=2&exintro=1&explaintext=1&gsrsearch=${encodeURI(this.state.search)}&gsrnamespace=0&gsrlimit=10`,
			dataType: 'jsonp',
			success: data => {
				let { pages } = data.query,
				result = [];

				for(let page in pages) {
					let { title, extract, pageid } = pages[page];
					result.push([title, extract, pageid]);
				}
				document.querySelector('#root').style.height = 'fit-content';
				this.setState({ results: result });
			}
		});
	}

	async updateSearch(e) {
		const value = e.target.value;
		await this.setState({ search: value});
	}

	showBar() {
		if(window.innerWidth > 1024) {
			const bar = document.querySelector('.search-txt');
			if(bar.style.width != '300px') {
				bar.style.width = '300px';
				bar.focus();
				let checkActive = setInterval(() => {
					if(document.activeElement != bar && !this.state.search) {
						bar.style.width = '0px';
						clearInterval(checkActive);
					}
				}, 210);
			}
		}
	}
	
	render() { 
		return (
			<React.Fragment>
				<div id="wrapper">
					 <h1>A Wikipedia Viewer</h1>
					 <p>Click the icon below to open a random article.</p>
					 <p>Or use the search bar.</p>
					<a id="random" href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">
						<svg xmlns="http://www.w4.org/2000/svg" viewBox="-5 0 106.32 91.08" width="100px" height="100px">
							<g id="qm1" style={{isolation: "isolate"}}><path d="M30.72,34a17.68,17.68,0,0,1,3-9.4,23,23,0,0,1,8.69-7.89,27.38,27.38,0,0,1,13.33-3.12,28.47,28.47,0,0,1,12.5,2.61,20.26,20.26,0,0,1,8.38,7.1,17.43,17.43,0,0,1,3,9.77,15.1,15.1,0,0,1-1.68,7.27,22.2,22.2,0,0,1-4,5.4Q71.55,48,65.54,53.33A33.06,33.06,0,0,0,62.88,56a10.76,10.76,0,0,0-1.49,2.1A10.13,10.13,0,0,0,60.63,60c-.18.63-.45,1.75-.81,3.34q-.91,5.09-5.81,5.08a5.93,5.93,0,0,1-4.27-1.66A6.54,6.54,0,0,1,48,61.83a18.14,18.14,0,0,1,1.27-7.11,17.86,17.86,0,0,1,3.37-5.27c1.4-1.51,3.28-3.31,5.66-5.4q3.12-2.73,4.52-4.12a14.11,14.11,0,0,0,2.34-3.1,7.45,7.45,0,0,0,1-3.71,8.67,8.67,0,0,0-2.9-6.6,10.62,10.62,0,0,0-7.5-2.68q-5.37,0-7.91,2.71a21.67,21.67,0,0,0-4.29,8q-1.67,5.52-6.3,5.52a6.19,6.19,0,0,1-4.62-1.93A5.9,5.9,0,0,1,30.72,34ZM54.55,87.46a7.65,7.65,0,0,1-5.2-1.93,6.75,6.75,0,0,1-2.22-5.39A6.94,6.94,0,0,1,49.28,75a7.25,7.25,0,0,1,5.27-2.1,7.17,7.17,0,0,1,7.28,7.28,6.83,6.83,0,0,1-2.2,5.37A7.44,7.44,0,0,1,54.55,87.46Z" transform="translate(-5.39 -4.5)" style={{fill: "none", stroke: "#fff", strokeMiterlimit: 10}}/></g>
							<g id="qm2" style={{isolation: "isolate"}}><path d="M36.64,62.77a4.06,4.06,0,0,1-3,1.26c-2,0-3.4-1.2-4.13-3.61a13.94,13.94,0,0,0-2.81-5.23Q25,53.41,21.5,53.41a7,7,0,0,0-4.91,1.76,5.65,5.65,0,0,0-1.91,4.32,4.89,4.89,0,0,0,.63,2.43,8.87,8.87,0,0,0,1.53,2c.61.61,1.6,1.51,3,2.7a49.89,49.89,0,0,1,3.71,3.54,11.85,11.85,0,0,1,2.21,3.45,12,12,0,0,1,.83,4.65,4.33,4.33,0,0,1-1.13,3.24,3.91,3.91,0,0,1-2.8,1.08c-2.14,0-3.4-1.11-3.81-3.32-.23-1.05-.41-1.78-.53-2.19a6.23,6.23,0,0,0-.49-1.25,7.15,7.15,0,0,0-1-1.38,23.59,23.59,0,0,0-1.74-1.74c-2.63-2.35-4.44-4-5.46-5A14.8,14.8,0,0,1,7,64.19a9.94,9.94,0,0,1-1.1-4.77A11.39,11.39,0,0,1,7.82,53a13.22,13.22,0,0,1,5.49-4.66,18.68,18.68,0,0,1,8.19-1.71,17.88,17.88,0,0,1,8.73,2.05,15,15,0,0,1,5.69,5.16A11.59,11.59,0,0,1,37.87,60,3.89,3.89,0,0,1,36.64,62.77Zm-17.7,31a4.47,4.47,0,0,1-1.44-3.52,4.7,4.7,0,0,1,4.76-4.77,4.75,4.75,0,0,1,3.46,1.38,4.56,4.56,0,0,1,1.41,3.39,4.43,4.43,0,0,1-1.46,3.53,5,5,0,0,1-3.41,1.27A4.87,4.87,0,0,1,18.94,93.81Z" transform="translate(-5.39 -4.5)" style={{fill: "none", stroke: "#fff", strokeMiterlimit: 10}}/></g>
							<g id="qm3" style={{isolation: "isolate"}}><path d="M100.29,60.36a3.06,3.06,0,0,1-2.27,1c-1.52,0-2.55-.9-3.1-2.71a10.46,10.46,0,0,0-2.11-3.92,5.09,5.09,0,0,0-3.89-1.34,5.21,5.21,0,0,0-3.68,1.32,4.25,4.25,0,0,0-1.43,3.24,3.72,3.72,0,0,0,.47,1.83,7.07,7.07,0,0,0,1.15,1.52c.46.46,1.2,1.13,2.22,2a36.24,36.24,0,0,1,2.79,2.65A8.57,8.57,0,0,1,92.72,72a3.19,3.19,0,0,1-.86,2.42,2.87,2.87,0,0,1-2.1.82,2.67,2.67,0,0,1-2.85-2.5c-.18-.78-.31-1.33-.4-1.64a4.5,4.5,0,0,0-.37-.93,5.12,5.12,0,0,0-.73-1,16.13,16.13,0,0,0-1.31-1.3q-3-2.64-4.09-3.76a11.15,11.15,0,0,1-2-2.65,7.45,7.45,0,0,1-.82-3.58,8.53,8.53,0,0,1,1.45-4.79,10,10,0,0,1,4.11-3.5,14.1,14.1,0,0,1,6.14-1.28,13.42,13.42,0,0,1,6.56,1.54,11.27,11.27,0,0,1,4.27,3.87,8.72,8.72,0,0,1,1.46,4.62A2.9,2.9,0,0,1,100.29,60.36ZM87,83.65A3.35,3.35,0,0,1,85.93,81a3.52,3.52,0,0,1,3.57-3.58,3.59,3.59,0,0,1,2.59,1A3.41,3.41,0,0,1,93.15,81a3.35,3.35,0,0,1-1.09,2.65,3.79,3.79,0,0,1-2.56,1A3.64,3.64,0,0,1,87,83.65Z" transform="translate(-5.39 -4.5)" style={{fill: "none", stroke: "#fff", strokeMiterlimit: 10}}/></g>
							<g id="qm4" style={{isolation: "isolate"}}><path d="M48.26,21.17a13.89,13.89,0,0,1,2.36-7.44A18.07,18.07,0,0,1,57.5,7.48,21.68,21.68,0,0,1,68.06,5,22.52,22.52,0,0,1,78,7.07,16.05,16.05,0,0,1,84.6,12.7a13.8,13.8,0,0,1,2.34,7.74,12,12,0,0,1-1.33,5.76,17.6,17.6,0,0,1-3.18,4.28q-1.83,1.79-6.59,6.05a26,26,0,0,0-2.11,2.11,8.49,8.49,0,0,0-1.18,1.66,7.91,7.91,0,0,0-.6,1.51c-.14.5-.35,1.39-.64,2.65q-.74,4-4.6,4a4.75,4.75,0,0,1-3.39-1.31A5.2,5.2,0,0,1,62,43.26a13.8,13.8,0,0,1,3.67-9.81c1.11-1.19,2.61-2.62,4.49-4.27,1.65-1.44,2.85-2.53,3.58-3.27a10.91,10.91,0,0,0,1.86-2.46,5.94,5.94,0,0,0,.75-2.93A6.86,6.86,0,0,0,74,15.29a8.42,8.42,0,0,0-5.94-2.12q-4.24,0-6.26,2.14a17.14,17.14,0,0,0-3.41,6.33Q57.07,26,53.4,26a4.89,4.89,0,0,1-3.65-1.53A4.65,4.65,0,0,1,48.26,21.17Zm18.87,42.4A6.1,6.1,0,0,1,63,62a5.36,5.36,0,0,1-1.76-4.27A5.47,5.47,0,0,1,63,53.67,5.72,5.72,0,0,1,67.13,52a5.7,5.7,0,0,1,5.77,5.77A5.4,5.4,0,0,1,71.16,62,5.88,5.88,0,0,1,67.13,63.57Z" transform="translate(-5.39 -4.5)" style={{fill: "none", stroke: "#fff", strokeMiterlimit: 10}}/></g>
							<g id="qm5" style={{isolation: "isolate"}}><path d="M11.5,40.12a14,14,0,0,1,2.36-7.45,18.16,18.16,0,0,1,6.89-6.24A21.63,21.63,0,0,1,31.31,24,22.52,22.52,0,0,1,41.21,26a16.09,16.09,0,0,1,6.63,5.63,13.8,13.8,0,0,1,2.34,7.74,12,12,0,0,1-1.33,5.76,17.77,17.77,0,0,1-3.17,4.27q-1.84,1.8-6.6,6.06c-.87.8-1.58,1.5-2.11,2.1a8.83,8.83,0,0,0-1.18,1.67,9.12,9.12,0,0,0-.6,1.51c-.14.5-.35,1.38-.63,2.65q-.73,4-4.61,4a4.71,4.71,0,0,1-3.38-1.31,5.16,5.16,0,0,1-1.38-3.91,14.41,14.41,0,0,1,1-5.63,14.23,14.23,0,0,1,2.67-4.18,59.89,59.89,0,0,1,4.49-4.27q2.47-2.18,3.57-3.27a10.84,10.84,0,0,0,1.86-2.46,6,6,0,0,0,.76-2.94,6.83,6.83,0,0,0-2.31-5.22,8.38,8.38,0,0,0-5.93-2.13q-4.26,0-6.27,2.15a17,17,0,0,0-3.4,6.32Q20.32,45,16.65,45A4.9,4.9,0,0,1,13,43.43,4.69,4.69,0,0,1,11.5,40.12Zm18.88,42.4A6.06,6.06,0,0,1,26.26,81a5.34,5.34,0,0,1-1.76-4.28,5.53,5.53,0,0,1,1.7-4.1A5.78,5.78,0,0,1,30.38,71a5.67,5.67,0,0,1,5.76,5.76A5.4,5.4,0,0,1,34.4,81,5.88,5.88,0,0,1,30.38,82.52Z" transform="translate(-5.39 -4.5)" style={{fill: "none", stroke: "#fff", strokeMiterlimit: 10}}/></g>
						</svg>
					</a>

					<form onSubmit={this.updateResults} onMouseOver={this.showBar}>
						<input className='search-txt' type="text" placeholder="Type here to search" value={this.state.search} onChange={this.updateSearch}/>
						<FontAwesomeIcon icon={faSearch} className='search-btn' onClick={this.updateResults} />
					</form>
					{this.state.results.map(([title, extract, pageid]) => <Result key={pageid} pageid={pageid} title={title} description={extract} />)}
				</div>
				<div id="footer">
					<p>Created and designed by rrichy</p>
					<a href="https://github.com/rrichy" target="_blank"><FontAwesomeIcon icon={faGithub} className="fa-lg" /></a>
					<a href="https://www.freecodecamp.org/rrichy" target="_blank"><FontAwesomeIcon icon={faFreeCodeCamp} className="fa-lg" /></a>
					<a href="https://codepen.io/rrichy" target="_blank"><FontAwesomeIcon icon={faCodepen} className="fa-lg" /></a>
				</div>
			</React.Fragment>
		);
	}
}
 
export default App;