from rest_framework import generics
from .serializers import UserSignupSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer
    permission_classes = [AllowAny]


class UserOnlineStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"online": True, "user_id": request.user.id})
    

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSignupSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class CustomTokenObtainPairView(TokenObtainPairView):
    
    def post(self, request, *args, **kwargs):
        print("here")
        response = super().post(request, *args, **kwargs)
        refresh = response.data["refresh"]
        access = response.data["access"]

        # Set refresh token in HttpOnly cookie
        res = Response({"access": access, "refresh": refresh})
        res.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            secure=False,  # Only over HTTPS in production
            samesite="Lax",
            max_age=1000000,
        )
        return res