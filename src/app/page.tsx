export default function LandingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to the Aptitude Practice Platform!</h1>
      <p className="mb-6">Sharpen your skills for quantitative, logical, and verbal reasoning.</p>
      {/* Add Link components from next/link later for navigation */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        Sign Up
      </button>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
      {/* Placeholder content - Hero, Features etc. will replace this */}
    </div>
  );
}