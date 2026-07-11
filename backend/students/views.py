from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Student.objects.all().order_by('-created_at')

    @action(detail=False, methods=['get'])
    def me(self, request):
        try:
            student = Student.objects.get(user=request.user)
            serializer = self.get_serializer(student)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({'error': 'Student profile not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def set_active(self, request, pk=None):
        student = self.get_object()
        return Response({'status': 'student set as active'})
