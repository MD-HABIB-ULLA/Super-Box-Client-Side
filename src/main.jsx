import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Routes/router";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateWebFormContext from "./Context/CreateWebFormContext";
import WebDataDisProvider from "./Context/WebDataDisContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        
          <CreateWebFormContext>
            <Toaster />
            <RouterProvider router={router} />
          </CreateWebFormContext>
      
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
