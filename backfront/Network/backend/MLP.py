# import time
# import pandas as pd
# import numpy as np
# import warnings
# import tensorflow as tf
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense, Dropout
# from tensorflow.keras.optimizers import Adam
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import StandardScaler
# from sklearn.metrics import accuracy_score, classification_report
# from sklearn.preprocessing import OneHotEncoder

# warnings.filterwarnings('ignore')

# # Load dataset
# train_df = pd.read_csv("UNSW_NB15_training-set.csv")
# test_df = pd.read_csv("UNSW_NB15_testing-set.csv")

# df = pd.concat([train_df, test_df]).reset_index(drop=True)
# df.drop(columns=['id', 'attack_cat'], inplace=True)

# X = df.drop(columns=['label'])
# y = df['label'].values

# # Feature scaling


# # Encode categorical variables
# encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
# categorical_cols = ["proto", "service", "state"]

# encoded_features = encoder.fit_transform(df[categorical_cols])
# encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_cols))

# # Drop original categorical columns and replace them with encoded values
# df = df.drop(columns=categorical_cols).reset_index(drop=True)
# df = pd.concat([df, encoded_df], axis=1)

# X = df.drop(columns=["label"])
# y = df["label"].values

# sc = StandardScaler()
# X = sc.fit_transform(X)


# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

# # Define MLP model
# model = Sequential([
#     Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
#     Dropout(0.3),
#     Dense(32, activation='relu'),
#     Dropout(0.2),
#     Dense(1, activation='sigmoid')
# ])

# model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])

# # Train model
# start = time.time()
# model.fit(X_train, y_train, epochs=5, batch_size=32, verbose=1)
# y_pred_prob = model.predict(X_test)
# y_pred = (y_pred_prob > 0.5).astype(int)
# end = time.time()

# accuracy = accuracy_score(y_test, y_pred)
# report = classification_report(y_test, y_pred)

# # ✅ Ensure the output is printed correctly for FastAPI to capture
# if __name__ == "__main__":
#     print(f"MLP Accuracy: {accuracy:.2%}")
#     print("\nClassification Report:\n", report)
#     print("\nExecution Time: {:.2f} seconds".format(end - start))



# import time
# import pandas as pd
# import numpy as np
# import warnings
# import tensorflow as tf
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense, Dropout
# from tensorflow.keras.optimizers import Adam
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import StandardScaler
# from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
# from sklearn.preprocessing import OneHotEncoder

# warnings.filterwarnings('ignore')

# # Load dataset
# train_df = pd.read_csv("UNSW_NB15_training-set.csv")
# test_df = pd.read_csv("UNSW_NB15_testing-set.csv")

# df = pd.concat([train_df, test_df]).reset_index(drop=True)
# df.drop(columns=['id', 'attack_cat'], inplace=True)

# # Encode categorical variables
# encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
# categorical_cols = ["proto", "service", "state"]
# encoded_features = encoder.fit_transform(df[categorical_cols])
# encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_cols))

# df = df.drop(columns=categorical_cols).reset_index(drop=True)
# df = pd.concat([df, encoded_df], axis=1)

# X = df.drop(columns=["label"])
# y = df["label"].values

# # Feature scaling
# sc = StandardScaler()
# X = sc.fit_transform(X)

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

# # Define MLP model
# model = Sequential([
#     Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
#     Dropout(0.3),
#     Dense(32, activation='relu'),
#     Dropout(0.2),
#     Dense(1, activation='sigmoid')
# ])

# model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])

# # Train model
# start = time.time()
# model.fit(X_train, y_train, epochs=5, batch_size=32, verbose=1)
# y_pred_prob = model.predict(X_test)
# y_pred = (y_pred_prob > 0.5).astype(int)
# end = time.time()

# # Compute Metrics
# accuracy = accuracy_score(y_test, y_pred)
# precision = precision_score(y_test, y_pred)
# recall = recall_score(y_test, y_pred)
# f1 = f1_score(y_test, y_pred)

# # ✅ Print ONLY structured output
# if __name__ == "__main__":
#     print(f"Accuracy: {accuracy:.2%}")
#     print(f"Precision: {precision:.4f}")
#     print(f"Recall: {recall:.4f}")
#     print(f"F1-score: {f1:.4f}")

import sys
import time
import pandas as pd
import numpy as np
import warnings
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.preprocessing import OneHotEncoder
import os
import sys

# Suppress TensorFlow logs
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
tf.get_logger().setLevel("ERROR")
tf.autograph.set_verbosity(0)

# Redirect stdout & stderr to suppress TensorFlow logs
class SuppressOutput:
    def __enter__(self):
        self._original_stdout = sys.stdout
        self._original_stderr = sys.stderr
        sys.stdout = open(os.devnull, "w")
        sys.stderr = open(os.devnull, "w")
    
    def __exit__(self, exc_type, exc_value, traceback):
        sys.stdout.close()
        sys.stderr.close()
        sys.stdout = self._original_stdout
        sys.stderr = self._original_stderr

warnings.filterwarnings('ignore')

# Load dataset
train_df = pd.read_csv("UNSW_NB15_training-set.csv")
test_df = pd.read_csv("UNSW_NB15_testing-set.csv")

df = pd.concat([train_df, test_df]).reset_index(drop=True)
df.drop(columns=['id', 'attack_cat'], inplace=True)

# Encode categorical variables
encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
categorical_cols = ["proto", "service", "state"]
encoded_features = encoder.fit_transform(df[categorical_cols])
encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_cols))

df = df.drop(columns=categorical_cols).reset_index(drop=True)
df = pd.concat([df, encoded_df], axis=1)

X = df.drop(columns=["label"])
y = df["label"].values

# Feature scaling
sc = StandardScaler()
X = sc.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

# Define MLP model
model = Sequential([
    Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    Dropout(0.3),
    Dense(32, activation='relu'),
    Dropout(0.2),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])

# Train model (Fully Silent)
start = time.time()
with SuppressOutput():  # Redirects all logs
    model.fit(X_train, y_train, epochs=5, batch_size=32, verbose=0)

# ✅ Run Predictions Silently
with SuppressOutput():
    y_pred_prob = model.predict(X_test, verbose=0)

y_pred = (y_pred_prob > 0.5).astype(int)
end = time.time()

# Compute Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

# ✅ Print ONLY structured output
if __name__ == "__main__":
    print(f"Accuracy: {accuracy:.2%}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall: {recall:.4f}")
    print(f"F1-score: {f1:.4f}")

sys.stdout.flush()
sys.exit(0)
