from django.urls import path
from .views import (
    UserSignupView, 
    UserOnlineStatusView,
    UserDetailView,
    CustomTokenObtainPairView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('online/', UserOnlineStatusView.as_view(), name='user-online'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
]
