import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment'
import {Bar} from 'react-chartjs-2'

class App extends React.Component {

  state={
    weather:null,
    loading:false,
    text:'',
  }

  getWeather = async (e) => {
    // this line prevents the page from reloading (which is the default for <form> elements)
    e.preventDefault()
    // set "loading" to true in the state so we can show a spinner
    this.setState({loading: true, weather:null})
    var key = '333cdb2ee5c297c0bcd70eaaa28fd894'
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.text}&units=metric&APPID=${key}`
    var r = await fetch(url)
    var json = await r.json()

    if(r.status===200){
      // set the weather in state, and loading to false, and the text to blank again
      this.setState({
        weather: json.list, 
        loading:false, 
        text:'', 
        error:null
      })
    } else {
      this.setState({
        error: json.message, 
        loading:false
      })
    }
  }

  render() {
    var {weather, loading, text, error} = this.state
    var data

    if(weather){
      data = {
        labels: weather.map(w=> moment(w.dt*1000).format('ll hh:mm a')),
        datasets: [{
          label:'Temperature',
          borderWidth: 1,
          data: weather.map(w=> w.main.temp),
          backgroundColor: 'rgba(132,99,255,0.2)',
          borderColor: 'rgba(132,99,255,1)',
          hoverBackgroundColor: 'rgba(132,99,255,0.4)',
          hoverBorderColor: 'rgba(132,99,255,1)',
        }]
      }
    }

    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getWeather}>
          <TextField value={text}
            autoFocus
            variant="outlined"
            label="Search for weather"
            onChange={e=> this.setState({text: e.target.value})}
            style={{width:'100%', marginLeft:8, height:40}}
          />
          <Button variant="contained"
            color="primary"
            disabled={loading || !text} 
            type="submit"
            style={{width:150, margin:'0 10px', height:56}}>
            <SearchIcon style={{marginRight:8}} />
            Search
          </Button>
        </form>
        {loading && <LinearProgress />}
        <main>
          {data && <Bar
            data={data}
            width={800}
            height={400}
          />}
          {error && <div style={{color:'rgb(150,80,50)'}}>{error}</div>}
        </main>
      </div>
    );
  }
}

export default App;