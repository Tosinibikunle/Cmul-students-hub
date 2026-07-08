from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Student, Course, Enrollment
from .serializers import (
    StudentSerializer, CourseSerializer, EnrollmentSerializer, 
    EnrollmentCreateSerializer
)


class StudentViewSet(viewsets.ModelViewSet):
    """ViewSet for Student model."""
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['level', 'department']
    search_fields = ['user__first_name', 'user__last_name', 'student_id']
    ordering_fields = ['date_joined', 'level']
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user's student profile."""
        try:
            student = Student.objects.get(user=request.user)
            serializer = self.get_serializer(student)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response(
                {'detail': 'Student profile not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=True, methods=['get'])
    def enrollments(self, request, pk=None):
        """Get all enrollments for a student."""
        student = self.get_object()
        enrollments = student.enrollments.all()
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)


class CourseViewSet(viewsets.ModelViewSet):
    """ViewSet for Course model."""
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['level']
    search_fields = ['code', 'title']
    ordering_fields = ['code', 'level']


class EnrollmentViewSet(viewsets.ModelViewSet):
    """ViewSet for Enrollment model."""
    queryset = Enrollment.objects.all()
    permission_classes = [IsAuthenticated]
    filterset_fields = ['student', 'course', 'semester']
    ordering_fields = ['enrolled_at']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return EnrollmentCreateSerializer
        return EnrollmentSerializer
