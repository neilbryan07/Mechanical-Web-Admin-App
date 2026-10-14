import React, { useEffect } from 'react';
import routes from './routes/routes';
import Loading from './component/Loading/Loading';

import './App.css';
import '../src/assets/style/inputStyle.css';

import { useNavigate, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadingAction } from './redux/loading/loadingSlice';
import { authAction } from './redux/auth/authSlice';
import { getMe } from './redux/auth/authThunk';

function App() {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageLoading } = useSelector((state) => state.loading);

  const handleGetMeToken = async () => {
    try {
      dispatch(loadingAction.setLoadingStatus(true));

      const response = localStorage.getItem('access_token');

      if (response) {
        await dispatch(authAction.setToken(response));
        const getMeResponse = await dispatch(getMe());
        if (!!getMeResponse?.payload?.error) {
          localStorage.removeItem('access_token');
          navigate("/");
        } else {
          localStorage.setItem('access_token', response);
        }
      }
      dispatch(loadingAction.setLoadingStatus(false));
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    (async () => {
      handleGetMeToken();
    })()
  }, []);

  if (pageLoading) {
    return <Loading />
  }

  return (
    <div className="App h-screen">
    {/* <div className="App w-screen h-screen"> */}
      {routing}
    </div>
  );
}

export default App;
