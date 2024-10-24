import { Header } from 'components/Header';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { ReactComponent as Logo } from 'assets/favicon.svg';
import MessageListPage from "./components/messages/components/MessageListPage";
import {Footer} from "./components/Footer";
import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";
import React from "react";
import {NoPage} from "./components/core/components/NoPage";
import Dashboard from "./components/dashboard/components/Dashboard";
import ProfileListPage from "./components/profile/components/ProfileListPage";
import DeviseListPage from "./components/devices/components/DeviseListPage";
import TransactionsListPage from "./components/transactions/components/TransactionsListPage";
import DetailsListPage from "./components/bank_details/components/DetailsListPage";
import DetailsSinglePage from "./components/bank_details/components/DetailsSinglePage";
import DetailsMainPage from "./components/bank_details/components/DetailsMainPage";
import LoginPage from "./components/auth/components/LoginPage";
import DeviceSinglePage from "./components/devices/components/DeviceSinglePage";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function MainContent() {
    return (
        <>
            <Header title="hola" />
            <Outlet />
            <Footer title="hola"/>
        </>
    )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="main" element={<MainContent/>}>
                <Route path="dashboard"  element={<Dashboard />} />
                <Route path="messages" element={<MessageListPage />} />
                <Route path="profile" element={<ProfileListPage />} />
                <Route path="devices" element={<DetailsMainPage /> } >
                    <Route path=":id" element={<DeviceSinglePage /> } />
                    <Route index element={<DeviseListPage /> } />
                </Route>
                <Route path="transactions" element={<TransactionsListPage /> } />
                <Route path="details" element={<DetailsMainPage /> } >
                    <Route path=":id" element={<DetailsSinglePage /> } />
                    <Route index element={<DetailsListPage /> } />
                </Route>
            </Route>
            <Route path="*" element={<NoPage title="" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
