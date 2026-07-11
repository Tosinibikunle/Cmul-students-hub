from rest_framework import serializers
from .models import Course, Enrollment
from students.serializers import StudentSerializer

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'code', 'title', 'description', 'level', 'credits', 'instructor', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    course_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'student_id', 'course', 'course_id', 'status', 'grade', 'enrolled_at', 'updated_at']
        read_only_fields = ['id', 'enrolled_at', 'updated_at']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        course_id = validated_data.pop('course_id')
        
        from students.models import Student
        try:
            student = Student.objects.get(id=student_id)
            course = Course.objects.get(id=course_id)
        except (Student.DoesNotExist, Course.DoesNotExist):
            raise serializers.ValidationError("Student or Course does not exist")
        
        enrollment = Enrollment.objects.create(student=student, course=course, **validated_data)
        return enrollment
