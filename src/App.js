import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

class App extends React.Component {

  state={
    memes:[],
    loading:false,
    text:'',
  }

  getMemes = async (e) => {
    e.preventDefault()
    this.setState({loading: true})
    var key = 'ymym01TPmi9BvOfg4NbSsYakADc4I56E' 
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({memes: json.data, loading: false, text: ''})
  }

  render() {
    var{memes, loading, text} = this.state
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getMemes}>
          <input value={text} 
            placeholder="Search your memes here..."
            onChange={e=> this.setState({text: e.target.value})}
          />
          <Button variant="contained" color="primary" >
            Search
          </Button>
        </form>
        {loading && <LinearProgress />}
        <main className="Results">
          {memes.map(meme=>{
            return <Memes key={meme.id} meme={meme}/>
          })}
        </main>
      </div>
    );
  }
}

function Memes(props) {
  const {meme}=props
  const url=meme.images.fixed_height.url
  return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
    <img height ="200" alt="meme" src={url}/>
  </div>)
}
export default App;
