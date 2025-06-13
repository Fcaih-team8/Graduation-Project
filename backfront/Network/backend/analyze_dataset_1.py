# import pandas as pd
# import seaborn as sns
# import matplotlib.pyplot as plt

# # Load dataset
# train_df = pd.read_csv("UNSW_NB15_training-set.csv")
# test_df = pd.read_csv("UNSW_NB15_testing-set.csv")

# # Print dataset info for FastAPI response
# print(f"Training Data Shape: {train_df.shape}")
# print(f"Testing Data Shape: {test_df.shape}")

# print("\nMissing Values in Training Data:")
# print(train_df.isnull().sum())

# print("\nMissing Values in Testing Data:")
# print(test_df.isnull().sum())

# print("\nDuplicate Rows in Training Data:", train_df.duplicated().sum())
# print("Duplicate Rows in Testing Data:", test_df.duplicated().sum())

# print("\nLabel Distribution in Training Data:")
# print(train_df["label"].value_counts())

# print("\nAttack Category Distribution in Training Data:")
# print(train_df["attack_cat"].value_counts())

# if __name__ == "__main__":
#     print("Dataset Analysis Completed Successfully!")
 

import sys
import pandas as pd

# Load dataset
train_df = pd.read_csv("UNSW_NB15_training-set.csv")

# Extract attack category distribution
category_counts = train_df["attack_cat"].value_counts()

# ✅ Print structured category output for FastAPI
print("Category Distribution:")
for category, count in category_counts.items():
    print(f"{category}: {count}")

sys.stdout.flush()
sys.exit(0)