import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, List, Divider } from "antd";
import { IDiagram } from "../../shared/interfaces";
import { SwimlanesClient } from "../../api/SwimlanesClient";
import './Home.scss';

const Home = () => {
  const [diagrams, setDiagrams] = useState<IDiagram[]>([])

  useEffect(() => {
    SwimlanesClient.getAllDiagrams()
      .then(res => {
        setDiagrams(res.diagrams.reverse())
      })
      .catch(e => console.log(e))
  }, [])

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
      {diagrams &&
        <>
          <Divider orientation="left"><h3>Diagrams</h3></Divider>
          <List
            bordered
            dataSource={diagrams}
            renderItem={d => {
              const date = new Date(d.createdAt)
              console.log(date);
              
              return (
              <List.Item>
                <div>{d.type}</div>
                <div>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</div>
                <Link to={`/swimlanes/${d.id}`}>{d.id}</Link>
              </List.Item>
            )}}
          />
        </>
      }
    </div>
  )
}

export default Home;