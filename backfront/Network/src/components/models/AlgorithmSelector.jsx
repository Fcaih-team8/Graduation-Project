// import { useState } from "react";
// import axios from "axios";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// export default function AlgorithmSelector() {
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [chartData, setChartData] = useState([]);

//   const algorithms = [
//     { name: "Logistic Regression", endpoint: "logistic_regression" },
//     { name: "MLP", endpoint: "mlp" },
//     { name: "XGBoost", endpoint: "xgboost" },
//     { name: "Dataset Analysis", endpoint: "dataset_analysis" },
//   ];

//   const runAlgorithm = async (endpoint, name) => {
//     setLoading(true);
//     setResult("");
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/run/${endpoint}`);
//       const output = response.data.output || "No output received from backend.";
//       setResult(output);

//       // Extract accuracy percentage from the output
//       const accuracyMatch = output.match(/Accuracy:\s*(\d+\.\d+)%/);
//       const accuracy = accuracyMatch ? parseFloat(accuracyMatch[1]) : 0;

//       // Update chart data dynamically
//       setChartData((prevData) => [...prevData, { algorithm: name, accuracy }]);
//     } catch (error) {
//       setResult("Failed to fetch results.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <h1 className="text-xl font-bold">Select an Algorithm</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {algorithms.map((algo) => (
//           <button
//             key={algo.endpoint}
//             onClick={() => runAlgorithm(algo.endpoint, algo.name)}
//             className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
//           >
//             {algo.name}
//           </button>
//         ))}
//       </div>

//       {loading && <p>Loading...</p>}
//       {result && <pre className="bg-gray-100 p-3">{result}</pre>}

//       {/* Dynamic Graph */}
//       {chartData.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold text-center mb-4">Algorithm Accuracy Comparison</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="algorithm" />
//               <YAxis domain={[0, 100]} />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="accuracy" stroke="#8884d8" activeDot={{ r: 8 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar
// } from "recharts";

// export default function AlgorithmSelector() {
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [chartData, setChartData] = useState([]);
//   const [finalMetrics, setFinalMetrics] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);

//   const algorithms = [
//     { name: "Logistic Regression", endpoint: "logistic_regression" },
//     { name: "MLP", endpoint: "mlp" },
//     { name: "XGBoost", endpoint: "xgboost" },
//     { name: "Dataset Analysis", endpoint: "dataset_analysis" },
//   ];

//   const runAlgorithm = async (endpoint, name) => {
//     setLoading(true);
//     setResult("");
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/run/${endpoint}`);
//       const data = response.data;
//       setResult(data.output || "No output received.");

//       if (endpoint === "dataset_analysis") {
//         setCategoryData(
//           Object.entries(data.category_distribution).map(([category, count]) => ({
//             category,
//             count
//           }))
//         );
//         return;
//       }

//       // Extract accuracy and classification metrics
//       const { accuracy, precision, recall, f1 } = data;

//       setChartData((prevData) => [...prevData, { algorithm: name, accuracy }]);

//       setFinalMetrics((prevMetrics) => [
//         ...prevMetrics,
//         { algorithm: name, precision, recall, f1 }
//       ]);
//     } catch (error) {
//       setResult("Failed to fetch results.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <h1 className="text-xl font-bold">Select an Algorithm</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {algorithms.map((algo) => (
//           <button
//             key={algo.endpoint}
//             onClick={() => runAlgorithm(algo.endpoint, algo.name)}
//             className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
//           >
//             {algo.name}
//           </button>
//         ))}
//       </div>

//       {loading && <p>Loading...</p>}
//       {result && <pre className="bg-gray-100 p-3">{result}</pre>}

//       {/* Accuracy Comparison Graph */}
//       {chartData.length > 0 && (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="algorithm" />
//             <YAxis domain={[0, 100]} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       )}

//       {/* Classification Metrics Graph */}
//       {finalMetrics.length > 0 && (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={finalMetrics}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="algorithm" />
//             <YAxis domain={[0, 1]} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="precision" fill="#82ca9d" />
//             <Bar dataKey="recall" fill="#8884d8" />
//             <Bar dataKey="f1" fill="#ffc658" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}

//       {/* Dataset Analysis Graph */}
//       {categoryData.length > 0 && (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={categoryData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="category" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#ff7300" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar
// } from "recharts";

// export default function AlgorithmSelector() {
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [chartData, setChartData] = useState([]);
//   const [finalMetrics, setFinalMetrics] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [selectedAlgorithm, setSelectedAlgorithm] = useState(null); // Track the selected algorithm

//   const algorithms = [
//     { name: "Logistic Regression", endpoint: "logistic_regression" },
//     { name: "MLP", endpoint: "mlp" },
//     { name: "XGBoost", endpoint: "xgboost" },
//     { name: "Dataset Analysis", endpoint: "dataset_analysis" },
//   ];

