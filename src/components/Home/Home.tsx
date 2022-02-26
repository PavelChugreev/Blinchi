import { Link } from "react-router-dom";
import { Button } from "antd";
import { LocalStorageService } from "../../shared/services/localStorageService";
import { IGraph } from "../../shared/interfaces";
import './Home.scss';

const Home = () => {
  const graphs: IGraph[] | null = LocalStorageService.get('graphs');

  return (
    <div className="home">
      <h1>Blinchi.com</h1>
      <div className='main'>
        <Button>
          <Link to='/swimlanes'>Swimlanes</Link>
        </Button>
        <Button>Entity Relationship Diagram</Button>
        <Button>
          <Link to='/mock-api'>Mock Api</Link>
        </Button>
      </div>
      <ul className="graphs-list">
        {graphs && graphs.map((graph, i) => {
          return (
            <li className="graph" key={graph.id}>
              <Link to={`/swimlanes/${graph.id}`}>{graph.id}</Link>
              <div>{graph.type}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home;