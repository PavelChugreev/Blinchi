import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Mock from "./Mock/Mock";
import { diagramPath, diagramTypes } from "../shared/enums/diagrams-types";
import DiagramPage from "../shared/components/DiagramPage/DiagramPage";
import "antd/dist/antd.css";
import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="" element={<Outlet/>}>
        <Route index element={<Home/>}/>
        <Route path={diagramPath[diagramTypes.SWIMLANE]} element={<DiagramPage type={diagramTypes.SWIMLANE}/>}>
          <Route path=":id" element={<DiagramPage type={diagramTypes.SWIMLANE}/>}/>
        </Route>
        <Route path={diagramPath[diagramTypes.ERD]} element={<DiagramPage type={diagramTypes.ERD}/>}>
          <Route path=":id" element={<DiagramPage type={diagramTypes.ERD}/>}/>
        </Route>
        <Route path="mock-api" element={<Mock/>}/>
      </Route>
      <Route path="*" element={<Navigate to="" />}/>
    </Routes>
  )
}
export default App;
