import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import LiveMap from "./pages/LiveMap/LiveMap";
import Issues from "./pages/Issues/Issues";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AuthRequired from "./pages/AuthRequired/AuthRequired";
import Report from "./pages/Report/Report";
import IssueDetails
from "./pages/IssueDetails/IssueDetails";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Chatbot from "./components/AIChatbot/Chatbot"
import Profile from "./pages/Profile/Profile";

// Home Components
import Hero from "./components/Hero/Hero";
import Ticker from "./components/Ticker/Ticker";
import HowItWorks from "./components/HowItWorks/HowItWorks";

import ReportForm from "./components/ReportForm/ReportForm";
import Footer from "./components/Footer/Footer";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Donate from "./pages/Donate/Donate";



function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <HowItWorks />
      <ReportForm />
     
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
   
    <Navbar />
  

      <Routes>
       
        <Route path="/" element={<Home />} />

        
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/issues" element={ <ProtectedRoute><Issues /></ProtectedRoute>} />
        <Route path="/report" element={  <ProtectedRoute><Report /></ProtectedRoute>}
/>
<Route
  path="/issues/:id"
  element={<IssueDetails />}
/>
<Route
  path="/issues/edit/:id"
  element={<ReportForm />}
/>
<Route
  path="/admin"
  element={<AdminDashboard />}
/>
<Route
  path="/login-required"
  element={<AuthRequired />}
/>
<Route path="/donate" element={<Donate />} />
<Route
  path="/verify-email/:token"
  element={<VerifyEmail />}
/>
<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
      </Routes>
         <Footer />
       <Chatbot />
     
    </BrowserRouter>
  );
}

export default App;