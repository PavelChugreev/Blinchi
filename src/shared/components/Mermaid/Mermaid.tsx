import mermaid from 'mermaid'
import { useEffect, useRef, useState } from 'react'
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

const cyrilicRegexp = /[\u0400-\u04FF]/m;

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
     
    if(cyrilicRegexp.test(mmd)) {
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

  const ref = useRef(null);

  useEffect(() => {
    document.getElementById('ddiagram')?.remove();
  });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`mermaid ${className || ''} ${error ? 'error' : ''}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></div>
  )
}

export default Mermaid;