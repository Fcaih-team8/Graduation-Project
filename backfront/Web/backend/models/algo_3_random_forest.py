import pandas as pd
import os
import numpy as np
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE 
from sklearn.feature_selection import SelectKBest, f_classif
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report, ConfusionMatrixDisplay, accuracy_score
from collections import Counter
from sklearn.ensemble import RandomForestClassifier

class CICPreprocessor:
    def __init__(self, file_paths):
        self.file_paths = file_paths
        self.label_encoders = {}
        self.scaler = StandardScaler()
        self.imputer = SimpleImputer(strategy='median')
        self.feature_columns = []
        self.X_test = None
        self.y_test = None

    def load_data(self):
        dataframes = []
        for path in self.file_paths:
            try:
                df = pd.read_csv(path, low_memory=False)
                df = df.sample(frac=0.1, random_state=42)
                dataframes.append(df)
            except Exception as e:
                print(f"Error loading file {path}: {e}")
        if not dataframes:
            raise ValueError("No datasets were successfully loaded")
        return pd.concat(dataframes, ignore_index=True)

    def optimize_data_types(self, df):
        for col in df.select_dtypes(include=['float64']).columns:
            df[col] = df[col].astype('float32')
        for col in df.select_dtypes(include=['int64']).columns:
            df[col] = df[col].astype('int32')
        return df

    def clean_column_names(self, df):
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        return df

    def remove_zero_columns(self, df):
        zero_columns = [col for col in df.columns if df[col].dtype in [np.int64, np.float64] and (df[col] == 0).all()]
        if zero_columns:
            df = df.drop(columns=zero_columns)
        return df

    def encode_labels(self, df):
        if 'label' in df.columns:
            le = LabelEncoder()
            df['label'] = le.fit_transform(df['label'].astype(str))
            self.label_encoders['label'] = le
        return df

    def handle_missing_values(self, df):
        df = df.replace([np.inf, -np.inf], np.nan)
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        df[numeric_cols] = self.imputer.fit_transform(df[numeric_cols])
        return df

    def remove_correlated_features(self, df, threshold=0.85):
        corr_matrix = df.corr().abs()
        upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
        to_drop = [column for column in upper.columns if any(upper[column] > threshold)]
        return df.drop(columns=to_drop)

    def select_important_features(self, X, y, n_features=20):
        selector = SelectKBest(score_func=f_classif, k=n_features)
        X_new = selector.fit_transform(X, y)
        self.feature_columns = X.columns[selector.get_support()].tolist()
        return pd.DataFrame(X_new, columns=self.feature_columns)

    def normalize_features(self, X_train, X_val, X_test):
        self.scaler.fit(X_train)
        X_train = pd.DataFrame(self.scaler.transform(X_train), columns=self.feature_columns)
        X_val = pd.DataFrame(self.scaler.transform(X_val), columns=self.feature_columns)
        X_test = pd.DataFrame(self.scaler.transform(X_test), columns=self.feature_columns)
        return X_train, X_val, X_test

    def handle_class_imbalance(self, X, y):
        print(f"Class distribution before SMOTE: {Counter(y)}")
        min_samples = 6
        class_counts = Counter(y)
        valid_classes = [cls for cls, count in class_counts.items() if count >= min_samples]
        valid_indices = y.isin(valid_classes)
        X = X[valid_indices]
        y = y[valid_indices]

        le = LabelEncoder()
        y = le.fit_transform(y)

        smote = SMOTE(sampling_strategy='auto', k_neighbors=5, random_state=42)
        X_resampled, y_resampled = smote.fit_resample(X, y)
        print(f"Class distribution after SMOTE: {Counter(y_resampled)}")
        return X_resampled, y_resampled

    def process(self):
        print("Starting preprocessing pipeline...")
        df = self.load_data()
        df = self.optimize_data_types(df)
        df = self.clean_column_names(df)
        df = self.remove_zero_columns(df)
        df = self.encode_labels(df)
        df = self.handle_missing_values(df)
        df = self.remove_correlated_features(df)

        X = df.drop('label', axis=1)
        y = df['label']

        print("Selecting important features...")
        X = self.select_important_features(X, y)

        print("Handling class imbalance...")
        X, y = self.handle_class_imbalance(X, y)

        print("Splitting data...")
        X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)
        X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp)

        print("Normalizing features...")
        X_train, X_val, X_test = self.normalize_features(X_train, X_val, X_test)

        self.X_test = X_test
        self.y_test = y_test

        print("Training Random Forest model...")
        rf_model = self.train_random_forest(X_train, y_train)

        print("Evaluating Random Forest model...")
        self.evaluate_random_forest(rf_model, X_test, y_test)

        return rf_model

    def train_random_forest(self, X_train, y_train):
        # تقسيم البيانات للتحقق
        X_train_fit, X_val_fit, y_train_fit, y_val_fit = train_test_split(
            X_train, y_train, test_size=0.2, random_state=42
        )

        # إنشاء النموذج
        rf_model = RandomForestClassifier(
            n_estimators=100,
            max_depth=6,
            random_state=42,
            n_jobs=-1
        )

        # تدريب النموذج
        rf_model.fit(X_train_fit, y_train_fit)

        # حساب الدقة على مجموعة التدريب والتحقق
        train_accuracy = rf_model.score(X_train_fit, y_train_fit)
        val_accuracy = rf_model.score(X_val_fit, y_val_fit)

        print(f"Training Accuracy: {train_accuracy * 100:.2f}%")
        print(f"Validation Accuracy: {val_accuracy * 100:.2f}%")

        # رسم أهمية المميزات
        feature_importance = pd.DataFrame({
            'feature': self.feature_columns,
            'importance': rf_model.feature_importances_
        })
        feature_importance = feature_importance.sort_values('importance', ascending=False)

        plt.figure(figsize=(10, 6))
        plt.bar(feature_importance['feature'][:10], feature_importance['importance'][:10])
        plt.title('Top 10 Most Important Features')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

        return rf_model

    def evaluate_random_forest(self, model, X_test, y_test):
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Random Forest Test Accuracy: {accuracy * 100:.2f}%")

