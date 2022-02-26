import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Mermaid from "../../shared/components/Mermaid/Mermaid";
import { SwimlanesClient } from "../../api/SwimlanesClient";
import { LocalStorageService } from "../../shared/services/localStorageService";
import "./Swimlanes.scss"

const Swimlanes = () => {
  const [value, setValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const [loading, setLoading] = useState<any>({page: false, save: false});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    
    setLoading({...loading, page: true});

    SwimlanesClient.getDiagram(id)
      .then((res) => {
        setValue(res.text)
      })
      .catch((e) =>  {
        console.log(e);
        navigate('/swimlanes');
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
    setLoading({ page: true, save: true });

    SwimlanesClient.updateDiagram(id, value)
    .then((res) => {
      const graphs = LocalStorageService.get('graphs')?.map(g => {
        return g.id === id ? {...g, text: res.text} : g;
      })
      LocalStorageService.set('graphs', graphs);
      setValue(res.text);
    })
    .catch((e) =>  console.log(e))
    .finally(() => setLoading({ page: false, save: false }))
  }, [id, value])

  const save = useCallback(() => {
    setLoading({...loading, save: true});

    SwimlanesClient.saveDiagram(value)
      .then((res) => {
        setLoading({...loading, save: false});
        navigate(`/swimlanes/${res.id}`);

        const graphs = LocalStorageService.get('graphs');
        
        if(graphs){
          LocalStorageService.set('graphs', [
            ...graphs,
            { id: res.id, text: value, type: 'swim' }
          ])
          return;
        }
        LocalStorageService.set('graphs', [{
          id: res.id, text: value, type: 'swim'
        }])
      })
      .catch((e) => {
        setLoading({...loading, save: false});
        console.log(e);
      })
  }, [value])

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
          value={value}
          disabled={loading.page || loading.save}
          onBlur={() => setTouched(true)}
          onChange={(e) => {
            setValue(e.target.value || '');
            setTouched(true);
          }}
        />
        </div>
        <div className="diagram">
          {!loading.page
            ? <Mermaid id='diagram' mmd={value} touched={touched}/> 
            : <Spin tip='Loading...' size="large"/>}
        </div>
      </div>
      <div className="swimlanes__buttons">
        <Button onClick={() => setValue('')}>Clear</Button>
        <Button type="primary" loading={loading.save} onClick={() => onSubmit()}>{id ? 'Update' : 'Save'}</Button>
      </div>
      
    </div>
  )
}

export default Swimlanes;