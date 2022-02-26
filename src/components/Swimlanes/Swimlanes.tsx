import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Mermaid from "../../shared/components/Mermaid/Mermaid";
import { swimlanesInitial } from "../../shared/initials";
import "./Swimlanes.scss"

const Swimlanes = () => {
  const [value, setValue] = useState(swimlanesInitial);

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
          onChange={(e) => setValue(e.target.value)}
        />
        </div>
        <div className="diagram">
          <Mermaid id='diagram' mmd={value}/>
        </div>
      </div>
    </div>
  )
}

export default Swimlanes;