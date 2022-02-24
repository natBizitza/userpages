import axios from 'axios';
import * as Yup from 'yup';
import Link from 'next/link';
import { useMutation } from 'react-query';
import styles from './loginForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  email: string;
  password?: string;
};
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const fetcher = ({ email, password }: Props) =>
  axios.post('https://reqres.in/api/login', { email, password });
//error handling is missing

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_REGEX, {
      excludeEmptyString: true,
      message: 'Email should be valid',
    })
    .required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const { mutateAsync, isLoading } = useMutation(fetcher, {
    onSuccess: () => {
      alert('Login was sucessful!');
    },
    onError: (error) => {
      alert(`There was an error: ${error}. Try again!`);
    },
  });

  const onSubmit = (data: Props) => {
    console.log({ data });
    mutateAsync({ email: data.email, password: data.password });
  };

  const { handleSubmit, formState, register } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { errors, isSubmitting } = formState;

  console.log({ errors });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <h1 className={styles.heading}>UserPages</h1>
        <div className={styles.inputBox}>
          <div className={styles.input}>
            <input
              {...register('email')}
              className={styles.input}
              placeholder='Email'
            />
            <div className='invalid-feedback'>{errors.email?.message}</div>
          </div>

          <input
            {...register('password')}
            type='password'
            className={styles.input}
            placeholder='Password'
          />
          <div className='invalid-feedback'>{errors.password?.message}</div>
          <button
            type='submit'
            className={styles.submit}
            disabled={isLoading || isSubmitting}
          >
            Log In
          </button>
        </div>
        <div className='div'>
          <p className={styles.noAccount}>
            {"Don't have an account?"}{' '}
            <Link href='/signUp'>
              <a>Sign Up</a>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
