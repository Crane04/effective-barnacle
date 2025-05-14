from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import (
    Demographics,
    Household,
    Employment,
    FinancialBehavior,
    FinancialHealth,
    DigitalFinance
)

User = get_user_model()

@receiver(post_save, sender=User)
def create_financial_profiles(sender, instance, created, **kwargs):
    if created:
        Demographics.objects.create(user=instance)
        Household.objects.create(user=instance)
        Employment.objects.create(user=instance)
        FinancialBehavior.objects.create(user=instance)
        FinancialHealth.objects.create(user=instance)
        DigitalFinance.objects.create(user=instance)