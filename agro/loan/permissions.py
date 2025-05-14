# loans/permissions.py
from rest_framework import permissions

class IsLender(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == 'lender'

class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == 'user'
