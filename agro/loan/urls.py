# loans/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserLoanApplicationViewSet, LenderLoanListView, LoanReviewView

router = DefaultRouter()
router.register(r'user/', UserLoanApplicationViewSet, basename='user-loans')

urlpatterns = [
    path('', include(router.urls)),
    path('lender/', LenderLoanListView.as_view(), name='lender-applications'),
    path('lender/<int:pk>/review/', LoanReviewView.as_view(), name='loan-review'),
]
