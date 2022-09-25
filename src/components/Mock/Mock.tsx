import { data } from '../../data';
import { INode } from '../../shared/interfaces';
import Node from '../Node/Node';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './Mock.scss';

const Mock = () => (
  <div className='container'>
    <div className='header'>
      <h2>Mock API Tree (developing on progress)</h2>
      <Button>
        <Link to='/'>Home</Link>
      </Button> 
    </div>
    {data.resources.map((item: INode) => <Node key={item.id} root item={item}/>)}
  </div>
)

export default Mock;