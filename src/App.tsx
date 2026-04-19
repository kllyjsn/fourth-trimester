import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Welcome } from "./pages/Welcome";
import { Today } from "./pages/Today";
import { Session } from "./pages/Session";
import { ExerciseDetail } from "./pages/ExerciseDetail";
import { Library } from "./pages/Library";
import { ProgressPage } from "./pages/Progress";
import { Settings } from "./pages/Settings";
import { DiastasisCheck } from "./pages/DiastasisCheck";
import { HopTest } from "./pages/HopTest";
import { useProgress } from "./store/progress";

function RequireOnboarded({ children }: { children: React.ReactNode }) {
  const onboarded = useProgress((s) => s.onboarded);
  if (!onboarded) return <Navigate to="/welcome" replace />;
  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route
          element={
            <RequireOnboarded>
              <Layout />
            </RequireOnboarded>
          }
        >
          <Route index element={<Today />} />
          <Route path="session" element={<Session />} />
          <Route path="session/:dayIndex" element={<Session />} />
          <Route path="library" element={<Library />} />
          <Route path="library/:exerciseId" element={<ExerciseDetail />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="diastasis-check" element={<DiastasisCheck />} />
          <Route path="hop-test" element={<HopTest />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
