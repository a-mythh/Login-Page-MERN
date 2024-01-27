function LoginForm({ handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="m-2 flex flex-col w-4/5">
      <input
        type="email"
        className="focus:outline-none focus:border-teal-500 w-full border my-2 px-3 py-2 rounded-2xl"
        name="email"
        id="email"
        placeholder="Enter your email"
        autoComplete="off"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        className="focus:outline-none focus:border-teal-500 w-full border my-2 px-3 py-2 rounded-2xl"
        name="password"
        id="password"
        placeholder="Enter your password"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="focus:outline-none focus:bg-teal-600 bg-teal-500 hover:bg-teal-600 text-white w-full font-bold my-2 py-2 px-4 rounded-xl"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
