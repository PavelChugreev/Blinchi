import { data } from '../data';
import { INode } from '../shared/interfaces';
import Node from './Node/Node';
import "antd/dist/antd.css";
import './App.scss';

const App = () => (
  <div className='container'>
    {data.resources.map((item: INode) => <Node key={item.id} root item={item}/>)}
  </div>
)

export default App;
