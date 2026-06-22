// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from "./components/Navbar/Navbar";
// import Hero from './components/Hero/Hero';
// import Ticker from './components/Ticker/Ticker';
// import ProblemTypes from './components/ProblemTypes/ProblemTypes';
// import HowItWorks from './components/HowItWorks/HowItWorks';
// import ReportForm from './components/ReportForm/ReportForm';
// import Stats from './components/Stats/Stats';
// import Footer from './components/Footer/Footer';
// import LiveMap from './pages/LiveMap/LiveMap';

// function Home() {
//   return (
//     <>
//       <Hero />
//       <Ticker />
//       <ProblemTypes />
//       <HowItWorks />
//       <ReportForm />
//       <Stats />
//       <Footer />
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/map" element={<LiveMap />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import LiveMap from "./pages/LiveMap/LiveMap";
import MyIssues from "./pages/MyIssues/MyIssues";

// Home Components
import Hero from "./components/Hero/Hero";
import Ticker from "./components/Ticker/Ticker";
import ProblemTypes from "./components/ProblemTypes/ProblemTypes";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import ReportForm from "./components/ReportForm/ReportForm";
import Stats from "./components/Stats/Stats";
import Footer from "./components/Footer/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <ProblemTypes />
      <HowItWorks />
      <ReportForm />
      <Stats />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Other Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/myissues" element={<MyIssues />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;