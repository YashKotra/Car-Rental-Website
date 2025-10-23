import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./pages/Home";
import CarCollection from "./pages/CarCollection";
import CarDetail from "./components/Cars/CarDetails";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<CarCollection />} />
          <Route path="cars/:collection" element={<CarCollection />} />
          <Route path="car/:id" element={<CarDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
