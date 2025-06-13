import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ids.settings')
django.setup()

from chatbot.models import QuestionAnswer

# Sample Q&A data
qa_data = [
    {"question": "What is IDS?", "answer": "IDS stands for Intrusion Detection System. It is a system that monitors network or system activities for malicious activities or policy violations and produces reports to a Management Station."},
    {"question": "How does SecureBase IDS work?", "answer": "SecureBase IDS uses a combination of signature-based detection and anomaly-based detection to identify potential threats in real-time."},
    {"question": "What services do you offer?", "answer": "We offer Desktop Application security, Network security, and Website security solutions."},
    {"question": "How can I get started?", "answer": "You can sign up for an account or log in if you already have one. From there, you can explore our services dashboard."},
    {"question": "Is my data secure with SecureBase?", "answer": "Yes, we prioritize data security and use advanced encryption and security protocols to protect your information."}
]

def populate_db():
    for item in qa_data:
        # Check if the question already exists to avoid duplicates
        if not QuestionAnswer.objects.filter(question=item['question']).exists():
            QuestionAnswer.objects.create(question=item['question'], answer=item['answer'])
            print(f"Added: {item['question']}")
        else:
            print(f"Skipped (already exists): {item['question']}")

if __name__ == '__main__':
    print("Populating database with initial Q&A data...")
    populate_db()
    print("Database population complete.")

