
import { Route, Routes, useLocation } from "react-router-dom";
import './App.scss'
import {Overview, Settings, Sidebar, Transactions} from "./views";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {TAB_CONFIG} from "./constants";

const queryClient = new QueryClient();

function App() {
    const location = useLocation();
    const activeTab = TAB_CONFIG[location.pathname] ?? TAB_CONFIG["/"];

  return (
      <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-zinc-50 text-zinc-900">
        <Sidebar/>

          <main className="flex-1 p-4 lg:p-10 overflow-y-auto">
              <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                  <div>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                          {activeTab.title}
                      </h2>
                      <p className="text-zinc-500 dark:text-zinc-400">{activeTab.subtitle}</p>
                  </div>
              </header>
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
