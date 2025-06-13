import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

export class RandomForestModel {
  private model: tf.LayersModel | null = null;
  private featureColumns: string[] = [];
  private labelEncoder: Map<string, number> = new Map();
  private scaler: {
    mean: number[];
    std: number[];
  } = { mean: [], std: [] };

  constructor() {
    this.initializeBackend();
  }

  private async initializeBackend() {
    try {
      if (tf.getBackend() !== 'webgl') {
        await tf.setBackend('webgl');
      }
      await tf.ready();
      console.log('TensorFlow.js backend initialized:', tf.getBackend());
    } catch (error) {
      console.error('Failed to initialize WebGL backend:', error);
      throw error;
    }
  }

  async loadModel(modelPath: string): Promise<boolean> {
    try {
      console.log('Loading model from path:', modelPath);
      await this.initializeBackend();
      
      // Ensure model is properly disposed before loading a new one
      if (this.model) {
        this.model.dispose();
        this.model = null;
      }

      // Load the model with strict mode disabled to handle potential shape mismatches
      this.model = await tf.loadLayersModel(modelPath, { 
        strict: false,
        weightUrlConverter: (url) => {
          // Ensure we're using the correct path for weight files
          if (url.endsWith('.bin')) {
            return `${modelPath.replace('model.json', url)}`;
          }
          return url;
        }
      });
      
      console.log('Model loaded successfully');
      
      // Warm up the model with a dummy prediction
      const dummyInput = tf.zeros([1, this.featureColumns.length]);
      this.model.predict(dummyInput);
      dummyInput.dispose();

      return true;
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }

  async preprocessFeatures(data: Record<string, number>): Promise<tf.Tensor2D> {
    const features = this.featureColumns.map(col => data[col] || 0);
    const normalized = this.normalizeFeatures(features);
    return tf.tensor2d([normalized]);
  }

  private normalizeFeatures(features: number[]): number[] {
    return features.map((value, index) => 
      (value - this.scaler.mean[index]) / (this.scaler.std[index] || 1)
    );
  }

  async predict(data: Record<string, number>): Promise<{
    category: string;
    probability: number;
    severity: 'low' | 'medium' | 'high';
  }[]> {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    try {
      const preprocessed = await this.preprocessFeatures(data);
      const prediction = this.model.predict(preprocessed) as tf.Tensor;
      const probabilities = await prediction.array();
      
      // Cleanup tensors
      preprocessed.dispose();
      prediction.dispose();

      return this.decodePredictions(probabilities[0]);
    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  }

  private decodePredictions(probabilities: number[]): {
    category: string;
    probability: number;
    severity: 'low' | 'medium' | 'high';
  }[] {
    const results = [];
    for (const [label, index] of this.labelEncoder.entries()) {
      results.push({
        category: label,
        probability: probabilities[index],
        severity: this.getSeverity(probabilities[index])
      });
    }
    return results.sort((a, b) => b.probability - a.probability);
  }

  private getSeverity(probability: number): 'low' | 'medium' | 'high' {
    if (probability < 0.3) return 'low';
    if (probability < 0.7) return 'medium';
    return 'high';
  }

  setFeatureColumns(columns: string[]) {
    this.featureColumns = columns;
  }

  setLabelEncoder(encoder: Map<string, number>) {
    this.labelEncoder = encoder;
  }

  setScaler(mean: number[], std: number[]) {
    this.scaler = { mean, std };
  }
}