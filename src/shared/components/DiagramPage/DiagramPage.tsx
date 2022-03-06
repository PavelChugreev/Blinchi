import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { DownloadOutlined } from '@ant-design/icons';
import Mermaid from "../../../shared/components/Mermaid/Mermaid";
import { DiagramsClient } from "../../../api/DiagramsClient";
import { exportAsImage } from "../../../shared/utils";
import { diagramPrefix, diagramTitles, diagramTypes } from "../../../shared/enums/diagrams-types";
import { initials } from "../../initials";
import "./DiagramPage.scss"

const DiagramPage: React.FC<{type: diagramTypes}> = ({ type }) => {
  const [value, setValue] = useState<string>(initials[type]);
  const [loading, setLoading] = useState<any>({page: false, save: false});
  const [syntaxError, setSyntaxError] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const diagramRef: any = useRef();

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

  const onExport = useCallback(() => {
    exportAsImage(diagramRef.current, `${type}-diagram`);
  }, [diagramRef]);

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

    DiagramsClient.addDiagram(value, type)
      .then(({ diagram }) => {
        setLoading({...loading, save: false});
        navigate(diagram.id);
      })
      .catch((e) => {
        setLoading({...loading, save: false});
        console.log(e);
      })
  }, [value]);

  const valueWithoutPrefix = useMemo(() => value.replace(diagramPrefix[type] + '\n', ''), [value, type]);
  const addPrefix = useCallback((value: string = '') => `${diagramPrefix[type]}\n${value}`, [type]);

  return (
    <div className="diagram">
      <div className="diagram__top">
        <h2>{diagramTitles[type]}</h2>
        <div className="diagram__top_buttons">
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
      <div className="diagram__content">
        <div className="diagram__content_input">
        <TextArea
          value={valueWithoutPrefix}
          disabled={loading.page || loading.save}
          onChange={(e) => {
            setValue(addPrefix(e.target.value));
          }}
        />
        </div>
        <div ref={diagramRef} className="diagram__content_diagram">
          {!loading.page
            ? <Mermaid id='diagram' mmd={value} emitError={(val) => setSyntaxError(val)}/> 
            : <Spin tip='Loading...' size="large"/>}
        </div>
      </div>
      <div className="diagram__buttons">
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

export default DiagramPage;
