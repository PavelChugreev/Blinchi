import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { DownloadOutlined } from '@ant-design/icons';
import Mermaid from "../../shared/components/Mermaid/Mermaid";
import { DiagramsClient } from "../../api/DiagramsClient";
import { initials } from "../../shared/initials";
import { exportAsImage } from "../../shared/utils";
import { diagramTypes } from "../../shared/enums/diagrams-types";
import "./Swimlanes.scss"
import DiagramPage from "../../shared/components/DiagramPage/DiagramPage";

const Swimlanes = () => {
  return <DiagramPage type={diagramTypes.SWIMLANE}/>
}

const Swimlanes1: React.FC<{prefix?: string}> = ({prefix = 'sequenceDiagram'}) => {
  const [value, setValue] = useState<string>(initials[diagramTypes.SWIMLANE]);
  const [loading, setLoading] = useState<any>({page: false, save: false});
  const [syntaxError, setSyntaxError] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const diagram: any = useRef();

  useEffect(() => {
    if (!id) {
      return;
    }
    
    setLoading({...loading, page: true});

    DiagramsClient.getDiagram(id)
      .then(({ diagram }) => {
        setValue(window.atob(diagram.data))
      })
      .catch((e) =>  {
        console.log(e);
        navigate('');
      })
      .finally(() => setLoading({...loading, page: false}))
  }, [id]);

  const onSubmit = useCallback(() => {
    if (id) {
      update();
      return;
    }
    save();
  }, [value, id]);

  const onExport = useCallback(() => exportAsImage(diagram.current, 'swimlanes-diagram'), [diagram]);

  const update = useCallback(() => {
    if(!id) {
      return;
    }
    setLoading({ page: true, save: true });

    DiagramsClient.updateDiagram(id, value)
    .catch((e) =>  console.log(e))
    .finally(() => setLoading({ page: false, save: false }))
  }, [id, value]);

  const save = useCallback(() => {
    setLoading({...loading, save: true});

    DiagramsClient.addDiagram(value, diagramTypes.SWIMLANE)
      .then(({ diagram }) => {
        setLoading({...loading, save: false});
        navigate(diagram.id);
      })
      .catch((e) => {
        setLoading({...loading, save: false});
        console.log(e);
      })
  }, [value]);

  const valueWithoutPrefix = useMemo(() => value?.replace(prefix + '\n', ''), [value, prefix]);
  const addPrefix = useCallback((value: string = '') => `${prefix}\n${value}`, [prefix]);

  return (
    <div className="swimlanes">
      <div className="swimlanes__top">
        <h2>Swimlanes</h2>
        <div className="swimlanes__top_buttons">
          <Button
            icon={<DownloadOutlined/>}
            onClick={onExport}
            disabled={loading.page}>
              Export img
            </Button>
          <Button>
            <Link to='/'>Home</Link>
          </Button>
        </div>
      </div>
      <div className="swimlanes__content">
        <div className="swimlanes__content_input">
        <TextArea
          value={valueWithoutPrefix}
          disabled={loading.page || loading.save}
          onChange={(e) => {
            setValue(addPrefix(e.target.value));
          }}
        />
        </div>
        <div ref={diagram} className="swimlanes__content_diagram">
          {!loading.page
            ? <Mermaid id='diagram' mmd={value} emitError={(val) => setSyntaxError(val)}/> 
            : <Spin tip='Loading...' size="large"/>}
        </div>
      </div>
      <div className="swimlanes__buttons">
        <Button onClick={() => setValue('')}>Clear</Button>
        <Button
          type="primary"
          loading={loading.save}
          disabled={syntaxError}
          onClick={() => onSubmit()}
        >
          {id ? 'Update' : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Swimlanes;