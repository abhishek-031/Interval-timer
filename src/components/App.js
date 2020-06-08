import React from 'react';
import PropertiesComponent from './PropertiesComponent';
import Timer from './Timer';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      timerStart:false,
      valid:true,
      presets:[],
    }

    this.properties = {
      rest:1,
      sets:1,
      work:1
    }


    this.timerToggle = this.timerToggle.bind(this);
  }

  timerToggle(){
    this.setState({timerStart:false});
  }

  start(properties){
    if(properties===undefined){
      properties=this.properties;
    }
    else{
      this.properties = properties;
    }
    if(properties.rest===undefined || properties.work===undefined || properties.sets===undefined){
      this.setState({valid:false})
    }
    else{
      this.setState({timerStart:true,valid:true});
    }
  }

  savePreset(){
    let p = localStorage.getItem('presets');
    let presets = [];
    if(p===null){
      p=[];
    }else{
      presets=JSON.parse(p);
    }
    presets.push(this.properties);
    localStorage.setItem('presets',JSON.stringify(presets));
    this.setState({
      presets
    });
  }

  componentDidMount(){
    const presets = JSON.parse(localStorage.getItem('presets'));
    console.log(presets);
    if(presets!==null){
      this.setState({
        presets
      });
    }
  }

  del(preset){
    const presets = this.state.presets;
    for(let i=0;i<presets.length;i++){
      if(presets[i]===preset){
        presets.splice(i,1);
        break;
      }
    }
    localStorage.setItem('presets',JSON.stringify(presets));
    this.setState({
      presets
    });
  }

  render(){
    let view,controls;
    let error;
    let presets;
    if(!this.state.valid){
      error=(<p className="errorMsg">Inputs cannot be empty</p>)
    }
    if(this.state.timerStart===false){
      view= (<PropertiesComponent properties={this.properties} />);
      controls=(
        <>
        <button className='controlBtn' onClick={()=>{this.start()}}>Start</button>
        <button className='controlBtn' onClick={()=>{this.savePreset()}} >Save Preset</button>
        </>
      );
      if(this.state.presets.length!==0){
        presets=(
          <div className='presets'>
            <h2>PRESETS:</h2>
            {this.state.presets.map(preset=>{
              return <div className='preset-details'> <h3> WORK: {preset.work}</h3> <h3>REST: {preset.rest}</h3> <h3>SETS: {preset.sets}</h3> <button onClick={()=>{this.start(preset)}}> START </button> <button onClick={()=>{this.del(preset)}}>Delete</button> </div>
            })}
          </div>
        )
      }
    }
    else{
      view=(
        <Timer properties={this.properties} timerToggle={this.timerToggle}/>
      );
    }
    return (
      <div className='container'>
        {view}
        {error}
        {controls}
        {presets}
      </div>
    );
  }
}

export default App;