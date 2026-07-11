from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Course.objects.all().order_by('code')

    @action(detail=True, methods=['get'])
    def enrollments(self, request, pk=None):
        course = self.get_object()
        enrollments = course.enrollments.all()
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.all().order_by('-enrolled_at')

    @action(detail=False, methods=['get'])
    def my_enrollments(self, request):
        try:
            from students.models import Student
            student = Student.objects.get(user=request.user)
            enrollments = student.enrollments.all()
            serializer = self.get_serializer(enrollments, many=True)
            return Response(serializer.data)
        except:
            return Response({'error': 'No enrollments found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def update_grade(self, request, pk=None):
        enrollment = self.get_object()
        grade = request.data.get('grade')
        if grade:
            enrollment.grade = grade
            enrollment.save()
            return Response({'status': 'grade updated', 'grade': enrollment.grade})
        return Response({'error': 'Grade not provided'}, status=status.HTTP_400_BAD_REQUEST)
