from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('test/', views.getData),
    path('signup/', views.signup),
    path('login/', views.loginUser, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('token/refresh/', views.refresh_token_view, name='refresh'),
    path('user/', views.getUserData),
    path('user/list/', views.getUserList),
    path('user/delete/<int:id>/', views.remove_user),
    path('user/update/<int:id>/', views.update_user),
]
