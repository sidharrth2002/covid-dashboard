import React from 'react';
// import ReactDOM from 'react-dom';
import './App.css';

// class Search extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleSearch = this.handleSearch.bind(this);
//         this.state = { newSearch: false };
//     }
//
//     handleSearch() {
//         this.setState({ newSearch: true} );
//     }
//
//   render() {
//     return (
//     <form id="search">
//       <label htmlFor="search-date">Date:</label>
//       <input type="date" id="search-date" name="date" />
//       <input type="submit" onClick={this.handleSearch}/>
//     </form>
//     )
//   }
// }

class DisplayStats extends React.Component{
    render() {
        return (
            <div id="stats">
                <div id="new-cases" className="stat">
                    <h2>New Cases</h2>
                    <h3>{this.props.newCases}</h3>
                </div>
                <div id="deaths" className="stat">
                    <h2>New Deaths</h2>
                    <h3>{this.props.newDeaths}</h3>
                </div>
                <div id="recovered" className="stat">
                    <h2>New Recovered</h2>
                    <h3>{this.props.newRecovered}</h3>

                </div>
                <div id="total-cases" className="stat">
                    <h2>Total Cumulative Cases</h2>
                    <h3>{this.props.totalCases}</h3>

                </div>
                <div id="total-confirmed" className="stat">
                    <h2>Worldwide Total</h2>
                    <h3>{this.props.totalConfirmed}</h3>
                </div>
                <div id="total-deaths" className="stat">
                    <h2>Worldwide Total Deaths</h2>
                    <h3>{this.props.totalDeaths}</h3>
                </div>
                <div id="total-recovered" className="stat">
                    <h2>Worldwide Total Recovered</h2>
                    <h3>{this.props.totalRecovered}</h3>
                </div>
            </div>
        );
    }
}

function Header() {
    return (
        <div id="header">
            <h1>Covid-19 Tracker</h1>
            <h2>Fetching Real-time</h2>
        </div>
    )
}

class Date extends React.Component {
    getDate() {
        return '02-07-2020';
    }

    render () {
        return (
            <div id="date">
                <h2>{`As of today, in Malaysia and the world,` }</h2>
            </div>
        )
    }
}

function Footer() {
    return (
        <div id="footer">
            <p>Made with love by Sidharrth Nagappan</p>
            <p>Powered by the Postman Covid-19 API</p>
            <p>Data sourced from the Johns Hopkins CSSE</p>
            <p><a href="mailto:sidharrth2002@gmail.com">sidharrth2002@gmail.com</a></p>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCases: '',
            newRecovered: '',
            newDeaths: '',
            totalCases: ''
        }
    }

    componentDidMount() {
        this.fetchData();

    }

    fetchData() {
        fetch('https://api.covid19api.com/summary')
            .then(res => {
                return (res.json());
            })
            .then(data => {
                console.log(data);
                this.setState({
                    newCases: data.Countries[103].NewConfirmed,
                    newRecovered: data.Countries[103].NewRecovered,
                    newDeaths: data.Countries[103].NewDeaths,
                    totalCases: data.Countries[103].TotalConfirmed,
                    totalConfirmed: data.Global.TotalConfirmed,
                    totalDeaths: data.Global.TotalDeaths,
                    totalRecovered: data.Global.TotalRecovered
                })
            })
            .catch(console.log)
        ;
    }

    render() {
      return (
          <div>
              <Header />
              <Date />
              <DisplayStats newCases={this.state.newCases}
              newRecovered={this.state.newRecovered}
              newDeaths={this.state.newDeaths}
              totalCases={this.state.totalCases}
              totalConfirmed={this.state.totalConfirmed}
                            totalDeaths={this.state.totalDeaths}
                            totalRecovered={this.state.totalRecovered}
              />
              <Footer />
          </div>
      );
  }
}

export default App;