//   const runAlgorithm = async (endpoint, name) => {
//     setLoading(true);
//     setResult("");
//     setSelectedAlgorithm(name); // Set the selected algorithm
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/run/${endpoint}`);
//       const data = response.data;
//       setResult(data.output || "No output received.");

//       if (endpoint === "dataset_analysis") {
//         setCategoryData(
//           Object.entries(data.category_distribution).map(([category, count]) => ({
//             category,
//             count
//           }))
//         );
//         return;
//       }

//       // Reset category data if another algorithm is chosen
//       setCategoryData([]);

//       // Extract accuracy and classification metrics
//       const { accuracy, precision, recall, f1 } = data;

//       setChartData([{ algorithm: name, accuracy }]); // Reset to show only selected algorithm

//       setFinalMetrics([{ algorithm: name, precision, recall, f1 }]); // Reset metrics to show only selected algorithm
//     } catch (error) {
//       setResult("Failed to fetch results.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <h1 className="text-xl font-bold">Select an Algorithm</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {algorithms.map((algo) => (
//           <button
//             key={algo.endpoint}
//             onClick={() => runAlgorithm(algo.endpoint, algo.name)}
//             className={`p-3 rounded-lg ${
//               selectedAlgorithm === algo.name ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-700"
//             }`}
//           >
//             {algo.name}
//           </button>
//         ))}
//       </div>

//       {loading && <p>Loading...</p>}
//       {result && <pre className="bg-gray-100 p-3">{result}</pre>}

//       {/* Accuracy Comparison Graph */}
//       {chartData.length > 0 && selectedAlgorithm !== "Dataset Analysis" && (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="algorithm" />
//             <YAxis domain={[0, 100]} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       )}

//       {/* Classification Metrics Graph */}
//       {finalMetrics.length > 0 && selectedAlgorithm !== "Dataset Analysis" && (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={finalMetrics}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="algorithm" />
//             <YAxis domain={[0, 1]} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="precision" fill="#82ca9d" />
//             <Bar dataKey="recall" fill="#8884d8" />
//             <Bar dataKey="f1" fill="#ffc658" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}

//       {/* Dataset Analysis Graph (Only Show When Selected) */}
//       {categoryData.length > 0 && selectedAlgorithm === "Dataset Analysis" && (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={categoryData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="category" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#ff7300" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }



// import { useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar
// } from "recharts";

// export default function AlgorithmSelector() {
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [chartData, setChartData] = useState([]); // Stores selected algorithm's accuracy
//   const [finalMetrics, setFinalMetrics] = useState([]); // Stores precision, recall, f1-score
//   const [categoryData, setCategoryData] = useState([]); // Stores dataset analysis
//   const [selectedAlgorithm, setSelectedAlgorithm] = useState(null); // Track the selected algorithm
//   const [allAlgorithmResults, setAllAlgorithmResults] = useState([]); // Stores accuracy of all algorithms

//   const algorithms = [
//     { name: "Logistic Regression", endpoint: "logistic_regression" },
//     { name: "MLP", endpoint: "mlp" },
//     { name: "XGBoost", endpoint: "xgboost" },
//     { name: "Dataset Analysis", endpoint: "dataset_analysis" },
//   ];

//   const runAlgorithm = async (endpoint, name) => {
//     setLoading(true);
//     setResult("");
//     setSelectedAlgorithm(name); // Set the selected algorithm
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/run/${endpoint}`);
//       const data = response.data;
//       setResult(data.output || "No output received.");

//       if (endpoint === "dataset_analysis") {
//         setCategoryData(
//           Object.entries(data.category_distribution).map(([category, count]) => ({
//             category,
//             count
//           }))
//         );
//         return;
//       }

//       // Reset category data if another algorithm is chosen
//       setCategoryData([]);

//       // Extract accuracy and classification metrics
//       const { accuracy, precision, recall, f1 } = data;

//       // ✅ Show only the selected algorithm's accuracy
//       setChartData([{ algorithm: name, accuracy }]);

//       // ✅ Show only the selected algorithm's precision, recall, f1-score
//       setFinalMetrics([{ algorithm: name, precision, recall, f1 }]);

//       // ✅ Store accuracy results for all algorithms (For the bottom graph)
//       setAllAlgorithmResults((prevResults) => {
//         const updatedResults = prevResults.filter((item) => item.algorithm !== name);
//         return [...updatedResults, { algorithm: name, accuracy }];
//       });

//     } catch (error) {
//       setResult("Failed to fetch results.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <h1 className="text-xl font-bold">Select an Algorithm</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {algorithms.map((algo) => (
//           <button
//             key={algo.endpoint}
//             onClick={() => runAlgorithm(algo.endpoint, algo.name)}
//             className={`p-3 rounded-lg ${
//               selectedAlgorithm === algo.name ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-700"
//             }`}
//           >
//             {algo.name}
//           </button>
//         ))}
//       </div>

//       {loading && <p>Loading...</p>}
//       {result && <pre className="bg-gray-100 p-3">{result}</pre>}

//       {/* Accuracy Comparison Graph (For Selected Algorithm) */}
//       {chartData.length > 0 && selectedAlgorithm !== "Dataset Analysis" && (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="algorithm" />
//             <YAxis domain={[0, 100]} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       )}

//       {/* Classification Metrics Graph */}
//       {finalMetrics.length > 0 && selectedAlgorithm !== "Dataset Analysis" && (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={finalMetrics}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="algorithm" />
//             <YAxis domain={[0, 1]} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="precision" fill="#82ca9d" />
//             <Bar dataKey="recall" fill="#8884d8" />
//             <Bar dataKey="f1" fill="#ffc658" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}

//       {/* Dataset Analysis Graph (Only Show When Selected) */}
//       {categoryData.length > 0 && selectedAlgorithm === "Dataset Analysis" && (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={categoryData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="category" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#ff7300" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}

//       {/* ✅ The First Graph Comparing All Algorithm Accuracies */}
//       {allAlgorithmResults.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-lg font-bold">Accuracy Comparison of All Algorithms</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={allAlgorithmResults}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="algorithm" />
//               <YAxis domain={[0, 100]} />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="accuracy" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function AlgorithmSelector() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [finalMetrics, setFinalMetrics] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [allAlgorithmResults, setAllAlgorithmResults] = useState([]);

  const algorithms = [
    { name: "Quick Scan", endpoint: "logistic_regression" },
    { name: "Smart Predictor", endpoint: "mlp" },
    { name: "Extreme Defender", endpoint: "xgboost" },
    { name: "Insight Scan", endpoint: "dataset_analysis" },
  ];

  const runAlgorithm = async (endpoint, name) => {
    setLoading(true);
    setResult("");
    setSelectedAlgorithm(name);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/run/${endpoint}`);
      const data = response.data;
      setResult(data.output || "No output received.");

      if (endpoint === "dataset_analysis") {
        setCategoryData(
          Object.entries(data.category_distribution).map(([category, count]) => ({
            category,
            count
          }))
        );
        return;
      }

      setCategoryData([]);

      const { accuracy, precision, recall, f1 } = data;

      setChartData([{ algorithm: name, accuracy }]);

      setFinalMetrics([{ algorithm: name, precision, recall, f1 }]);

      setAllAlgorithmResults((prevResults) => {
        const updatedResults = prevResults.filter((item) => item.algorithm !== name);
        return [...updatedResults, { algorithm: name, accuracy }];
      });

    } catch (error) {
      setResult("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!selectedAlgorithm || !result) return;

    const reportContent = `Classification Report for ${selectedAlgorithm}:\n\n${result}`;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedAlgorithm}_Report.txt`;
    link.click();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Select a Model</h1>
      <div className="grid grid-cols-2 gap-4">
        {algorithms.map((algo) => (
          <button
            key={algo.endpoint}
            onClick={() => runAlgorithm(algo.endpoint, algo.name)}
            className={`p-3 rounded-lg ${
              selectedAlgorithm === algo.name ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            {algo.name}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {result && <pre className="bg-gray-100 p-3">{result}</pre>}

      {/* Download Report Button (Only Appears When an Algorithm is Selected) */}
      {selectedAlgorithm && result && (
        <button
          onClick={downloadReport}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download Classification Report
        </button>
      )}

      {/* Accuracy Comparison Graph (For Selected Algorithm) */}
      {chartData.length > 0 && selectedAlgorithm !== "Insight Scan" && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="algorithm" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
            <Bar dataKey="accuracy" fill="#8884d8" barSize={30} />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Classification Metrics Graph */}
      {finalMetrics.length > 0 && selectedAlgorithm !== "Insight Scan" && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={finalMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="algorithm" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="precision" fill="#82ca9d" barSize={40} />
            <Bar dataKey="recall" fill="#8884d8" barSize={40} />
            <Bar dataKey="f1" fill="#ffc658" barSize={40} />
            {/* <Bar dataKey="accuracy" fill="#8884d8" barSize={30} /> */}
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Dataset Analysis Graph (Only Show When Selected) */}
      {categoryData.length > 0 && selectedAlgorithm === "Insight Scan" && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="count" fill="#ff7300" /> */}
            <Bar dataKey="count" fill="#ff7300" barSize={30} />

          </BarChart>
        </ResponsiveContainer>
      )}

      {/* ✅ The First Graph Comparing All Algorithm Accuracies */}
      {allAlgorithmResults.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold">Accuracy Comparison of All Algorithms</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={allAlgorithmResults}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="algorithm" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#8884d8" barSize={40}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

