const Heading = ({ showSignupForm }) => {
  const head = showSignupForm ? "Sign up" : "Login";
  const message = showSignupForm
    ? "Hey there! Kindly enter your details."
    : "Welcome back! Please enter your details.";

  return (
    <div className="my-6 mx-2">
      <h1 className="text-2xl text-center my-1 font-medium">{head}</h1>
      <p className="text-base text-center text-slate-500">{message}</p>
    </div>
  );
};

export default Heading;
