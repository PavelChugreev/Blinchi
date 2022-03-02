import { useCallback, useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Mermaid from "../../shared/components/Mermaid/Mermaid";
import { SwimlanesClient } from "../../api/SwimlanesClient";
import { swimlanesInitial } from "../../shared/initials";
import "./Swimlanes.scss"

const Swimlanes: React.FC<{prefix?: string}> = ({prefix = 'sequenceDiagram'}) => {
  const [value, setValue] = useState<string>(swimlanesInitial);
  const [touched, setTouched] = useState<boolean>(false);
  const [loading, setLoading] = useState<any>({page: false, save: false});
  const [syntaxError, setSyntaxError] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    
    setLoading({...loading, page: true});

    SwimlanesClient.getDiagram(id)
      .then(({ diagram }) => {
        setValue(window.atob(diagram.data))
      })
      .catch((e) =>  {
        console.log(e);
        navigate('');
      })
      .finally(() => setLoading({...loading, page: false}))
  }, [id])

  const onSubmit = useCallback(() => {
    if (id) {
      update();
      return;
    }
    save();
  }, [value, id])

  const update = useCallback(() => {
    if(!id) {
      return;
    }
    setLoading({ page: true, save: true });

    SwimlanesClient.updateDiagram(id, value)
    .catch((e) =>  console.log(e))
    .finally(() => setLoading({ page: false, save: false }))
  }, [id, value])

  const save = useCallback(() => {
    setLoading({...loading, save: true});

    SwimlanesClient.addDiagram(value)
      .then(({ diagram }) => {
        setLoading({...loading, save: false});
        navigate(diagram.id);
      })
      .catch((e) => {
        setLoading({...loading, save: false});
        console.log(e);
      })
  }, [value])

  const valueWithoutPrefix = useMemo(() => value.replace(prefix + '\n', ''), [value, prefix]);
  const addPrefix = useCallback((value: string = '') => `${prefix}\n${value}`, [prefix]);

  return (
    <div className="swimlanes">
      <div className="swimlanes__top">
        <h2>Swimlanes</h2>
        <Button>
          <Link to='/'>Home</Link>
        </Button>
      </div>
      <div className="swimlanes__content">
        <div className="input">
        <TextArea
          value={valueWithoutPrefix}
          disabled={loading.page || loading.save}
          onBlur={() => setTouched(true)}
          onChange={(e) => {
            setValue(addPrefix(e.target.value));
            setTouched(true);
          }}
        />
        </div>
        <div className="diagram">
          {!loading.page
            ? <Mermaid id='diagram' mmd={value} touched={touched} emitError={(val) => setSyntaxError(val)}/> 
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