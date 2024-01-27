function SignupForm({ handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="m-2 flex flex-col w-4/5">
      <input
        type="text"
        className="focus:outline-none w-full focus:border-teal-500 border my-2 px-3 py-2 rounded-2xl"
        name="name"
        id="name"
        placeholder="Enter your name"
        autoComplete="off"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        className="focus:outline-none w-full focus:border-teal-500 border my-2 px-3 py-2 rounded-2xl"
        name="email"
        id="email"
        placeholder="Enter your email"
        autoComplete="off"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        className="focus:outline-none w-full focus:border-teal-500 border my-2 px-3 py-2 rounded-2xl"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Enter your password"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        className="focus:outline-none w-full focus:border-teal-500 border my-2 px-3 py-2 rounded-2xl"
        name="password"
        id="password"
        placeholder="Re-enter your password"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="focus:outline-none focus:bg-teal-600 bg-teal-500 hover:bg-teal-600 text-white w-full font-bold my-2 py-2 px-4 rounded-xl"
      >
        Sign up
      </button>
    </form>
  );
}

export default SignupForm;
