/* ALTER AI — App.tsx
 * Design: Ink & Signal — Editorial Dark Tech
 * All routes defined here; AppLayout wraps all authenticated pages
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import BotBuilder from "./pages/BotBuilder";
import BotLogic from "./pages/BotLogic";
import BotVoice from "./pages/BotVoice";
import Templates from "./pages/Templates";
import BotExport from "./pages/BotExport";
import Subscription from "./pages/Subscription";
import Revenue from "./pages/Revenue";
import Affiliate from "./pages/Affiliate";
import MediaUpload from "./pages/MediaUpload";
import Landing from "./pages/Landing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard">
        <AppLayout><Dashboard /></AppLayout>
      </Route>
      <Route path="/bots">
        <AppLayout><BotBuilder /></AppLayout>
      </Route>
      <Route path="/bots/logic">
        <AppLayout><BotLogic /></AppLayout>
      </Route>
      <Route path="/bots/voice">
        <AppLayout><BotVoice /></AppLayout>
      </Route>
      <Route path="/templates">
        <AppLayout><Templates /></AppLayout>
      </Route>
      <Route path="/export">
        <AppLayout><BotExport /></AppLayout>
      </Route>
      <Route path="/subscription">
        <AppLayout><Subscription /></AppLayout>
      </Route>
      <Route path="/revenue">
        <AppLayout><Revenue /></AppLayout>
      </Route>
      <Route path="/affiliate">
        <AppLayout><Affiliate /></AppLayout>
      </Route>
      <Route path="/media">
        <AppLayout><MediaUpload /></AppLayout>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
