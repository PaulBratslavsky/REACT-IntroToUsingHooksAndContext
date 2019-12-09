import React from "react";

// Import Firebase
import firebase from '../../firebase';

// Import Helper Function
import validateLogin from './validateLogin';

// Import Custom Hook
import useFormValidation from './useFormValidation';

function Login(props) {

  // Initial State
  const INITIAL_STATE = {
    name: "",
    email: "",
    password: ""
  };

  const { 
    handleChange, 
    handleSubmit, 
    handleBlur,
    values,
    errors,
    isSubmitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  

  // Using Hooks
  const [login, setLogin] = React.useState(true);
  const [firebaseErrors, setFirebaseErrors] = React.useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;

    // Use Try Catch To Display Error
    try {
      login 
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
        props.history.push("/");
    } catch (errors) {
      setFirebaseErrors(errors.message);
      console.log(errors.message, "FROM CATCH");
    }


  }

  return (
    <div>
      <h2 className="mv3">{ !login ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        { !login && <input
          onChange={handleChange} 
          value={values.name} 
          name="name" 
          type="text" 
          placeholder="Your name" 
          autoComplete="off"/>          
        }
        <input 
          className={errors.email && 'error-input'} 
          onChange={handleChange} 
          onBlur={handleBlur} 
          value={values.email} 
          name="email" 
          type="email" 
          placeholder="Your email" 
          autoComplete="off"
        />
        {errors.email && <p className="error-text" >{errors.email}</p>}
        <input 
          className={errors.password && 'error-input'} 
          onChange={handleChange} 
          onBlur={handleBlur} 
          value={values.password} 
          name="password" 
          type="password" 
          placeholder="Choose a secure password" 
        />
        {errors.password && <p className="error-text" >{errors.password}</p>}
        {firebaseErrors && <p className="error-text" >{firebaseErrors}</p>}
        <div className="flex mt3">
          <button 
            style={{background: isSubmitting ? "grey" : "orange"}}
            disabled={isSubmitting} 
            type="submit" 
            className="button pointer mr2">Submit
          </button>
          <button 
            type="button" 
            className="button pointer" 
            onClick={ () =>  setLogin(prevLogin => !prevLogin) } >
            { !login ? 'Allready have an account?' : 'Need to create an account?'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login;
