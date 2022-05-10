import React, { useEffect } from 'react';
import { NetworkStatus, useQuery } from "@apollo/client";
import { STUDENTS } from './grahpql/students';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import FooterPage from './components/common/Footer';
import { Layout } from 'antd';
import Home from './components/Home';
import 'antd/dist/antd.css';
const { Content } = Layout;

function App() {

  const { loading, error, data, refetch: refetchUsers, networkStatus } = useQuery(STUDENTS, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
        refetchUsers();
  }, [])

  
  if(error) {
    return <h1>Oops, Something went wrong!</h1>
  }

  if (networkStatus === NetworkStatus.refetch) return 'fetching again!';

  console.log(data)

  return (
    <>
    <Header />
    <ContentPage />
    <FooterPage />
    </>
  )
}

export default App;
const ContentPage = () => (<Content>
  <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/:id"
        element={<UserProfile />}
      />
    </Routes>
</Content>)
const UserProfile = () => <div>UserProfile</div>