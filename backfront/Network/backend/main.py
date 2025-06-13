# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import subprocess
# import uvicorn

# app = FastAPI()

# # Enable CORS for frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Paths to algorithm scripts
# ALGORITHMS = {
#     "logistic_regression": "LogisticRegression.py",
#     "mlp": "MLP.py",
#     "xgboost": "XGBoost.py",
#     "dataset_analysis": "analyze_dataset_1.py"
# }

# @app.get("/")
# def read_root():
#     return {"message": "Machine Learning API is running"}

# @app.get("/run/{algorithm_name}")
# def run_algorithm(algorithm_name: str):
#     if algorithm_name not in ALGORITHMS:
#         raise HTTPException(status_code=400, detail="Invalid algorithm name")

#     script_path = ALGORITHMS[algorithm_name]
#     try:
#         result = subprocess.run(["python", script_path], capture_output=True, text=True)
        
#         # Ensure FastAPI captures script output
#         if result.stdout.strip():
#             return {"status": "success", "output": result.stdout}
#         else:
#             return {"status": "error", "output": "No output received from the script."}
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error executing script: {str(e)}")

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)


# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import subprocess
# import uvicorn
# import re

# app = FastAPI()

# # Enable CORS for frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Paths to algorithm scripts
# ALGORITHMS = {
#     "logistic_regression": "LogisticRegression.py",
#     "mlp": "MLP.py",
#     "xgboost": "XGBoost.py",
#     "dataset_analysis": "analyze_dataset_1.py"
# }

# @app.get("/")
# def read_root():
#     return {"message": "Machine Learning API is running"}

# @app.get("/run/{algorithm_name}")
# def run_algorithm(algorithm_name: str):
#     if algorithm_name not in ALGORITHMS:
#         raise HTTPException(status_code=400, detail="Invalid algorithm name")

#     script_path = ALGORITHMS[algorithm_name]
#     try:
#         result = subprocess.run(["python", script_path], capture_output=True, text=True)
#         output = result.stdout.strip()

#         if not output:
#             return {"status": "error", "output": "No output received from the script."}

#         if algorithm_name == "dataset_analysis":
#             # Extract category distribution from output
#             categories = {}
#             for line in output.split("\n"):
#                 match = re.match(r"(\w+):\s*(\d+)", line)
#                 if match:
#                     categories[match.group(1)] = int(match.group(2))

#             return {
#                 "status": "success",
#                 "category_distribution": categories,
#                 "output": output
#             }

#         # Extract classification metrics
#         accuracy_match = re.search(r"Accuracy:\s*(\d+\.\d+)%", output)
#         precision_match = re.search(r"Precision:\s*(\d+\.\d+)", output)
#         recall_match = re.search(r"Recall:\s*(\d+\.\d+)", output)
#         f1_match = re.search(r"F1-score:\s*(\d+\.\d+)", output)

#         accuracy = float(accuracy_match.group(1)) if accuracy_match else 0.0
#         precision = float(precision_match.group(1)) if precision_match else 0.0
#         recall = float(recall_match.group(1)) if recall_match else 0.0
#         f1 = float(f1_match.group(1)) if f1_match else 0.0

#         return {
#             "status": "success",
#             "accuracy": accuracy,
#             "precision": precision,
#             "recall": recall,
#             "f1": f1,
#             "output": output
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error executing script: {str(e)}")

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)


# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import subprocess
# import uvicorn
# import re

# app = FastAPI()

# # Enable CORS for frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Paths to algorithm scripts
# ALGORITHMS = {
#     "logistic_regression": "LogisticRegression.py",
#     "mlp": "MLP.py",
#     "xgboost": "XGBoost.py",
#     "dataset_analysis": "analyze_dataset_1.py"
# }

# @app.get("/")
# def read_root():
#     return {"message": "Machine Learning API is running"}

# @app.get("/run/{algorithm_name}")
# def run_algorithm(algorithm_name: str):
#     if algorithm_name not in ALGORITHMS:
#         raise HTTPException(status_code=400, detail="Invalid algorithm name")

#     script_path = ALGORITHMS[algorithm_name]
#     try:
#         result = subprocess.run(["python", script_path], capture_output=True, text=True)
#         output = result.stdout.strip()

#         if not output:
#             return {"status": "error", "output": "No output received from the script."}

#         if algorithm_name == "dataset_analysis":
#             # Extract category distribution from output
#             categories = {}
#             for line in output.split("\n"):
#                 match = re.match(r"(\w+):\s*(\d+)", line)
#                 if match:
#                     categories[match.group(1)] = int(match.group(2))

#             # Ensure all categories are included (even if they are missing)
#             all_categories = ["Normal", "DoS", "Probe", "R2L", "U2R"]
#             for cat in all_categories:
#                 if cat not in categories:
#                     categories[cat] = 0  # Set missing categories to 0

#             return {
#                 "status": "success",
#                 "category_distribution": categories,
#                 "output": output
#             }

#         # Extract classification metrics
#         accuracy_match = re.search(r"Accuracy:\s*(\d+\.\d+)%", output)
#         precision_match = re.search(r"Precision:\s*(\d+\.\d+)", output)
#         recall_match = re.search(r"Recall:\s*(\d+\.\d+)", output)
#         f1_match = re.search(r"F1-score:\s*(\d+\.\d+)", output)

#         accuracy = float(accuracy_match.group(1)) if accuracy_match else 0.0
#         precision = float(precision_match.group(1)) if precision_match else 0.0
#         recall = float(recall_match.group(1)) if recall_match else 0.0
#         f1 = float(f1_match.group(1)) if f1_match else 0.0

