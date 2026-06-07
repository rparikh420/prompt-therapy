import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import IntakeForm from "./pages/IntakeForm";
import RecoveryStep from "./pages/RecoveryStep";
import TherapyPage from "./pages/TherapyPage";
import GraduationPage from "./pages/GraduationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/intake" element={<IntakeForm />} />
          <Route path="/step/:step" element={<RecoveryStep />} />
          <Route path="/therapy" element={<TherapyPage />} />
          <Route path="/graduation" element={<GraduationPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
