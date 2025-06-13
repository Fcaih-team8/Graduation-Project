from django.urls import include,path
import django.contrib.auth.views as auth
from .views import register,home,logout_view

urlpatterns = [
    path('login',auth.LoginView.as_view(template_name='auth/login.html',redirect_authenticated_user=True),name='login'),
    path('register',register,name='register'),
    path('logout',logout_view,name='logout'),
    path("",home,name="home")
]