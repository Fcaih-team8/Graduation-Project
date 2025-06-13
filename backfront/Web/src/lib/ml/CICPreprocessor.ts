import * as tf from '@tensorflow/tfjs';

export class CICPreprocessor {

  constructor() {
  }

  async preprocessData(data: any[]) {
    const tensor = tf.tensor2d(data);
    const normalized = this.normalize(tensor);
    const features = await this.selectFeatures(normalized);
    return features;
  }

  private normalize(tensor: tf.Tensor2D): tf.Tensor2D {
    const mean = tensor.mean(0);
    const std = tensor.sub(mean).square().mean(0).sqrt();
    return tensor.sub(mean).div(std) as tf.Tensor2D;
  }

  private async selectFeatures(tensor: tf.Tensor2D) {
    // Implement feature selection logic here
    // This is a simplified version
    return tensor;
  }

  async predict(model: tf.LayersModel, data: any[]) {
    const preprocessed = await this.preprocessData(data);
    const prediction = model.predict(preprocessed) as tf.Tensor;
    return prediction.arraySync();
  }
}