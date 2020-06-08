import React from 'react';
import PropertyInput from './PropertyInput';

class PropertiesComponent extends React.Component{


  render(){

    return (
      <div className='properties'>
        <PropertyInput name='WORK' properties={this.props.properties}/>
        <PropertyInput name='REST' properties={this.props.properties}/>
        <PropertyInput name='SETS' properties={this.props.properties}/>
      </div>
    );
  }
}

export default PropertiesComponent;