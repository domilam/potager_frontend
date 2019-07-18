import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
                emailLogin: '',
                pwdLogin: '',
                redirect: false
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePwd = this.handleChangePwd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeEmail(event) {
        this.setState({emailLogin: event.target.value});
    }
    handleChangePwd(event) {
        this.setState({pwdLogin: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
    //   const data = new FormData(event.target);
      console.log(this.state);
      
      fetch('http://localhost:4000/admin/signin', {
        method: 'POST',
        body: JSON.stringify({emailLogin: this.state.emailLogin, pwdLogin: this.state.pwdLogin}),
        headers: {'Content-Type':'application/json'}
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Error login');
          }
          return res.json();
        })
        .then((resdata)=>{
            localStorage.setItem('email', resdata.data)
            console.log(resdata);
            this.setState({redirect: true})
            console.log(this.state);
        });
    }
  
    render() {
      const redirect = this.state.redirect;
      if (redirect === true) {
          return <Redirect to="/potagerPlants" />
      }
      return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="emailLogin">Email: </label>
                    <input type="email" name="emailLogin" id="emailLogin" value={this.state.emailLogin} onChange={this.handleChangeEmail}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwdLogin">Password: </label>
                    <input type="password" name="pwdLogin" id="pwdLogin" value={this.state.pwdLogin} onChange={this.handleChangePwd}/>
                </div>
                <div className="inline-centered">
                    <button className="btn btn-primary">Valider</button>
                </div>
            </form>
      );
    }
  }


export default Login;