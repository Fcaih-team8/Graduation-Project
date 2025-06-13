import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const fetchModelMetrics = async (modelId: string) => {
  try {
    const { data } = await api.get(`/model/metrics/${modelId}`); 
    
    
    // Real data structure matching the screenshots - REPLACE WITH BACKEND DATA
    const realMetrics = {
      // Accuracy data from screenshot (Train and Validation Accuracy)
      accuracyData: [
        { epoch: 0, accuracy: 0.877, val_accuracy: 0.908 },
        { epoch: 1, accuracy: 0.895, val_accuracy: 0.910 },
        { epoch: 2, accuracy: 0.915, val_accuracy: 0.925 },
        { epoch: 3, accuracy: 0.925, val_accuracy: 0.935 },
        { epoch: 4, accuracy: 0.930, val_accuracy: 0.940 },
        { epoch: 5, accuracy: 0.932, val_accuracy: 0.942 },
        { epoch: 6, accuracy: 0.933, val_accuracy: 0.938 },
        { epoch: 7, accuracy: 0.934, val_accuracy: 0.939 },
        { epoch: 8, accuracy: 0.935, val_accuracy: 0.935 },
        { epoch: 9, accuracy: 0.936, val_accuracy: 0.933 },
        { epoch: 10, accuracy: 0.937, val_accuracy: 0.936 },
        { epoch: 11, accuracy: 0.938, val_accuracy: 0.938 },
        { epoch: 12, accuracy: 0.939, val_accuracy: 0.940 },
        { epoch: 13, accuracy: 0.940, val_accuracy: 0.941 },
        { epoch: 14, accuracy: 0.941, val_accuracy: 0.942 },
        { epoch: 15, accuracy: 0.942, val_accuracy: 0.943 },
        { epoch: 16, accuracy: 0.943, val_accuracy: 0.944 },
        { epoch: 17, accuracy: 0.944, val_accuracy: 0.945 },
        { epoch: 18, accuracy: 0.945, val_accuracy: 0.946 },
        { epoch: 19, accuracy: 0.938, val_accuracy: 0.944 },
        { epoch: 20, accuracy: 0.939, val_accuracy: 0.945 }
      ],
      
      // Loss data from screenshot (Train and Validation Loss)
      lossData: [
        { epoch: 0, loss: 0.295, val_loss: 0.195 },
        { epoch: 1, loss: 0.240, val_loss: 0.170 },
        { epoch: 2, loss: 0.200, val_loss: 0.165 },
        { epoch: 3, loss: 0.185, val_loss: 0.160 },
        { epoch: 4, loss: 0.175, val_loss: 0.155 },
        { epoch: 5, loss: 0.170, val_loss: 0.150 },
        { epoch: 6, loss: 0.168, val_loss: 0.148 },
        { epoch: 7, loss: 0.165, val_loss: 0.145 },
        { epoch: 8, loss: 0.162, val_loss: 0.143 },
        { epoch: 9, loss: 0.160, val_loss: 0.142 },
        { epoch: 10, loss: 0.158, val_loss: 0.141 },
        { epoch: 11, loss: 0.156, val_loss: 0.140 },
        { epoch: 12, loss: 0.155, val_loss: 0.139 },
        { epoch: 13, loss: 0.154, val_loss: 0.138 },
        { epoch: 14, loss: 0.153, val_loss: 0.137 },
        { epoch: 15, loss: 0.152, val_loss: 0.136 },
        { epoch: 16, loss: 0.151, val_loss: 0.135 },
        { epoch: 17, loss: 0.150, val_loss: 0.134 },
        { epoch: 18, loss: 0.149, val_loss: 0.133 },
        { epoch: 19, loss: 0.148, val_loss: 0.132 },
        { epoch: 20, loss: 0.147, val_loss: 0.131 }
      ],
      
      // Confusion Matrix from screenshot
      confusionMatrix: [
        [37502, 142, 103, 154, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 15040, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 6810, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 169, 27055, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [486, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 44063, 0, 0, 7545, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 5100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [332, 3121, 0, 4, 7838, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [341, 320, 0, 0, 0, 67622, 394, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 41, 562, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      
      labels: [
        'BENIGN', 'Bot', 'DDoS', 'DoS GoldenEye', 'DoS Hulk', 
        'DoS Slowhttptest', 'DoS slowloris', 'FTP-Patator', 
        'Heartbleed', 'Infiltration', 'PortScan', 'SSH-Patator',
        'Web Attack - Brute Force', 'Web Attack - Sql Injection', 'Web Attack - XSS'
      ],
      
      // Prediction Distribution with large numbers
      predictionDistribution: [
        { label: 'BENIGN', actual: 37502, predicted: 38061 },
        { label: 'Bot', actual: 0, predicted: 3756 },
        { label: 'DDoS', actual: 15040, predicted: 71166 },
        { label: 'DoS GoldenEye', actual: 6810, predicted: 199 },
        { label: 'DoS Hulk', actual: 27224, predicted: 35560 },
        { label: 'DoS Slowhttptest', actual: 486, predicted: 0 },
        { label: 'DoS slowloris', actual: 51608, predicted: 7939 },
        { label: 'FTP-Patator', actual: 5100, predicted: 5100 },
        { label: 'Heartbleed', actual: 11295, predicted: 11295 },
        { label: 'Infiltration', actual: 3100, predicted: 3100 },
        { label: 'PortScan', actual: 68677, predicted: 68677 },
        { label: 'SSH-Patator', actual: 607, predicted: 607 },
        { label: 'Web Attack - Brute Force', actual: 0, predicted: 0 },
        { label: 'Web Attack - Sql Injection', actual: 0, predicted: 0 },
        { label: 'Web Attack - XSS', actual: 0, predicted: 0 }
      ]
    };

    // BACKEND INTEGRATION POINT: Replace realMetrics with actual data from backend
    return data.error ? realMetrics : { ...realMetrics, ...data };
  } catch (error) {
    console.error('Error fetching model metrics:', error);
    
    // Return real data for development - REMOVE IN PRODUCTION
    return {
      accuracyData: [
        { epoch: 0, accuracy: 0.877, val_accuracy: 0.908 },
        { epoch: 1, accuracy: 0.895, val_accuracy: 0.910 },
        { epoch: 2, accuracy: 0.915, val_accuracy: 0.925 },
        { epoch: 3, accuracy: 0.925, val_accuracy: 0.935 },
        { epoch: 4, accuracy: 0.930, val_accuracy: 0.940 },
        { epoch: 5, accuracy: 0.932, val_accuracy: 0.942 },
        { epoch: 6, accuracy: 0.933, val_accuracy: 0.938 },
        { epoch: 7, accuracy: 0.934, val_accuracy: 0.939 },
        { epoch: 8, accuracy: 0.935, val_accuracy: 0.935 },
        { epoch: 9, accuracy: 0.936, val_accuracy: 0.933 },
        { epoch: 10, accuracy: 0.937, val_accuracy: 0.936 },
        { epoch: 11, accuracy: 0.938, val_accuracy: 0.938 },
        { epoch: 12, accuracy: 0.939, val_accuracy: 0.940 },
        { epoch: 13, accuracy: 0.940, val_accuracy: 0.941 },
        { epoch: 14, accuracy: 0.941, val_accuracy: 0.942 },
        { epoch: 15, accuracy: 0.942, val_accuracy: 0.943 },
        { epoch: 16, accuracy: 0.943, val_accuracy: 0.944 },
        { epoch: 17, accuracy: 0.944, val_accuracy: 0.945 },
        { epoch: 18, accuracy: 0.945, val_accuracy: 0.946 },
        { epoch: 19, accuracy: 0.938, val_accuracy: 0.944 },
        { epoch: 20, accuracy: 0.939, val_accuracy: 0.945 }
      ],
      lossData: [
        { epoch: 0, loss: 0.295, val_loss: 0.195 },
        { epoch: 1, loss: 0.240, val_loss: 0.170 },
        { epoch: 2, loss: 0.200, val_loss: 0.165 },
        { epoch: 3, loss: 0.185, val_loss: 0.160 },
        { epoch: 4, loss: 0.175, val_loss: 0.155 },
        { epoch: 5, loss: 0.170, val_loss: 0.150 },
        { epoch: 6, loss: 0.168, val_loss: 0.148 },
        { epoch: 7, loss: 0.165, val_loss: 0.145 },
        { epoch: 8, loss: 0.162, val_loss: 0.143 },
        { epoch: 9, loss: 0.160, val_loss: 0.142 },
        { epoch: 10, loss: 0.158, val_loss: 0.141 },
        { epoch: 11, loss: 0.156, val_loss: 0.140 },
        { epoch: 12, loss: 0.155, val_loss: 0.139 },
        { epoch: 13, loss: 0.154, val_loss: 0.138 },
        { epoch: 14, loss: 0.153, val_loss: 0.137 },
        { epoch: 15, loss: 0.152, val_loss: 0.136 },
        { epoch: 16, loss: 0.151, val_loss: 0.135 },
        { epoch: 17, loss: 0.150, val_loss: 0.134 },
        { epoch: 18, loss: 0.149, val_loss: 0.133 },
        { epoch: 19, loss: 0.148, val_loss: 0.132 },
        { epoch: 20, loss: 0.147, val_loss: 0.131 }
      ],
      confusionMatrix: [
        [37502, 142, 103, 154, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 15040, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 6810, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 169, 27055, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [486, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 44063, 0, 0, 7545, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 5100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [332, 3121, 0, 4, 7838, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [341, 320, 0, 0, 0, 67622, 394, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 41, 562, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      labels: [
        'BENIGN', 'Bot', 'DDoS', 'DoS GoldenEye', 'DoS Hulk', 
        'DoS Slowhttptest', 'DoS slowloris', 'FTP-Patator', 
        'Heartbleed', 'Infiltration', 'PortScan', 'SSH-Patator',
        'Web Attack - Brute Force', 'Web Attack - Sql Injection', 'Web Attack - XSS'
      ],
      predictionDistribution: [
        { label: 'BENIGN', actual: 37502, predicted: 38061 },
        { label: 'Bot', actual: 0, predicted: 3756 },
        { label: 'DDoS', actual: 15040, predicted: 71166 },
        { label: 'DoS GoldenEye', actual: 6810, predicted: 199 },
        { label: 'DoS Hulk', actual: 27224, predicted: 35560 },
        { label: 'DoS Slowhttptest', actual: 486, predicted: 0 },
        { label: 'DoS slowloris', actual: 51608, predicted: 7939 },
        { label: 'FTP-Patator', actual: 5100, predicted: 5100 },
        { label: 'Heartbleed', actual: 11295, predicted: 11295 },
        { label: 'Infiltration', actual: 3100, predicted: 3100 },
        { label: 'PortScan', actual: 68677, predicted: 68677 },
        { label: 'SSH-Patator', actual: 607, predicted: 607 },
        { label: 'Web Attack - Brute Force', actual: 0, predicted: 0 },
        { label: 'Web Attack - Sql Injection', actual: 0, predicted: 0 },
        { label: 'Web Attack - XSS', actual: 0, predicted: 0 }
      ]
    };
  }
};

export const fetchFeatureImportance = async (modelId: string) => {
  try {
    const { data } = await api.get(`/model/importance/${modelId}`);
    
    // Mock data for development - REPLACE WITH BACKEND DATA
    const mockImportance = {
      featureData: [
        { feature: 'Flow Duration', importance: 0.85 },
        { feature: 'Total Fwd Packets', importance: 0.78 },
        { feature: 'Total Backward Packets', importance: 0.72 },
        { feature: 'Flow Bytes/s', importance: 0.68 },
        { feature: 'Flow Packets/s', importance: 0.65 },
        { feature: 'Fwd Packet Length Max', importance: 0.62 },
        { feature: 'Bwd Packet Length Max', importance: 0.58 },
        { feature: 'Flow IAT Mean', importance: 0.55 },
        { feature: 'Fwd IAT Total', importance: 0.52 },
        { feature: 'Bwd IAT Total', importance: 0.48 }
      ]
    };

    // BACKEND INTEGRATION POINT: Replace mockImportance with actual data from backend
    return data.error ? mockImportance : { ...mockImportance, ...data };
  } catch (error) {
    console.error('Error fetching feature importance:', error);
    
    // Return mock data for development - REMOVE IN PRODUCTION
    return {
      featureData: [
        { feature: 'Flow Duration', importance: 0.85 },
        { feature: 'Total Fwd Packets', importance: 0.78 },
        { feature: 'Total Backward Packets', importance: 0.72 },
        { feature: 'Flow Bytes/s', importance: 0.68 },
        { feature: 'Flow Packets/s', importance: 0.65 },
        { feature: 'Fwd Packet Length Max', importance: 0.62 },
        { feature: 'Bwd Packet Length Max', importance: 0.58 },
        { feature: 'Flow IAT Mean', importance: 0.55 },
        { feature: 'Fwd IAT Total', importance: 0.52 },
        { feature: 'Bwd IAT Total', importance: 0.48 }
      ]
    };
  }
};

// REAL-TIME API ENDPOINTS FOR BACKEND INTEGRATION
export const fetchRealTimeMetrics = async (modelId: string) => {
  try {
    const { data } = await api.get(`/model/realtime/${modelId}`);
    return data;
  } catch (error) {
    console.error('Error fetching real-time metrics:', error);
    throw error;
  }
};

export const subscribeToModelUpdates = (modelId: string, callback: (data: any) => void) => {
  // WebSocket connection for real-time updates
  // BACKEND INTEGRATION POINT: Implement WebSocket connection
  const ws = new WebSocket(`ws://localhost:3000/ws/model/${modelId}`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback(data);
  };
  
  return () => ws.close();
};