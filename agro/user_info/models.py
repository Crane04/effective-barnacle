from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Demographics(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="demographics")
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=20)
    marital_status = models.CharField(max_length=50)
    has_disability = models.CharField(max_length=100)

class Household(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="household")
    household_size = models.IntegerField(null=True, blank=True)
    adults_count = models.IntegerField(null=True, blank=True)
    ownership_status = models.CharField(max_length=100)
    house_acquisition = models.CharField(max_length=100)
    household_assets = models.CharField()
    financial_decision_maker = models.CharField(max_length=100)
    has_unemployed = models.CharField(max_length=100)

class Employment(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employment")
    business_employees = models.IntegerField(null=True, blank=True)
    income_sector = models.CharField(max_length=100)
    main_income_source = models.CharField(max_length=100)
    monthly_income = models.IntegerField(null=True, blank=True)
    avg_amount_received = models.IntegerField(null=True, blank=True)
    avg_amount_sent = models.IntegerField(null=True, blank=True)

class FinancialBehavior(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="financial_behavior")
    uses_budget = models.CharField(max_length=100)
    financial_tracking = models.CharField(max_length=100)
    financial_planning = models.CharField(max_length=100)
    investment_frequency = models.CharField(max_length=100)
    preferred_investments = models.CharField()
    risk_preference_gain = models.CharField()
    risk_preference_loss = models.CharField()
    goal_actions = models.CharField()

class FinancialHealth(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="financial_health")
    finhealth = models.CharField()
    finneeds = models.CharField()
    cash_shortage_frequency = models.CharField(max_length=50)
    emergency_fund_access = models.CharField(max_length=100)
    debt_manageability = models.CharField(max_length=100)
    credit_activities = models.CharField()
    borrowed_airtime = models.CharField(max_length=100)

class DigitalFinance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="digital_finance")
    mobile_money_awareness = models.CharField(max_length=100)
    mobile_money_experience = models.CharField()
    mobile_money_frequency = models.CharField(max_length=100)
    mobile_money_issues = models.CharField()
    money_transfer_activities = models.CharField()
    money_send_reason = models.CharField()
    utility_bill_payments = models.CharField(max_length=100)
    system_downtime = models.CharField(max_length=100)
    digital_banking = models.CharField(max_length=100)