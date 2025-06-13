# import time
# import pandas as pd
# import numpy as np
# import warnings
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import StandardScaler
# from sklearn.metrics import accuracy_score, classification_report
# from xgboost import XGBClassifier
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

# # Train XGBoost model
# start = time.time()
# model = XGBClassifier().fit(X_train, y_train)
# y_pred = model.predict(X_test)
# end = time.time()

# accuracy = accuracy_score(y_test, y_pred)
# report = classification_report(y_test, y_pred)

# # ✅ Ensure the output is printed correctly for FastAPI to capture
# if __name__ == "__main__":
#     print(f"XGBoost Accuracy: {accuracy:.2%}")
#     print("\nClassification Report:\n", report)
#     print("\nExecution Time: {:.2f} seconds".format(end - start))


import sys
import time
import pandas as pd
import numpy as np
import warnings
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from xgboost import XGBClassifier

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

# Train XGBoost model
start = time.time()
model = XGBClassifier().fit(X_train, y_train)
y_pred = model.predict(X_test)
end = time.time()

# Compute Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

# ✅ Print structured output for FastAPI
if __name__ == "__main__":
    print(f"Accuracy: {accuracy:.2%}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall: {recall:.4f}")
    print(f"F1-score: {f1:.4f}")
    print(f"Execution Time: {end - start:.2f} seconds")

sys.stdout.flush()
sys.exit(0)