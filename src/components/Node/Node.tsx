import { useState } from 'react';
import { INode } from '../../shared/interfaces';
import { Slider } from 'antd';
import { Button } from 'antd';
import './Node.scss'


const Node = ({item, root = false}) => {

  const [vis, setVis] = useState<boolean>(false);

  return (
    <div className={`node ${root ? 'root' : ''}`}>
      <div className={`item-wrapper ${item.children?.length ? 'has-children' : ''}`}>
        <div
          className="item"
          onMouseOver={() => setVis(true)}
          onMouseLeave={() => setVis(false)}
        >
          <div className="info">
            <div className='name'>{item.name}</div>
            <div className="slider">
              <Slider defaultValue={30}/>
            </div>
          </div>

          {vis && 
            <div className="buttons">
              <Button size='small'>Data</Button>
              <Button size='small'>Edit</Button>
              <Button size='small'>Delete</Button>
            </div>
          }
        </div>

      </div>
      <div className='children-wrapper'>
        {item.children && !item.children.length ||
          item.children?.map((child: INode) => (
            <Node key={child.id} item={child}/>
          ))
        }
      </div>
    </div>
  )
}

export default Node;