#         return {
#             "status": "success",
#             "accuracy": accuracy,
#             "precision": precision,
#             "recall": recall,
#             "f1": f1,
#             "output": output
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error executing script: {str(e)}")

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)



# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import subprocess
# import uvicorn
# import re

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# ALGORITHMS = {
#     "logistic_regression": "LogisticRegression.py",
#     "mlp": "MLP.py",
#     "xgboost": "XGBoost.py",
#     "dataset_analysis": "analyze_dataset_1.py"
# }

# @app.get("/")
# def read_root():
#     return {"message": "Machine Learning API is running"}

# @app.get("/run/{algorithm_name}")
# def run_algorithm(algorithm_name: str):
#     if algorithm_name not in ALGORITHMS:
#         raise HTTPException(status_code=400, detail="Invalid algorithm name")

#     script_path = ALGORITHMS[algorithm_name]

#     try:
#         result = subprocess.run(
#             # ["python", script_path]
#             [r"C:\Users\Abdullah\Desktop\NIDSInterfaceFront_Back\New\backend\venv\Scripts\python.exe", script_path]
# ,
#             capture_output=True,
#             text=True,
#             check=False  # Don't raise exception on non-zero exit
#         )

#         stdout = result.stdout.strip()
#         stderr = result.stderr.strip()

#         if result.returncode != 0:
#             return {
#                 "status": "error",
#                 "output": f"Script failed with error:\n{stderr if stderr else stdout}"
#             }

#         if not stdout:
#             return {"status": "error", "output": "No output received from the script."}

#         # If it's the dataset analysis script
#         if algorithm_name == "dataset_analysis":
#             categories = {}
#             for line in stdout.split("\n"):
#                 match = re.match(r"(\w+):\s*(\d+)", line)
#                 if match:
#                     categories[match.group(1)] = int(match.group(2))

#             all_categories = [
#                 "Normal", "Generic", "Exploits", "Fuzzers", "DoS",
#                 "Reconnaissance", "Analysis", "Backdoor", "Shellcode", "Worms"
#             ]
#             for cat in all_categories:
#                 if cat not in categories:
#                     categories[cat] = 0

#             return {
#                 "status": "success",
#                 "category_distribution": categories,
#                 "output": stdout
#             }

#         # If it's an algorithm, extract metrics
#         accuracy_match = re.search(r"Accuracy:\s*(\d+\.\d+)%", stdout)
#         precision_match = re.search(r"Precision:\s*(\d+\.\d+)", stdout)
#         recall_match = re.search(r"Recall:\s*(\d+\.\d+)", stdout)
#         f1_match = re.search(r"F1-score:\s*(\d+\.\d+)", stdout)

#         accuracy = float(accuracy_match.group(1)) if accuracy_match else 0.0
#         precision = float(precision_match.group(1)) if precision_match else 0.0
#         recall = float(recall_match.group(1)) if recall_match else 0.0
#         f1 = float(f1_match.group(1)) if f1_match else 0.0

#         return {
#             "status": "success",
#             "accuracy": accuracy,
#             "precision": precision,
#             "recall": recall,
#             "f1": f1,
#             "output": stdout
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import uvicorn
import re
import sys  # <-- NEW

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALGORITHMS = {
    "logistic_regression": "LogisticRegression.py",
    "mlp": "MLP.py",
    "xgboost": "XGBoost.py",
    "dataset_analysis": "analyze_dataset_1.py"
}

@app.get("/")
def read_root():
    return {"message": "Machine Learning API is running"}

@app.get("/run/{algorithm_name}")
def run_algorithm(algorithm_name: str):
    if algorithm_name not in ALGORITHMS:
        raise HTTPException(status_code=400, detail="Invalid algorithm name")

    script_path = ALGORITHMS[algorithm_name]

    try:
        result = subprocess.run(
            [sys.executable, script_path],  # <-- CHANGED
            capture_output=True,
            text=True,
            check=False
        )

        stdout = result.stdout.strip()
        stderr = result.stderr.strip()

        if result.returncode != 0:
            return {
                "status": "error",
                "output": f"Script failed with error:\n{stderr if stderr else stdout}"
            }

        if not stdout:
            return {"status": "error", "output": "No output received from the script."}

        if algorithm_name == "dataset_analysis":
            categories = {}
            for line in stdout.split("\n"):
                match = re.match(r"(\w+):\s*(\d+)", line)
                if match:
                    categories[match.group(1)] = int(match.group(2))

            all_categories = [
                "Normal", "Generic", "Exploits", "Fuzzers", "DoS",
                "Reconnaissance", "Analysis", "Backdoor", "Shellcode", "Worms"
            ]
            for cat in all_categories:
                if cat not in categories:
                    categories[cat] = 0

            return {
                "status": "success",
                "category_distribution": categories,
                "output": stdout
            }

        # Extract metrics for ML algorithms
        accuracy_match = re.search(r"Accuracy:\s*(\d+\.\d+)%", stdout)
        precision_match = re.search(r"Precision:\s*(\d+\.\d+)", stdout)
        recall_match = re.search(r"Recall:\s*(\d+\.\d+)", stdout)
        f1_match = re.search(r"F1-score:\s*(\d+\.\d+)", stdout)

        accuracy = float(accuracy_match.group(1)) if accuracy_match else 0.0
        precision = float(precision_match.group(1)) if precision_match else 0.0
        recall = float(recall_match.group(1)) if recall_match else 0.0
        f1 = float(f1_match.group(1)) if f1_match else 0.0

        return {
            "status": "success",
            "accuracy": accuracy,
            "precision": precision,
            "recall": recall,
            "f1": f1,
            "output": stdout
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
