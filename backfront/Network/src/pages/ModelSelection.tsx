import { Brain, Network, Cpu, LineChart, Workflow, Binary } from "lucide-react";
import { ModelCard } from "../components/models/ModelCard";
import { colors } from "../utils/colors";
import AlgorithmSelector from "../components/models/AlgorithmSelector.jsx";

const models = [
  // {
  //   id: "ml",
  //   title: "Machine Learning",
  //   description: "Traditional ML algorithms for pattern recognition and anomaly detection",
  //   icon: Brain,
  // },
  // {
  //   id: "dl",
  //   title: "Deep Learning",
  //   description: "Neural networks for complex threat detection and analysis",
  //   icon: Network,
  // },
  // {
  //   id: "hybrid",
  //   title: "Hybrid Analysis",
  //   description: "Combined approach using multiple AI models for enhanced accuracy",
  //   icon: Workflow,
  // },
  // {
  //   id: "realtime",
  //   title: "Real-time Processing",
  //   description: "Stream processing for immediate threat detection",
  //   icon: Cpu,
  // },
  // {
  //   id: "predictive",
  //   title: "Predictive Analytics",
  //   description: "Future threat prediction and trend analysis",
  //   icon: LineChart,
  // },
  // {
  //   id: "quantum",
  //   title: "Quantum-Inspired",
  //   description: "Advanced algorithms inspired by quantum computing principles",
  //   icon: Binary,
  // },
];

interface ModelSelectionProps {
  onModelSelect: (modelId: string) => void;
}

export function ModelSelection({ onModelSelect }: ModelSelectionProps) {
  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.primary.main }}>
            Select Analysis Model
          </h1>
          <p className="text-xl text-gray-600">
            Choose the AI model that best suits your security monitoring needs
          </p>
        </div>

        {/* Existing AI Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              title={model.title}
              description={model.description}
              icon={model.icon}
              onClick={() => onModelSelect(model.id)}
            />
          ))}
        </div>

        {/* ✅ Algorithm Selector Without Title */}
        <div className="mt-12">
          <AlgorithmSelector />
        </div>
      </div>
    </div>
  );
}
