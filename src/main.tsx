import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';

import 'react-tooltip/dist/react-tooltip.css'
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import MessageListPage from "./components/messages/components/MessageListPage";
import {NoPage} from "./components/core/components/NoPage";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MessageListPage />,
    errorElement: <NoPage title=""/>,
  },
]);


const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}
