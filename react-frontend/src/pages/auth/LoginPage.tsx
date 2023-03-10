import React, { useState } from "react";
import { useMutation } from "urql";
import Logo from "../../logo.svg";
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setAuthInfo,
  isAuth,
  getAuthUserInfo,
  setIsAuth
} from '../../features/userLogin/userLoginSlice';
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { FormLabel } from "../../components/Form/FormLabel";
import { FormInput } from "../../components/Form/FormInput";
import { Link } from "react-router-dom";


const CustomerLogin = `
    mutation CustomerLogin (
      $password: String!
      $email: String
    ) {
    login (
      email: $email
      password: $password
    ) {
      first_name
        last_name
        email
        image_path_url
        id
        created_at
        updated_at
        addresses {
            id
        }
        token_info {
            token_type
            access_token
            expires_in
            refresh_token
        }
      }
    }
`;


declare global {
  interface Window { x: any; }
}

export const LoginPage = () => {

  const currentUserInfo = useAppSelector(getAuthUserInfo);
  const isUserAuth = useAppSelector(isAuth)
  const navigate = useNavigate();


  const [customerLoginResult, customerLogin] = useMutation(CustomerLogin)


  console.log(window.x = customerLogin)
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('ind.purvesh@gmail.com')
  const [password, setPassword] = useState('admin123')

  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const variables = { email, password }
    customerLogin(variables).then(({ data }) => {
      const authInfo = get(data, 'login')
      console.log(authInfo)
      dispatch(setAuthInfo(authInfo))
      dispatch(setIsAuth(true))
      navigate('/user/profile')

      
    });
  }
  return (

    <div className="min-h-full">
      <Header />
      <main>
        <div className="flex justify-center mt-5">
          <div className="w-full shadow-md py-12 px-4 sm:px-6 lg:px-8  max-w-md space-y-8">
            <div>
              {JSON.stringify(currentUserInfo)}
              <img
                className="mx-auto h-12 w-auto"
                src={Logo}
                alt="AvoRed Ecommerce"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>

            </div>
            <form className="mt-8 space-y-6" onSubmit={(e) => submitHandle(e)} action="#" method="POST">
              <div className="space-y-1 rounded-md shadow-sm">
                <FormLabel forId="email-address" labelText="Email address" />
                <FormInput id="email-address" value={email} type="email" setOnChange={emailOnChange} placeholder="Email address" />
              </div>
              <div className="space-y-1 rounded-md shadow-sm">
                <FormLabel forId="password" labelText="Password" />
                <FormInput id="password" type="password" value={password} setOnChange={passwordOnChange} placeholder="Password" />
              </div>

              <div className="flex">
                <div className="text-sm ml-auto">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <LockClosedIcon className="absolute w-7 h-7 opacity-40 inset-y-1 left-0 flex items-center pl-3" />
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
