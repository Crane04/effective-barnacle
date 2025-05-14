from rest_framework import generics, permissions
from .models import Demographics, Household, Employment, FinancialBehavior, FinancialHealth, DigitalFinance
from .serializers import *

class UpdateDemographicsView(generics.RetrieveUpdateAPIView):
    queryset = Demographics.objects.all()
    serializer_class = DemographicsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.demographics

class UpdateHouseholdView(generics.RetrieveUpdateAPIView):
    queryset = Household.objects.all()
    serializer_class = HouseholdSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.household

class UpdateEmploymentView(generics.RetrieveUpdateAPIView):
    queryset = Employment.objects.all()
    serializer_class = EmploymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.employment

class UpdateFinancialBehaviorView(generics.RetrieveUpdateAPIView):
    queryset = FinancialBehavior.objects.all()
    serializer_class = FinancialBehaviorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.financial_behavior

class UpdateFinancialHealthView(generics.RetrieveUpdateAPIView):
    queryset = FinancialHealth.objects.all()
    serializer_class = FinancialHealthSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.financial_health

class UpdateDigitalFinanceView(generics.RetrieveUpdateAPIView):
    queryset = DigitalFinance.objects.all()
    serializer_class = DigitalFinanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.digital_finance
    


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import pickle
import numpy as np
import pandas as pd
from .utils import get_user_data_for_credit_score

# Load models once when the app starts (better performance)
try:
    with open('preprocessor.pkl', 'rb') as f:
        PREPROCESSOR = pickle.load(f)
    
    with open('model.pkl', 'rb') as f:
        MODEL = pickle.load(f)
except Exception as e:
    print(f"Error loading ML models: {str(e)}")
    PREPROCESSOR = None
    MODEL = None

class CreditScoreView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if not PREPROCESSOR or not MODEL:
            return Response(
                {"error": "Credit scoring service unavailable"}, 
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        user = request.user
        user_data, missing_fields = get_user_data_for_credit_score(user)
        
        if missing_fields:
            return Response(
                {"error": "Missing fields", "missing_fields": missing_fields},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Prepare DataFrame in correct feature order
            features = [
            'household_size',
            'adults_count',
            'business_employees',
            'age',
            'monthly_income',
            'avg_amount_received',
            'avg_amount_sent',
            'has_unemployed',
            'ownership_status',
            'financial_decision_maker',
            'house_acquisition',
            'household_assets',
            'has_disability',
            'main_income_source',
            'income_sector',
            'marital_status',
            'gender',
            'risk_preference_gain',
            'risk_preference_loss',
            'system_downtime',
            'digital_banking',
            'uses_budget',
            'financial_tracking',
            'goal_actions',
            'investment_frequency',
            'financial_planning',
            'cash_shortage_frequency',
            'emergency_fund_access',
            'finhealth',
            'finneeds',
            'preferred_investments',
            'credit_activities',
            'debt_manageability',
            'borrowed_airtime',
            'mobile_money_awareness',
            'mobile_money_experience',
            'mobile_money_frequency',
            'mobile_money_issues',
            'money_transfer_activities',
            'money_send_reason',
            'utility_bill_payments'
            ]
    
            input_values = [user_data[feature] for feature in features]
            user_df = pd.DataFrame([input_values], columns=features)
            
            # Transform and predict
            Xt = PREPROCESSOR.transform(user_df)
            score = np.round(MODEL.predict_proba(Xt)[0][0] * 100, 2) # Convert to percentage
            print(MODEL.predict_proba(Xt))
            return Response({
                "credit_score": score,
                "status": "success"
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": f"Error calculating score: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )