import React from 'react';

class PropertyInput extends React.Component{
  constructor(props){
      super(props);
      if(props.name==='REST'){
      this.state={
        inputValue:props.properties.rest
      };
    }
    
    if(props.name==='WORK'){
      this.state={
        inputValue:props.properties.work
      };
    }
    
    if(props.name==='SETS'){
      this.state={
        inputValue:props.properties.sets
      };
    }
  }

  updateProperties(v){
    if(this.props.name==='REST'){
      this.props.properties.rest=v;
    }
    else if(this.props.name==='WORK'){
      this.props.properties.work=v;
    }
    else{
      this.props.properties.sets=v;
    }
  }

  valueChange(e){
    let v;
    if(e.target.value===''){
      this.setState({inputValue:''})
    }
    else{
      v=parseInt(e.target.value);
      if(this.props.name==='REST'){
        if(v>=0){
          this.setState({inputValue:v});
        }
      }
      else{
        if(v>0){
          this.setState({inputValue:v});
        }
      }
    }
    this.updateProperties(v);
  }

  incr(){
    let v=parseInt(this.state.inputValue);
    this.setState({inputValue:v+1});
    this.updateProperties(v+1);
  }

  decr(){
    let v=parseInt(this.state.inputValue);
    if(this.props.name==='REST'){
      if(v>0){
        this.setState({inputValue:v-1});
      }
    }
    else{
      if(v>1){
        this.setState({inputValue:v-1});
      }
    }
    this.updateProperties(v-1);
  }

  render(){
    return (
      <div className='propertyInput'>
        <span>{this.props.name}</span>
        <button onClick={()=>{this.incr()}}>+</button>
        <input value={this.state.inputValue} onChange={(e)=>{this.valueChange(e)}}/>
        <button onClick={()=>{this.decr()}}>-</button>
      </div>
    );
  }
}

export default PropertyInput;