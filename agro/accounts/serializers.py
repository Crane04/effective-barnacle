from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number', 'password', 'user_type', "organization_name"]

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
            phone_number=validated_data.get('phone_number'),
            user_type=validated_data.get('user_type', 'user'),
            organization_name=validated_data.get("organization_name")
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
