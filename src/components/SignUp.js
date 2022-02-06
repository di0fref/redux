import ThemeSwitcher from "./ThemeSwitcher";
import {FaLock, FaUser} from "react-icons/fa";
import {HiLockClosed, HiMail} from "react-icons/hi";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider} from "firebase/auth";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../features/userSlice";

function SignUp() {

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .required("Email is required"),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmpassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')

    });
    const dispatch = useDispatch();
    const [showUserError, setShowUserError] = useState(false)
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;
    const navigate = useNavigate();

    function onSubmit(data) {
        /* Create new account */

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((credential) => {

                credential.user.displayName = data.fullname
                credential.user.photoURL = "";

                dispatch(login({
                    credential: credential,
                    user: credential.user
                })).then((result) => {
                    localStorage.setItem("api_token", result.payload.api_token)
                    navigate('/')
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/email-already-in-use") {
                    setShowUserError(true)
                }
            });
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-200">
                <div className="max-w-md w-full p-4 shadow_ bg-white rounded shadow shadow-xl">
                    {showUserError
                        ? <div className={"text-red-500 mt-4 mb-6 text-center"}>There is already an account registered
                            with that email. Please use the login button below.</div>
                        : ""}
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-normal">
                            Sign up
                        </h2>
                    </div>
                    <form className="mt-4" action="#" method="POST" onSubmit={e => e.preventDefault()}>
                        <div className={"mt-2 "}>
                            <div className={"relative"}>
                                <label htmlFor={""} className="sr-only">Name</label>
                                <input {...register("fullname")}

                                       value={"Fredrik Fahlstad"}

                                       id={"fullname"}
                                       name="fullname"
                                       type="text"
                                       className="relative block w-full px-3 py-2 pl-10 pr-3 rounded bg-white ring-1 ring-gray-200"
                                       placeholder="Name"/>
                                <div className="m-px rounded absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none ">
                                    <FaUser/>
                                </div>
                            </div>
                            <span className="text-xs text-red-700">{errors.fullname?.message}</span>

                            <div className={"mt-2 relative"}>
                                <label htmlFor={"email"} className="sr-only">Email</label>
                                <input {...register("email")}

                                    // value={"fredrik@fahlstad.se"}

                                       id={"email"}
                                       name="email"
                                       type="email"
                                       autoComplete="email"
                                       className="relative block w-full px-3 py-2 pl-10 pr-3 rounded bg-white ring-1 ring-gray-200"
                                       placeholder="Email"/>
                                <div className="m-px rounded absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none bg-secondary-alt">
                                    <HiMail/>
                                </div>
                            </div>
                            <span className="text-xs text-red-700">{errors.email?.message}</span>

                            <div className={"mt-2 relative"}>
                                <label htmlFor={"password"} className="sr-only">Password</label>
                                <input

                                    value={"kalle1234"}

                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    className="relative block w-full px-3 py-2 pl-10 pr-3 rounded bg-white ring-1 ring-gray-200"
                                    placeholder="Password"
                                    {...register("password")}/>

                                <div className="m-px rounded absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none  bg-secondary-alt">
                                    <FaLock/>
                                </div>
                            </div>
                            <span className="text-xs text-red-700">{errors.password?.message}</span>

                            <div className={"mt-2 relative"}>
                                <label htmlFor={"confirmpassword"} className="sr-only">Confirm password</label>
                                <input

                                    value={"kalle1234"}

                                    id={"confirmpassword"}
                                    name="confirmpassword"
                                    type="password"
                                    autoComplete="off"
                                    className="relative block w-full px-3 py-2 pl-10 pr-3 rounded bg-white ring-1 ring-gray-200"
                                    placeholder="Confirm password"
                                    {...register("confirmpassword")}/>
                                <div className="m-px rounded absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none  bg-secondary-alt">
                                    <FaLock/>
                                </div>
                            </div>
                            <span className="text-xs text-red-700">{errors.confirmpassword?.message}</span>

                        </div>

                        <div>
                            <button onClick={handleSubmit(onSubmit)} type="submit" className="mt-4  mb-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-s-oldm-old font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="m-px rounded absolute left-0 inset-y-0 flex items-center pl-3">
                                  <HiLockClosed/>
                              </span>
                                Create account
                            </button>
                        </div>
                    </form>

                    <div className={"flex justify-end items-center font-display font-semibold text-s-oldm-old"}>
                        <span>Already have an account? <Link to={"/login"} className={"link"}>Sign in</Link></span>
                    </div>
                </div>
            </div>
            {/*<ThemeSwitcher/>*/}
        </>
    )
}

export default SignUp;
