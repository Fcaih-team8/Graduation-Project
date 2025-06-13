from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model


user = get_user_model()

class RegisterForm(UserCreationForm):
    email = forms.EmailField(max_length=150)
    class Meta():
        model = user
        fields = ['username','email','password1','password2']
