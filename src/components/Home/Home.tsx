import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, List, Divider } from "antd";
import { IDiagram } from "../../shared/interfaces";
import { SwimlanesClient } from "../../api/SwimlanesClient";
import { getFullDate } from "../../shared/utils";
import './Home.scss';

const Home = () => {
  const [diagrams, setDiagrams] = useState<IDiagram[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    SwimlanesClient.getAllDiagrams()
      .then(res => {
        setDiagrams(res.diagrams)
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      <h1>Blinchi.com</h1>
      <div className='nav-buttons'>
        <Button>
          <Link to='/swimlanes'>Swimlanes</Link>
        </Button>
        <Button>Entity Relationship Diagram</Button>
        <Button>
          <Link to='/mock-api'>Mock Api</Link>
        </Button>
      </div>
      {diagrams &&
        <div className='diagrams'>
          <Divider orientation="left"><h3>Diagrams</h3></Divider>
          <List
            bordered
            dataSource={diagrams}
            loading={loading}
            header={
              <div className='row'>
                <strong>Type</strong>
                <strong>Created</strong>
                <strong>Updated</strong>
                <strong>Id</strong>
              </div>
            }
            renderItem={d => {
              const created = getFullDate(new Date(d.createdAt));
              const updated = getFullDate(new Date(d.updatedAt));

              const da = new Date()
              console.log(da, da.getMonth())
              return (
              <List.Item className='row'>
                <div>{d.type}</div>
                <div>{created}</div>
                <div>{updated}</div>
                <Link to={`/swimlanes/${d.id}`}>{d.id}</Link>
              </List.Item>
            )}}
          />
        </div>
      }
    </div>
  )
}

export default Home;
