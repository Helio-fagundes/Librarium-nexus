
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { initializeLocalStorage } from "./lib/mockData";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BookDetail from "./pages/BookDetail";
import NewBook from "./pages/NewBook";
import EditBook from "./pages/EditBook";
import Messages from "./pages/Messages";
import Conversation from "./pages/Conversation";
import NewMessage from "./pages/NewMessage";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

// Console log para debug
console.log("App component is being rendered");

const queryClient = new QueryClient();

// Initialize mock data immediately on module load
console.log("Initializing mock data immediately");
initializeLocalStorage();
console.log("Mock data initialized successfully");

const App = () => {
  const [isReady, setIsReady] = useState(false);
  
  // Ensure app is ready after a short delay
  useEffect(() => {
    console.log("App component mounted");
    
    try {
      // Reinitialize to ensure data is properly set
      initializeLocalStorage();
      
      // Small delay to ensure localStorage is fully ready
      const timer = setTimeout(() => {
        setIsReady(true);
        console.log("App is ready to render content");
      }, 200);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error during app initialization:", error);
      // Even if there's an error, attempt to show the UI
      setIsReady(true);
    }
  }, []);
  
  console.log("App component render function");
  
  if (!isReady) {
    console.log("App is not ready yet, rendering loading state");
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/new-book" element={<NewBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:id" element={<Conversation />} />
            <Route path="/messages/new/:recipientId" element={<NewMessage />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