# تعريف مسارات الملفات
file_paths = [
   "C:/Users/zizo/Downloads/project/backend/data/data/extracted/Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv",
    "C:/Users/zizo/Downloads/project/backend/data/data/extracted/Friday-WorkingHours-Afternoon-PortScan.pcap_ISCX.csv",
    "C:/Users/zizo/Downloads/project/backend/data/data/extracted/Friday-WorkingHours-Morning.pcap_ISCX.csv",
    "C:/Users/zizo/Downloads/project/backend/data/data/extracted/Monday-WorkingHours.pcap_ISCX.csv",
    "C:/Users/zizo/Downloads/project/backend/data/data/extracted/Thursday-WorkingHours-Afternoon-Infilteration.pcap_ISCX.csv",
    "C:/Users/zizo/Downloads/project/backend/data/data/extracted/Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv",
    "C:/Users/zizo/Downloads/project/backend/data/data/extracted/Tuesday-WorkingHours.pcap_ISCX.csv",
    "C:/Users/zizo/Downloads/project/backend/data/data/extracted/Wednesday-workingHours.pcap_ISCX.csv"
]

# إنشاء وتشغيل المعالج
preprocessor = CICPreprocessor(file_paths)
rf_model = preprocessor.process()

# التنبؤات وعرض النتائج
print("Making predictions on test set...")
predictions = rf_model.predict(preprocessor.X_test)
y_test_actual = preprocessor.y_test

label_encoder = preprocessor.label_encoders['label']
original_predicted_classes = label_encoder.inverse_transform(predictions)
original_actual_classes = label_encoder.inverse_transform(y_test_actual)

print("Classification Report with Original Labels:")
print(classification_report(original_actual_classes, original_predicted_classes))

plt.figure(figsize=(12, 8))
cm = confusion_matrix(original_actual_classes, original_predicted_classes, labels=label_encoder.classes_)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=label_encoder.classes_)
disp.plot(cmap=plt.cm.Blues, xticks_rotation='vertical')
plt.title("Confusion Matrix")
plt.tight_layout()
plt.show()

