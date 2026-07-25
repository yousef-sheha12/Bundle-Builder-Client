import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import { useStore } from "./store/useStore";

function App() {
  const { loadProducts, isLoading } = useStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadProducts().finally(() => setReady(true));
  }, [loadProducts]);

  if (!ready && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <LandingPage />
    </>
  );
}

export default App;
