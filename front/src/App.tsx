import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Home, Layout } from "./pages";

const App = () => {
  const { pathname } = useLocation();
  const [offline, setOffline] = useState(true);

  const path = pathname.replace("/index", "") || "/";

  const updateOnlineStatus = () => {
    setOffline(navigator.onLine);
    !navigator.onLine
      ? toast((t) => (
          <span>
            <b>YOU ARE OFFLINE</b>
            <button
              className="px-2 ml-10 rounded-lg bg-red-300"
              onClick={() => toast.dismiss(t.id)}
            >
              close
            </button>
          </span>
        ))
      : toast.dismiss();
  };

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();
  }, []);

  return (
    <div className={!offline ? `grayscale` : ""}>
      <Routes location={path}>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      {!offline && (
        <div className="absolute top-0 left-0 w-screen h-screen"></div>
      )}
      <Toaster
        toastOptions={{
          // Define default options
          duration: 30000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default App;
