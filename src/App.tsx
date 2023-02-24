import { HashRouter } from "react-router-dom";
import AuthRouter from "@/router/utils/authRouter";
import Router from "@/router/index";

function App() {
  return (
    <HashRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
  </HashRouter>
  );
}

export default App;
