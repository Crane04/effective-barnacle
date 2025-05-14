# utils.py
def get_user_data_for_credit_score(user):
    """
    Collects and validates all required data from user's related models
    Returns either the prepared data or a list of missing fields
    """
    # Define the EXACT order of features expected by your ML model
    required_fields = [
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
    
    data = {}
    missing_fields = []
    
    try:
        # Get all related models
        demographics = user.demographics
        household = user.household
        employment = user.employment
        financial_behavior = user.financial_behavior
        financial_health = user.financial_health
        digital_finance = user.digital_finance
        
        # Map ALL fields in the EXACT order required
        field_mapping = {
            # From Household model
            'household_size': household.household_size,
            'adults_count': household.adults_count,
            'has_unemployed': household.has_unemployed,
            'ownership_status': household.ownership_status,
            'financial_decision_maker': household.financial_decision_maker,
            'house_acquisition': household.house_acquisition,
            'household_assets': household.household_assets,
            
            # From Employment model
            'business_employees': employment.business_employees,
            'monthly_income': employment.monthly_income,
            'avg_amount_received': employment.avg_amount_received,
            'avg_amount_sent': employment.avg_amount_sent,
            'main_income_source': employment.main_income_source,
            'income_sector': employment.income_sector,
            
            # From Demographics model
            'age': demographics.age,
            'marital_status': demographics.marital_status,
            'gender': demographics.gender,
            'has_disability': demographics.has_disability,
            
            # From FinancialBehavior model
            'uses_budget': financial_behavior.uses_budget,
            'financial_tracking': financial_behavior.financial_tracking,
            'goal_actions': financial_behavior.goal_actions,
            'investment_frequency': financial_behavior.investment_frequency,
            'financial_planning': financial_behavior.financial_planning,
            'risk_preference_gain': financial_behavior.risk_preference_gain,
            'risk_preference_loss': financial_behavior.risk_preference_loss,
            'preferred_investments': financial_behavior.preferred_investments,
            
            # From FinancialHealth model
            'cash_shortage_frequency': financial_health.cash_shortage_frequency,
            'emergency_fund_access': financial_health.emergency_fund_access,
            'finhealth': financial_health.finhealth,
            'finneeds': financial_health.finneeds,
            'credit_activities': financial_health.credit_activities,
            'debt_manageability': financial_health.debt_manageability,
            'borrowed_airtime': financial_health.borrowed_airtime,
            
            # From DigitalFinance model
            'system_downtime': digital_finance.system_downtime,
            'digital_banking': digital_finance.digital_banking,
            'mobile_money_awareness': digital_finance.mobile_money_awareness,
            'mobile_money_experience': digital_finance.mobile_money_experience,
            'mobile_money_frequency': digital_finance.mobile_money_frequency,
            'mobile_money_issues': digital_finance.mobile_money_issues,
            'money_transfer_activities': digital_finance.money_transfer_activities,
            'money_send_reason': digital_finance.money_send_reason,
            'utility_bill_payments': digital_finance.utility_bill_payments
        }
        print(field_mapping)
        # Validate each field
        for field in required_fields:
            value = field_mapping.get(field)
            
            # Check if value is None, empty string, or empty list
            if value is None or (isinstance(value, str) and not value.strip()):
                missing_fields.append(field)
            data[field] = value
            
    except Exception as e:
        return None, [f"Profile data incomplete: {str(e)}"]
    
    if missing_fields:
        return None, missing_fields
    
    return data, None