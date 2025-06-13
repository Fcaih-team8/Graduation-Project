from django.shortcuts import render,redirect
from django.contrib import messages
from django.contrib.auth import logout
from .form import RegisterForm

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account Created Now You Can Login")
            return redirect("login")
    else:
        form = RegisterForm()
    return render(request, "auth/register.html", context={"form": form})
def logout_view(request):
    logout(request)
    return redirect("login")
def home(request):
    return render(request,"auth/home.html")