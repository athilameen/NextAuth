import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import classes from './auth-form.module.css';
import { useRouter } from 'next/router';


async function createUser(email, password){

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password}),
    headers : {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || 'Somthing went wrong!');
  }

  return data;

}

function AuthForm() {

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event){

    event.preventDefault();
    
    const enteredEmailInput = emailInputRef.current.value;
    const enteredPasswordInput = passwordInputRef.current.value;

    if (
      !enteredEmailInput ||
      !enteredEmailInput.includes("@") ||
      !enteredPasswordInput ||
      enteredPasswordInput.trim().length < 8
    ) {
      console.log('Invaild input - Password Should be atleast 8 characters long.');
      return;
    }

    if(isLogin){

      //log user in
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmailInput,
        password: enteredPasswordInput
      });

      if(!result.error && result.ok){
        router.replace('/profile');
      }

    } else {

      try { 
       const result = await createUser(enteredEmailInput, enteredPasswordInput);
       console.log(result);
      } catch (error) {
        console.log(error);
      }
      
    }

  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;