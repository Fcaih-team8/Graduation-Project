from django.urls import path
from . import views

urlpatterns = [
    path("get_answer/", views.get_answer, name="get_answer"),
    path("get_questions/", views.get_all_questions, name="get_all_questions"), # New endpoint for getting all questions
]

