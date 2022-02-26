import { Link } from "react-router-dom";
import { Button } from "antd";
import './Home.scss';

const Home = () => (
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
  </div>
)

export default Home;