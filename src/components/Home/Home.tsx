import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, List, Divider } from "antd";
import { Pagination } from 'antd';
import { IDiagram } from "../../shared/interfaces";
import { DiagramsClient } from "../../api/DiagramsClient";
import { getFullDate, getTime } from "../../shared/utils";
import { diagramPath, diagramTitles, diagramTypes } from "../../shared/enums/diagrams-types";
import './Home.scss';

const Home = () => {
  const [diagrams, setDiagrams] = useState<IDiagram[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{
    total: number;
    current: number
  }>({total: 0, current: 1});

  useEffect(() => {
    setLoading(true);

    DiagramsClient.getAllDiagrams()
      .then(res => {
        setDiagrams(res.diagrams);
        setPagination({...pagination, total: res.totalAmount});
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const onChangePage = useCallback((page: number, size: number) => {
    setLoading(true);

    DiagramsClient.getAllDiagrams({
      params: {  Skip: (page - 1) * size }
    })
      .then(res => {
        setDiagrams(res.diagrams);
        setPagination({ current: page, total: res.totalAmount});
      })
      .catch(e => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }, [])

  return (
    <div className="home">
      <h1>Blinchi.com</h1>
      <div className='nav-buttons'>
        <Button>
          <Link to={diagramPath[diagramTypes.SWIMLANE]}>{diagramTitles[diagramTypes.SWIMLANE]}</Link>
        </Button>
        <Button>
          <Link to={diagramPath[diagramTypes.ERD]}>{diagramTitles[diagramTypes.ERD]}</Link>
        </Button>
        <Button>
          <Link to='mock-api'>Mock Api</Link>
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
              const createdTime = getTime(new Date(d.createdAt));
              const updated = getFullDate(new Date(d.updatedAt));
              const updatedTime = getTime(new Date(d.updatedAt));

              return (
                <List.Item className='row'>
                  <div>{d.type}</div>
                  <div>{`${created} - ${createdTime}`}</div>
                  <div>{`${updated} - ${updatedTime}`}</div>
                  <Link to={`${diagramPath[d.type]}/${d.id}`}>{d.id}</Link>
                </List.Item>
            )}}
          />
        </div>
      }
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          current={pagination.current}
          total={pagination.total}
          pageSize={10}
          onChange={(page, size) => onChangePage(page, size)} 
        />
      </div>
    </div>
  )
}

export default Home;
