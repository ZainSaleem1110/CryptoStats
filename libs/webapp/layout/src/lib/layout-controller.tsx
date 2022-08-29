import { useLocation } from 'react-router-dom';
import { useAuthGuard } from '@webapp/hooks';
import { Paper } from '@mui/material';
import Redirect from "./redirect";
import { PublicLayout } from '@common/layout';
import { AuthLayout } from './auth';

export function LayoutController(props: { children: React.ReactNode}) {
  const [auth] = useAuthGuard();
  const location = useLocation();

  if (auth === true && location.pathname.includes('/auth')) {
    return <Redirect path="/" />;
  }

  if (auth === false && !location.pathname.includes('/auth/signin')) {
    return <Redirect path="/auth/signin" />;
  }
  
  if (auth === true) {
    return <AuthLayout>{props.children}</AuthLayout>;
  }
  
  if (auth === false || auth === 'creating') {
    return <PublicLayout>{props.children}</PublicLayout>;
  }

  return <Paper>Unknown layout!</Paper>
}