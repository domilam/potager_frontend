import React, {Component} from 'react';

import Plant from './Plant';


class MonPotager extends Component{
    state = {
        plantes: [],
        email: localStorage.getItem('email') || '',
        nameComponent: 'monPotager'
    }
    // useForceUpdate(){
    //   const [value, set] = useState(true); //boolean state
    //   return () => set(!value); // toggle the state to force render
    // }

    postPlantPotagerHandler(){
            console.log('yep');
            const email = this.state.email || '';
            if (email !== ''){
                fetch('http://localhost:4000/potager/listPlantesPotager', {
                  method: 'POST',
                  body: JSON.stringify({email: email}),
                  headers: {'Content-Type':'application/json'}
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
    }

    componentDidMount(){
      this.postPlantPotagerHandler();
    }

    render(){

      console.log(this.state.plantes)
      const plants = this.state.plantes.map((plant,index)=> {
        return <Plant key={index} plant={plant} email={this.state.email} nameComponent={this.state.nameComponent} updatePotager={this.postPlantPotagerHandler}/>
      });
      return (
            <div className="col col-xs-12">
              <div className="row">
                <div className="col col-xs-12">
                  <h1>Mon Potager</h1>
                </div>
              </div>
              <div className="row">
                {plants}
              </div>
            </div>
      );
    }


  }
  

export default MonPotager;