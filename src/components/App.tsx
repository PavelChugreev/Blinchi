import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Mock from "./Mock/Mock";
import Swimlanes from "./Swimlanes/Swimlanes";
import "antd/dist/antd.css";
import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to='blinchi' />} />
      <Route path="blinchi" element={<Outlet/>}>
        <Route index element={<Home/>}/>
        <Route path="swimlanes" element={<Swimlanes/>}>
          <Route path=":id" element={<Swimlanes/>}/>
        </Route>
        <Route path="mock-api" element={<Mock/>}/>
      </Route>
      <Route path="*" element={<Navigate to='blinchi' />}/>
    </Routes>
  )
}
export default App;
