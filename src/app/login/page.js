import Link from "next/link"; // Import Link from Next.js to handle navigation

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-600">
          Do not have an account?
          <Link href="/register"
            className="text-blue-500 hover:underline">Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
