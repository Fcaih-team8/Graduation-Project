import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
import os

class DataProcessor:
    def __init__(self, sample_path='data/sample_1000.csv'):
        self.sample_path = sample_path
        self.data = None
        self.features = None
        self.labels = None
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        
    def load_sample_data(self):
        """Load and process sample data"""
        try:
            if os.path.exists(self.sample_path):
                self.data = pd.read_csv(self.sample_path)
                print(f"Loaded sample data: {self.data.shape}")
                print(f"Columns: {list(self.data.columns)}")
                
                # Check for label column
                label_col = None
                for col in ['Label', 'label', 'target', 'class']:
                    if col in self.data.columns:
                        label_col = col
                        break
                
                if label_col:
                    self.labels = self.data[label_col]
                    self.features = self.data.drop(columns=[label_col])
                    print(f"Found {len(self.labels.unique())} unique labels: {self.labels.unique()}")
                else:
                    print("No label column found")
                    self.features = self.data
                
                return True
            else:
                print(f"Sample data file not found: {self.sample_path}")
                return False
                
        except Exception as e:
            print(f"Error loading sample data: {e}")
            return False
    
    def get_feature_stats(self):
        """Get statistics about features"""
        if self.features is not None:
            return {
                'n_features': len(self.features.columns),
                'feature_names': list(self.features.columns),
                'n_samples': len(self.features),
                'missing_values': self.features.isnull().sum().to_dict(),
                'data_types': self.features.dtypes.to_dict()
            }
        return None
    
    def get_label_distribution(self):
        """Get distribution of labels"""
        if self.labels is not None:
            return self.labels.value_counts().to_dict()
        return None
    
    def prepare_for_training(self, test_size=0.2):
        """Prepare data for model training"""
        if self.features is None or self.labels is None:
            return None
        
        # Handle missing values
        self.features = self.features.fillna(self.features.median())
        
        # Scale features
        X_scaled = self.scaler.fit_transform(self.features)
        
        # Encode labels
        y_encoded = self.label_encoder.fit_transform(self.labels)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y_encoded, test_size=test_size, random_state=42, stratify=y_encoded
        )
        
        return {
            'X_train': X_train,
            'X_test': X_test,
            'y_train': y_train,
            'y_test': y_test,
            'feature_names': list(self.features.columns),
            'label_names': list(self.label_encoder.classes_)
        }

# Test the data processor
if __name__ == "__main__":
    processor = DataProcessor()
    if processor.load_sample_data():
        print("\nFeature Statistics:")
        stats = processor.get_feature_stats()
        if stats:
            print(f"Number of features: {stats['n_features']}")
            print(f"Number of samples: {stats['n_samples']}")
            print(f"Feature names: {stats['feature_names'][:10]}...")  # First 10 features
        
        print("\nLabel Distribution:")
        label_dist = processor.get_label_distribution()
        if label_dist:
            for label, count in label_dist.items():
                print(f"{label}: {count}")