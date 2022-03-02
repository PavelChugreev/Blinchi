import mermaid from 'mermaid'
import { useEffect, useState } from 'react'
import './Mermaid.scss'

interface Props {
  mmd: string;
  id: string;
  className?: string;
  touched?: boolean;
  onRender?: (svg?: string) => void;
  emitError?: (error: boolean) => void
  onClick?: () => void;
}

const escape2Html = (str: string) => {
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
  return str
    .replace(/&(lt|gt|nbsp|amp|quot);/gi, (_, t) => arrEntities[t])
    .trim();
}

const  Mermaid = ({ mmd, id, className, touched, onRender, emitError, onClick }: Props) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false })
  }, []);

  useEffect(() => {
    if (mmd === null || mmd === undefined) {
      return;
    }
     
    if(/[\u0400-\u04FF]/m.test(mmd)) {
      setError(true);
      emitError?.(true);
      return;
    }

  
    try {
      if(mermaid.parse(mmd)){
        mermaid.mermaidAPI.render(id, escape2Html(mmd), (svg) => {
          setSvg(svg);
          setError(false);
          emitError?.(false);
          onRender?.(svg);
        })
      }
    } catch {
      setError(true);
      emitError?.(true);
      console.log('Syntax invalid');
      return;
    }
  }, [mmd]);

  useEffect(() => {
    document.getElementById('ddiagram')?.remove();
  });

  return (
    <>
      {/* {touched && error && <div>Syntax invalid</div>} */}
      <div
        onClick={onClick}
        className={`mermaid ${className || ''} ${error ? 'error' : ''}`}
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    </>

  )
}

export default Mermaid;