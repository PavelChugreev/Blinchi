import mermaid from 'mermaid'
import { useEffect, useState } from 'react'
import './Mermaid.scss'

interface Props {
  mmd: string;
  id: string;
  className?: string;
  touched?: boolean;
  onRender?: (svg?: string) => void;
  onClick?: () => void;
}

const escape2Html = (str: string) => {
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
  return str
    .replace(/&(lt|gt|nbsp|amp|quot);/gi, (_, t) => arrEntities[t])
    .trim();
}

const  Mermaid = ({ mmd, id, className, touched, onRender, onClick }: Props) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false })
  }, [])

  useEffect(() => {
    if (mmd === null || mmd === undefined) {
      return;
    }

    try {
      if(mermaid.parse(mmd)){
        mermaid.mermaidAPI.render(id, escape2Html(mmd), (svg) => {
          setSvg(svg);
          setError(false);
          onRender?.(svg);
        })
      }
    } catch {
      setError(true);
      console.log('Syntax invalid');
      return;
    }
  }, [mmd])

  return (
    <>
      {touched && error && <div>Syntax invalid</div>}
      <div
        onClick={onClick}
        className={`mermaid ${className || ''} ${error ? 'error' : ''}`}
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    </>

  )
}

export default Mermaid;