plt.figure(figsize=(25, 8))
plt.hist([original_actual_classes, original_predicted_classes],
         bins=len(label_encoder.classes_),
         label=['Actual', 'Predicted'],
         color=['blue', 'orange'],
         alpha=0.7)
plt.title("Actual vs Predicted Label Counts")
plt.xlabel("Labels")
plt.ylabel("Frequency")
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()


# Save the model
joblib.dump(rf_model, "Random_Forest_model.pkl")

# Load the saved model
loaded_model = joblib.load("Random_Forest_model.pkl")

# استخدام النموذج المحمل للتنبؤ
print("Making predictions with loaded model...")
predictions_loaded = loaded_model.predict(preprocessor.X_test)
y_test_actual = preprocessor.y_test

# تحويل التنبؤات إلى التسميات الأصلية
label_encoder = preprocessor.label_encoders['label']
original_predicted_classes = label_encoder.inverse_transform(predictions_loaded)
original_actual_classes = label_encoder.inverse_transform(y_test_actual)

# عرض تقرير التصنيف
print("\nClassification Report with Loaded Model:")
print(classification_report(original_actual_classes, original_predicted_classes))

# رسم مصفوفة الارتباك
plt.figure(figsize=(12, 8))
cm = confusion_matrix(original_actual_classes, original_predicted_classes, labels=label_encoder.classes_)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=label_encoder.classes_)
disp.plot(cmap=plt.cm.Blues, xticks_rotation='vertical')
plt.title("Confusion Matrix (Loaded Model)")
plt.tight_layout()
plt.show()

# رسم توزيع التنبؤات
plt.figure(figsize=(25, 8))
plt.hist([original_actual_classes, original_predicted_classes],
         bins=len(label_encoder.classes_),
         label=['Actual', 'Predicted'],
         color=['blue', 'orange'],
         alpha=0.7)
plt.title("Actual vs Predicted Label Counts (Loaded Model)")
plt.xlabel("Labels")
plt.ylabel("Frequency")
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# مقارنة دقة النموذج المحمل
accuracy_loaded = accuracy_score(y_test_actual, predictions_loaded)
print(f"\nLoaded Model Test Accuracy: {accuracy_loaded * 100:.2f}%")

"""load_model"""

import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

class ModelPredictor:
    def __init__(self, model_path="Random_Forest_model.pkl"):
        # تحميل النموذج
        self.model = joblib.load(model_path)

        # تحميل المعلومات الإضافية مثل المقياس وأسماء المميزات
        # (يجب أن تكون قد حفظتها مع النموذج)
        self.scaler = StandardScaler()  # أو تحميله إذا حفظته
        self.feature_names = [
            # قائمة بأسماء المميزات المستخدمة في التدريب
            # يجب أن تكون نفس المميزات التي تم تدريب النموذج عليها
        ]

    def preprocess_data(self, data):
        """تجهيز البيانات للتنبؤ"""
        # تحويل البيانات إلى DataFrame إذا لم تكن كذلك
        if not isinstance(data, pd.DataFrame):
            data = pd.DataFrame([data])

        # التأكد من وجود جميع المميزات المطلوبة
        for feature in self.feature_names:
            if feature not in data.columns:
                raise ValueError(f"Missing feature: {feature}")

        # ترتيب الأعمدة كما في التدريب
        data = data[self.feature_names]

        # تطبيق نفس المعالجة التي تم استخدامها في التدريب
        data = self.scaler.transform(data)

        return data

    def predict(self, data):
        """التنبؤ باستخدام النموذج"""
        try:
            # تجهيز البيانات
            processed_data = self.preprocess_data(data)

            # التنبؤ
            prediction = self.model.predict(processed_data)

            # يمكنك إضافة تحويل التنبؤ إلى التسمية الأصلية هنا
            # إذا كنت تستخدم LabelEncoder

            return prediction
        except Exception as e:
            print(f"Error in prediction: {e}")
            return None