import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function Redirect(props: { 
  path: string,
}) {
  const { path } = props;
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(path, { replace: true });
  }, [navigate, path])

  return <div>Redirecting to {props.path}</div>;
}