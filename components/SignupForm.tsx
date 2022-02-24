import Link from 'next/link';
import styles from './loginForm.module.scss';

const SignupForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>UserPages</h1>
      <div className={styles.inputBox}>
        {/* consider adding Facebook o Google as an option */}
        <input className={styles.input} placeholder='Email'></input>
        <input className={styles.input} placeholder='Full Name'></input>
        <input className={styles.input} placeholder='Username'></input>
        <input className={styles.input} placeholder='Password'></input>
        <button className={styles.submit}>Sign Up</button>
      </div>
      <div>
        <p className={styles.noAccount}>
          {'Have an account?'}{' '}
          <Link href='/login'>
            <a>Log In</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
