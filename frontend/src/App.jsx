import { Provider } from "react-redux";
import store from "./Redux/store";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <Provider store={store}>
    <AppRoutes/>
    </Provider>
  );
}

export default App;
