from rest_framework import serializers
from .models import Demographics, Household, Employment, FinancialBehavior, FinancialHealth, DigitalFinance

class DemographicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demographics
        exclude = ["id", "user"]

class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        exclude = ["id", "user"]

class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employment
        exclude = ["id", "user"]

class FinancialBehaviorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialBehavior
        exclude = ["id", "user"]

class FinancialHealthSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialHealth
        exclude = ["id", "user"]

class DigitalFinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DigitalFinance
        exclude = ["id", "user"]