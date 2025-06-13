"""
Script to train models and save them in the correct format for the backend
"""
import pandas as pd
import numpy as np
import os
import sys
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE
import xgboost as xgb
import joblib
from collections import Counter

class ModelTrainer:
    def __init__(self, data_path=None):
        print(" STEP 1: inside __init__")

        if data_path is None:
            base_dir = os.path.dirname(__file__)
            print(" STEP 2: base_dir =", base_dir)
            self.data_path = os.path.join(base_dir, "data", "sample_1000.csv")
        else:
            self.data_path = data_path
        print(" STEP 3: data_path =", self.data_path)

        self.data = None
        self.X = None
        self.y = None
        print(" STEP 4: Before scaler...")

        self.scaler = StandardScaler()
        print(" STEP 5: scaler created")

        self.label_encoder = LabelEncoder()
        print(" STEP 6: label_encoder created")

        self.imputer = SimpleImputer(strategy='median')
        print(" STEP 7: imputer created")  

        
        
    def load_and_preprocess_data(self):
        """Load and preprocess the data"""
        try:
            print("Loading data...")
            self.data = pd.read_csv(self.data_path)
            print(f"Data shape: {self.data.shape}")

            self.data.columns = self.data.columns.str.strip()

            
            # Find label column
            label_col = None
            for col in ['Label', 'label', 'target', 'class']:
                if col in self.data.columns:
                    label_col = col
                    break
            
            if label_col is None:
                raise ValueError("No label column found")
            
            # Separate features and labels
            self.X = self.data.drop(columns=[label_col])
            self.y = self.data[label_col]
            
            print(f"Features: {self.X.shape[1]}")
            print(f"Labels: {len(self.y.unique())} unique classes")
            print(f"Label distribution: {Counter(self.y)}")
            
            # Handle missing values
            print("Handling missing values...")
            self.X = pd.DataFrame(
                self.imputer.fit_transform(self.X),
                columns=self.X.columns
            )
            
            # Encode labels
            print("Encoding labels...")
            self.y = self.label_encoder.fit_transform(self.y)
            
            # Scale features
            print("Scaling features...")
            self.X = pd.DataFrame(
                self.scaler.fit_transform(self.X),
                columns=self.X.columns
            )
            
            return True
            
        except Exception as e:
            print(f"Error in data preprocessing: {e}")
            return False
    
    def train_xgboost(self):
        """Train XGBoost model"""
        try:
            print("\nTraining XGBoost model...")
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                self.X, self.y, test_size=0.2, random_state=42, stratify=self.y
            )
            
            # Handle class imbalance with SMOTE
            print("Applying SMOTE for class balancing...")
            smote = SMOTE(random_state=42)
            X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)
            
            # Train XGBoost
            xgb_model = xgb.XGBClassifier(
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1,
                random_state=42,
                eval_metric='mlogloss'
            )
            
            xgb_model.fit(X_train_balanced, y_train_balanced)
            
            # Test accuracy
            train_score = xgb_model.score(X_train_balanced, y_train_balanced)
            test_score = xgb_model.score(X_test, y_test)
            print(f"XGBoost - Train accuracy: {train_score:.4f}, Test accuracy: {test_score:.4f}")
            
            # Save model
            model_path = 'backend/models/xgboost_model.pkl'
            os.makedirs(os.path.dirname(model_path), exist_ok=True)
            joblib.dump(xgb_model, model_path)
            print(f"XGBoost model saved to: {model_path}")
            
            return xgb_model
            
        except Exception as e:
            print(f"Error training XGBoost: {e}")
            return None
    
    def train_random_forest(self):
        """Train Random Forest model"""
        try:
            print("\nTraining Random Forest model...")
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                self.X, self.y, test_size=0.2, random_state=42, stratify=self.y
            )
            
            # Handle class imbalance with SMOTE
            print("Applying SMOTE for class balancing...")
            smote = SMOTE(random_state=42)
            X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)
            
            # Train Random Forest
            rf_model = RandomForestClassifier(
                n_estimators=100,
                max_depth=6,
                random_state=42,
                n_jobs=-1
            )
            
            rf_model.fit(X_train_balanced, y_train_balanced)
            
            # Test accuracy
            train_score = rf_model.score(X_train_balanced, y_train_balanced)
            test_score = rf_model.score(X_test, y_test)
            print(f"Random Forest - Train accuracy: {train_score:.4f}, Test accuracy: {test_score:.4f}")
            
            # Save model
            model_path = 'backend/models/Random_Forest_model.pkl'
            os.makedirs(os.path.dirname(model_path), exist_ok=True)
            joblib.dump(rf_model, model_path)
            print(f"Random Forest model saved to: {model_path}")
            
            return rf_model
            
        except Exception as e:
            print(f"Error training Random Forest: {e}")
            return None
    
    def train_simple_cnn(self):
        """Train a simple CNN model using TensorFlow"""
        try:
            print("\nTraining Simple CNN model...")
            
            # Try to import tensorflow
            try:
                import tensorflow as tf
                from tensorflow.keras.models import Sequential
                from tensorflow.keras.layers import Dense, Dropout
                from tensorflow.keras.utils import to_categorical
            except ImportError:
                print("TensorFlow not available. Skipping CNN training.")
                return None
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                self.X, self.y, test_size=0.2, random_state=42, stratify=self.y
            )
            
            # Convert labels to categorical
            y_train_cat = to_categorical(y_train)
            y_test_cat = to_categorical(y_test)
            
            # Create simple neural network (not CNN for tabular data)
            model = Sequential([
                Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
                Dropout(0.3),
                Dense(64, activation='relu'),
                Dropout(0.3),
                Dense(32, activation='relu'),
                Dense(y_train_cat.shape[1], activation='softmax')
            ])
            
            model.compile(
                optimizer='adam',
                loss='categorical_crossentropy',
                metrics=['accuracy']
            )
            
            # Train model
            history = model.fit(
                X_train, y_train_cat,
                validation_data=(X_test, y_test_cat),
                epochs=20,
                batch_size=32,
                verbose=1
            )
            
            # Save model
            model_path = 'backend/models/cic_model.h5'
            os.makedirs(os.path.dirname(model_path), exist_ok=True)
            model.save(model_path)
            print(f"CNN model saved to: {model_path}")
            
            return model
            
        except Exception as e:
            print(f"Error training CNN: {e}")
            return None
    
    def save_metadata(self):
        """Save preprocessing metadata"""
        try:
            metadata = {
                'feature_columns': list(self.X.columns),
                'label_classes': list(self.label_encoder.classes_),
                'scaler_mean': self.scaler.mean_.tolist(),
                'scaler_scale': self.scaler.scale_.tolist()
            }
            
            metadata_path = 'backend/models/metadata.json'
            import json
            with open(metadata_path, 'w') as f:
                json.dump(metadata, f, indent=2)
            
            print(f"Metadata saved to: {metadata_path}")
            
        except Exception as e:
            print(f"Error saving metadata: {e}")

def main():
    """Main training function"""
    trainer = ModelTrainer()
    
    # Load and preprocess data
    if not trainer.load_and_preprocess_data():
        print("Failed to load and preprocess data")
        return
    
    # Train models
    print("="*50)
    print("Starting model training...")
    print("="*50)
    
    # Train XGBoost
    xgb_model = trainer.train_xgboost()
    
    # Train Random Forest
    rf_model = trainer.train_random_forest()
    
    # Train CNN
    cnn_model = trainer.train_simple_cnn()
    
    # Save metadata
    trainer.save_metadata()
    
    print("\n" + "="*50)
    print("Training completed!")
    print("="*50)
    
    # Summary
    models_trained = []
    if xgb_model is not None:
        models_trained.append("XGBoost")
    if rf_model is not None:
        models_trained.append("Random Forest")
    if cnn_model is not None:
        models_trained.append("CNN")
    
    print(f"Successfully trained: {', '.join(models_trained)}")
    print("\nModel files saved in: backend/models/")
    print("- xgboost_model.pkl")
    print("- Random_Forest_model.pkl")
    print("- cic_model.h5")
    print("- metadata.json")

if __name__ == "__main__":
    main()