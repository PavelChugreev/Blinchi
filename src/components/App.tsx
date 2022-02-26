import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Mock from "./Mock/Mock";
import Swimlanes from "./Swimlanes/Swimlanes";
import "antd/dist/antd.css";
import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/home'/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/swimlanes" element={<Swimlanes/>}/>
      <Route path="/mock-api" element={<Mock/>}/>
      <Route path="*" element={<Navigate to='/'/>} />
    </Routes>
  )
}
export default App;
