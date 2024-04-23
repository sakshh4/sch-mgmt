import { BrowserRouter } from "react-router-dom";
import "./App.css";
import WebRoutes from "./routes/WebRoutes";
import { GlobalContext } from "./contexts/GlobalContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import React from "react";
import Auth from "./pages/Auth";

function App() {
  const { isAuth } = React.useContext(GlobalContext);
  console.log(isAuth);
  return (
    <>
      <BrowserRouter>
        <div className="w-full flex flex-row h-full min-h-screen bg-secondary">
          {isAuth ? (
            <>
              <div className="w-[20%] max-h-[100vh] min-h-[100vh] ">
                <Sidebar />
              </div>
              <div className="w-[80%] max-h-[100vh] flex flex-col">
                <Header />
                <div className="w-full h-full flex-1 overflow-y-auto">
                  <WebRoutes />
                </div>
              </div>
            </>
          ) : (
            <Auth />
          )}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
