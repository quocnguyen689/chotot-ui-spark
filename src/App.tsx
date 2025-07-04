
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PostCategory from "./pages/PostCategory";
import PostForm from "./pages/PostForm";
import AIQuickPost from "./pages/AIQuickPost";
import ExchangeZone from "./pages/ExchangeZone";
import ExchangeDiscover from "./pages/ExchangeDiscover";
import ExchangeItemDetail from "./pages/ExchangeItemDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/post/category" element={<PostCategory />} />
          <Route path="/post/form" element={<PostForm />} />
          <Route path="/post/ai-quick" element={<AIQuickPost />} />
          <Route path="/exchange" element={<ExchangeZone />} />
          <Route path="/exchange/:groupId/discover" element={<ExchangeDiscover />} />
          <Route path="/exchange/:groupId/item/:itemId" element={<ExchangeItemDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
