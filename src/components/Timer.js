import React from 'react';

class Timer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sets:props.properties.sets,
      work:props.properties.work,
      rest:props.properties.rest,
      working:true,
      started:false,
      finished:false
    };
    this.audio1 = new Audio('/audio/beep1.mp3');
    this.audio2 = new Audio('/audio/beep2.mp3');
  }

  sleep(){
    return new Promise(resolve=>setTimeout(resolve,1000));
  }

  reset(){
    this.setState({
      sets:this.props.properties.sets,
      work:this.props.properties.work,
      rest:this.props.properties.rest,
      working:true,
      started:false,
      finished:false
    });
  }

  async start(){
    this.audio2.play();
    this.setState(state=>({started:true}));
    let work=this.state.work;
    let rest=this.state.rest;
    while(this.state.sets>0){
      // console.log(this.state.sets);
      if(this.state.working){
        while(this.state.work>0){
          // console.log(this.state.work);
          if(this.state.work<=4 && this.state.work>1){
            this.audio1.play();
          }
          if(this.state.work===1){
            this.audio2.play();
          }
          await this.sleep();
          this.setState(state=>({work:state.work-1}));
          if(!this.state.started){
            this.setState({work:work});
            return;
          }
        }
        this.setState({working:false,work:work});
      }
      if(!this.state.working){
        while(this.state.rest>0){
          // console.log(this.state.rest);
          if(this.state.rest<=4 && this.state.rest>1){
            this.audio1.play();
          }
          if(this.state.rest===1){
            this.audio2.play();
          }
          await this.sleep();
          this.setState(state=>({rest:state.rest-1}));
          if(!this.state.started){
            this.setState({rest:rest});
            return;
          }
        }
        this.setState({working:true,rest:rest});
      }
      this.setState(state=>({sets:state.sets-1}));
    }
    this.setState({finished:true})
  }

  render(){
    let countdown,backBtn,controlBtn;
    if(this.state.finished){
      countdown=(<h2 className="completed">Completed</h2>);
      backBtn = (<button className='backBtn' onClick={this.props.timerToggle}>Back</button>);
    }
    else{
      if(!this.state.started){
        backBtn=(<button className='backBtn' onClick={this.props.timerToggle}>Back</button>);
        countdown=(
        <div>
          <h2 className="propertyInfo">SETS : {this.state.sets}</h2>
          <h2 className="propertyInfo">WORK : {this.state.work}</h2>
          <h2 className="propertyInfo">REST : {this.state.rest}</h2>
        </div>);
        controlBtn = (<button className='controlBtn readyBtn' onClick={()=>{this.start()}}>Ready</button>)
      }
      else{
        if(this.state.working){
          countdown = (
            <div className='countdown'>
              <h2 className='sets'>Sets Remaining : {this.state.sets}</h2>
              <h2 className='work-rest'> WORK</h2>
              <h2 className='timer'>{this.state.work}</h2>
            </div>
          );
        }
        else{
          countdown=(
            <div className='countdown'>
              <h2 className='sets'>Sets Remaining : {this.state.sets}</h2>
              <h2 className='work-rest'> REST</h2>
              <h2 className='timer'>{this.state.rest}</h2>
            </div>
          );
        }
        controlBtn=(<button className='controlBtn' onClick={()=>{this.reset()}}>Reset</button>)
      }
    }
    return (
      <div>
        {backBtn}
        {countdown}
        {controlBtn}
      </div>
    );
  }

}

export default Timer;