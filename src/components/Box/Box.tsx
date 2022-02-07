import { Slider } from "antd";
import './Box.scss'

const Box = ({item}) => {
  return (
      <div className="slider">
        <Slider defaultValue={30}/>
      </div>
  )
}

export default Box;