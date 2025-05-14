from django.contrib import admin
from .models import (
    Demographics,
    Household,
    Employment,
    FinancialBehavior,
    FinancialHealth,
    DigitalFinance
)

@admin.register(Demographics)
class DemographicsAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'gender', 'marital_status')
    search_fields = ('user__username', 'user__email')
    raw_id_fields = ('user',)

@admin.register(Household)
class HouseholdAdmin(admin.ModelAdmin):
    list_display = ('user', 'household_size', 'adults_count', 'ownership_status')
    search_fields = ('user__username', 'user__email')
    raw_id_fields = ('user',)

@admin.register(Employment)
class EmploymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'monthly_income', 'income_sector', 'main_income_source')
    search_fields = ('user__username', 'user__email')
    raw_id_fields = ('user',)

@admin.register(FinancialBehavior)
class FinancialBehaviorAdmin(admin.ModelAdmin):
    list_display = ('user', 'uses_budget', 'financial_planning', 'investment_frequency')
    search_fields = ('user__username', 'user__email')
    raw_id_fields = ('user',)

@admin.register(FinancialHealth)
class FinancialHealthAdmin(admin.ModelAdmin):
    list_display = ('user', 'finhealth', 'debt_manageability', 'emergency_fund_access')
    search_fields = ('user__username', 'user__email')
    raw_id_fields = ('user',)

@admin.register(DigitalFinance)
class DigitalFinanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'mobile_money_awareness', 'mobile_money_frequency', 'digital_banking')
    search_fields = ('user__username', 'user__email')
    raw_id_fields = ('user',)