
import { Route, Routes, } from "react-router-dom";
import './App.scss'
import {Overview, Settings, Sidebar, Transactions} from "./views";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  return (
      <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-zinc-50 text-zinc-900">
        <Sidebar/>

          <main className="flex-1 p-4 lg:p-10 overflow-y-auto">
              <Routes>
                  <Route
                      path="/"
                      element={
                          <Overview
                          />
                      }
                  />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/settings" element={<Settings />} />
              </Routes>
          </main>
      </div>
      </QueryClientProvider>
  )
}

export default App
