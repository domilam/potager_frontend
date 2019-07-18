import React, {Component} from 'react';

import Plant from './Plant';


class Catalogue extends Component{
    state = {
        plantes: [],
        email: localStorage.getItem('email') || '',
        nameComponent: 'catalogue'
    }
    
    //get the catalogue of plants from backend server
    getPlantHandler(){
            console.log('yep');
            fetch('http://localhost:4000/potager/list', {
              method: 'GET'
            })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error('Get plants failed!');
              }
              return res.json();
            })
            .then((resdata)=>{
              console.log(resdata);
              this.setState({plantes: resdata.data}) ;
            })
            .catch(err => {
              console.log(err);
            });
    }

    componentDidMount(){
      this.getPlantHandler();
    }

    render(){

      console.log(this.state.plantes)
      const plants = this.state.plantes.map(plant => {
        console.log(plant);
        return <Plant key={plant._id} plant={plant} email={this.state.email} nameComponent={this.state.nameComponent}/>
      });
      return (
            <div className="col col-xs-12">
              <div className="row">
                <div className="col col-xs-12">
                  <h1>Catalogue des plantes</h1>
                </div>
              </div>
              <div className="row">
                {plants}
              </div>
            </div>
      );
    }


  }
  

export default Catalogue;