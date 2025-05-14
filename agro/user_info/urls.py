from django.urls import path
from .views import (
    UpdateDemographicsView,
    UpdateHouseholdView,
    UpdateEmploymentView,
    UpdateFinancialBehaviorView,
    UpdateFinancialHealthView,
    UpdateDigitalFinanceView,CreditScoreView
)

urlpatterns = [
    path("demographics/", UpdateDemographicsView.as_view(), name="demographics"),
    path("household/", UpdateHouseholdView.as_view(), name="household"),
    path("employment/", UpdateEmploymentView.as_view(), name="employment"),
    path("financial-behavior/", UpdateFinancialBehaviorView.as_view(), name="financial-behavior"),
    path("financial-health/", UpdateFinancialHealthView.as_view(), name="financial-health"),
    path("digital-finance/", UpdateDigitalFinanceView.as_view(), name="digital-finance"),  
    path('credit-score/', CreditScoreView.as_view(), name='credit-score'),
]