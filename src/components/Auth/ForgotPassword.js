import React from "react";
import { FirebaseContext } from "../../firebase";


function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);

  const [ resetPasswordEmail, setResetPasswordEmail ] = React.useState('');
  const [ isPasswordReset, setIsPasswordReset ] = React.useState(false);
  const [ passwordResetError, setPasswordReserError ] = React.useState(null);

  // Handle reset password 
  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      console.log("From reset password success");
    } catch (error) {
      setPasswordReserError(error.message);
      setIsPasswordReset(false);
      console.error(error, "From reset password fail");
    }
  }
  return (
    <div>
      <input 
        className="input" 
        type="email" 
        placeholder="Provide yout account email"
        onChange={ event => setResetPasswordEmail(event.target.value) }
      /> 
      <div>
        <button 
          onClick={handleResetPassword}
          className="button">Reset Password</button>
      </div>
      { isPasswordReset && <p>Check your email to reset password</p> }
      { passwordResetError && <p className="error-text">{passwordResetError}</p> }
    </div>
    );
}

export default ForgotPassword;
