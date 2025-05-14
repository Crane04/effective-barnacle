# loans/serializers.py
from rest_framework import serializers
from .models import LoanApplication

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = '__all__'
        read_only_fields = ['status', 'credit_score', 'submitted_at', 'reviewed_at', 'reviewed_by', 'user']

class LoanReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = ['status']
