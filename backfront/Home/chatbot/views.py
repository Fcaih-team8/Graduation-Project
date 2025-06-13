from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import QuestionAnswer
import json

@csrf_exempt # For simplicity in this example, consider CSRF protection for production
def get_answer(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            question_text = data.get('question', '').strip()
            if not question_text:
                return JsonResponse({'error': 'No question provided'}, status=400)

            # Simple case-insensitive exact match for now
            # For more advanced matching, consider libraries like fuzzywuzzy or full-text search
            try:
                qa_pair = QuestionAnswer.objects.get(question__iexact=question_text)
                answer = qa_pair.answer
            except QuestionAnswer.DoesNotExist:
                # A more sophisticated approach might try partial matches or return a default "I don't know" answer
                # For now, we'll try a case-insensitive partial match (contains)
                qa_pairs = QuestionAnswer.objects.filter(question__icontains=question_text)
                if qa_pairs.exists():
                    answer = qa_pairs.first().answer # Return the first match
                else:
                    answer = "I'm sorry, I don't have an answer to that question right now. Please try asking something else or contact support for more complex queries."
            
            return JsonResponse({'answer': answer})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)


def get_all_questions(request):
    if request.method == 'GET':
        try:
            questions = QuestionAnswer.objects.all().values_list('question', flat=True)
            return JsonResponse({'questions': list(questions)})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)

