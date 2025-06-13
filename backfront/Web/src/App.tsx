import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { ModelSelection } from './pages/ModelSelection';
import { colors } from './utils/colors';

function App() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <Header showBack={!!selectedModel} onBack={() => setSelectedModel(null)} />
      <main>
        {selectedModel ? (
          <Dashboard initialModelId={selectedModel} onModelChange={setSelectedModel} />
        ) : (
          <ModelSelection onModelSelect={setSelectedModel} />
        )}
      </main>
    </div>
  );
}

export default App;