
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import LoanApplication
from .serializers import LoanApplicationSerializer, LoanReviewSerializer
from .permissions import IsLender, IsUser

# User: Create loan application, view their own applications
class UserLoanApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated, IsUser]

    def get_queryset(self):
        return LoanApplication.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        credit_score = self.request.user.credit_score if hasattr(self.request.user, 'credit_score') else None
        serializer.save(user=self.request.user, credit_score=credit_score)

# Lender: View all loan applications
class LenderLoanListView(generics.ListAPIView):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated, IsLender]

# Lender: Approve or reject a loan
class LoanReviewView(generics.UpdateAPIView):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanReviewSerializer
    permission_classes = [IsAuthenticated, IsLender]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        instance.status = serializer.validated_data['status']
        instance.reviewed_by = request.user
        instance.reviewed_at = timezone.now()
        instance.save()
        return Response({'status': instance.status}, status=status.HTTP_200_OK)
