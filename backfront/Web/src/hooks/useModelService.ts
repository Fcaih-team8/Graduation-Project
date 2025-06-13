import { useEffect, useState } from 'react';
import { ModelService } from '../lib/ml/ModelService';

const modelService = new ModelService();

export function useModelService(modelId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadModel() {
      try {
        setIsLoading(true);
        setError(null);
        const success = await modelService.loadModel(modelId);
        if (!success && mounted) {
          setError(`Failed to load model ${modelId}. Please ensure model files exist in the correct location.`);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error loading model');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadModel();

    return () => {
      mounted = false;
    };
  }, [modelId]);

  const analyzeTraffic = async (trafficData: any) => {
    try {
      return await modelService.analyzeTraffic(modelId, trafficData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      return null;
    }
  };

  return { isLoading, error, analyzeTraffic };
}