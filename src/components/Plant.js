import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

    //get the catalogue of plants from backend server

class Plant extends Component{
    state = {
        plantes: [],
        email: localStorage.getItem('email') || '',
        nameComponent: 'monPotager',
        redirect: false
    }
    // useForceUpdate(){
    //   const [value, set] = useState(true); //boolean state
    //   return () => set(!value); // toggle the state to force render
    // }

    //get the catalogue of plants from backend server
    postPlantHandler(){
        console.log('yep');
        if (this.state.email !== ''){
            fetch('http://localhost:4000/potager/addPlantePotager', {
                method: 'POST',
                body: JSON.stringify({email: this.state.email, planteId: this.props.plant._id}),
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
            })
            .catch(err => {
                console.log(err);
            });

        }
    }
    deletePlantHandler(){
        console.log(this.props.plant.plantePotagerId);
        if (this.state.email !== ''){
            fetch('http://localhost:4000/potager/deletePlantePotager', {
                method: 'POST',
                body: JSON.stringify({email: this.state.email || '', plantePotagerId: this.props.plant.plantePotagerId}),
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
                this.setState({redirect: true});
            })
            .catch(err => {
                console.log(err);
            });

        }
    }    

    render(){
        const redirect = this.state.redirect;
        if (redirect === true) {
            return <Redirect to="/potagerPlants" />
        }
    
        return (
            <article className="col col-sm-3 plant_items">
                <h2>{this.props.plant.nom_plante}</h2>
                <p>{this.props.plant.type_plante}</p>
                <p>{this.props.plant.etat}</p>
                <p>{this.props.plant.description}</p>
                {this.props.email !== '' && this.props.nameComponent === 'catalogue'?
                    <button onClick={() => this.postPlantHandler(this.props)}>Ajouter au potager</button>
                    :null
                }
                {this.props.email !== '' && this.props.nameComponent === 'monPotager'?
                    <button onClick={() => this.deletePlantHandler(this.props)}>Supprimer du potager</button>
                    :null
                }
            </article>
        );
    }


}


export default Plant;