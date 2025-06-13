import { RandomForestModel } from './RandomForestModel';

interface ModelMetadata {
  featureColumns: string[];
  labelEncoder: Record<string, number>;
  scaler: {
    mean: number[];
    std: number[];
  };
}

export class ModelService {
  private models: Map<string, RandomForestModel>;
  private readonly availableModels = ['random_forest', 'dl'];

  constructor() {
    this.models = new Map();
  }

  async loadModel(modelId: string): Promise<boolean> {
    try {
      if (!this.availableModels.includes(modelId)) {
        console.error(`Model ${modelId} is not available`);
        return false;
      }

      console.log(`Loading model: ${modelId}`);
      const model = new RandomForestModel();
      
      // Load metadata first
      const metadataResponse = await fetch(`/models/${modelId}/metadata.json`);
      if (!metadataResponse.ok) {
        console.error(`Metadata fetch failed: ${metadataResponse.status}`);
        throw new Error(`Failed to load metadata (Status: ${metadataResponse.status})`);
      }
      
      const metadata = await metadataResponse.json() as ModelMetadata;
      console.log(`Metadata loaded for ${modelId}:`, metadata);
      
      // Initialize model with metadata
      model.setFeatureColumns(metadata.featureColumns);
      model.setLabelEncoder(new Map(Object.entries(metadata.labelEncoder)));
      model.setScaler(metadata.scaler.mean, metadata.scaler.std);
      
      // Load model weights
      const modelPath = `/models/${modelId}/model.json`;
      console.log(`Loading model weights from: ${modelPath}`);
      const success = await model.loadModel(modelPath);
      
      if (!success) {
        throw new Error('Failed to load model weights');
      }
      
      this.models.set(modelId, model);
      console.log(`Model ${modelId} loaded successfully`);
      return true;
    } catch (error) {
      console.error(`Error loading model ${modelId}:`, error);
      throw error;
    }
  }

  async analyzeTraffic(modelId: string, trafficData: Record<string, number>) {
    const model = this.models.get(modelId);
    if (!model) {
      throw new Error(`Model ${modelId} not loaded`);
    }

    try {
      return await model.predict(trafficData);
    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    }
  }
}