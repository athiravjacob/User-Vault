import SignUpForm from "../components/SignupForm"
 const SignUp = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col justify-center  px-4 sm:px-6 lg:px-8">
            <h1 className="text-green-400 text-3xl font-serif font-extrabold">User Vault</h1>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-mono text-green-400">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm />

        </div>
      </div>
    </div>
    )
}

export default SignUp