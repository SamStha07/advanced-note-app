import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Wrapper } from '../../components';
import { useRegisterMutation } from '../../generated/graphql';
import { FormWrapper } from '../login/login.style';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [signupMutation, { loading, error }] = useRegisterMutation();

  const onSubmitHandler = async (data: FormData) => {
    try {
      await signupMutation({
        variables: data,
      });

      toast.success('Successfully! Please login');
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper center={true}>
      <FormWrapper className='login-container'>
        <div className='left-side'>
          <img
            src='https://businesstemplates.co.nz/wp-content/uploads/2020/12/login-concept-illustration_114360-739.jpg'
            alt='login'
          />
        </div>
        <div className='right-side'>
          <div>
            <img
              src='https://www.freeiconspng.com/uploads/evernote-icon-2.png'
              alt=''
            />
            <h2>Nevernote</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
              <label>Email</label>
              <input
                placeholder='Email'
                type='email'
                {...register('email', {
                  required: 'Email is required',
                })}
              />
              {errors.email && (
                <p className='text-error'>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label>Password</label>
              <input
                placeholder='password'
                type='password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password should be atleast 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className='text-error'>{errors.password.message}</p>
              )}
            </div>
            {error && <div>{JSON.stringify(error)}</div>}
            <div>
              <button disabled={isSubmitting || loading} type='submit'>
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>

            <p>
              Already have an account? Login&nbsp;
              <span>
                <Link to='/login'>here</Link>
              </span>
            </p>
          </form>
        </div>
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginPage;
