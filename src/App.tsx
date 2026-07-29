
import { Route, Routes, useLocation } from "react-router-dom";
import './App.scss'
import {Overview, Settings, Sidebar, Transactions} from "./views";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {TAB_CONFIG} from "./constants";
import {ArrowRightLeft, Plus} from "lucide-react";
import type {ModalId} from "./types";
import {useState} from "react";
import { TransactionModal, TransferModal} from "./components";

const queryClient = new QueryClient();

function App() {
    const location = useLocation();
    const activeTab = TAB_CONFIG[location.pathname] ?? TAB_CONFIG["/"];
    const [activeModal, setActiveModal] = useState<ModalId | null>(null);

    const toggleModal = () => {
        setActiveModal(null);
    };

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


                  <div className="flex items-center gap-3">
                      <button
                          className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
                          type="button"
                          onClick={() => setActiveModal("addTransactionModal")}
                      >
                          <Plus className="w-4 h-4" />
                          <span>Add Transaction</span>
                      </button>
                      <button
                          className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
                          type="button"
                          onClick={() => setActiveModal("transferModal")}
                      >
                          <ArrowRightLeft className="w-4 h-4" />
                          <span>Transfer</span>
                      </button>
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
          {activeModal === "addTransactionModal" && <TransactionModal onCloseModal={toggleModal} />}
          {activeModal === "transferModal" && <TransferModal onCloseModal={toggleModal} />}
      </QueryClientProvider>
  )
}

export default App
