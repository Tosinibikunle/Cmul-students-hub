from django.contrib import admin
from .models import Student, Course, Enrollment


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'user', 'level', 'department', 'date_joined']
    list_filter = ['level', 'department', 'date_joined']
    search_fields = ['user__first_name', 'user__last_name', 'student_id']
    readonly_fields = ['date_joined', 'updated_at']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['code', 'title', 'credits', 'level']
    list_filter = ['level', 'credits']
    search_fields = ['code', 'title']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'course', 'semester', 'grade']
    list_filter = ['semester', 'grade']
    search_fields = ['student__student_id', 'course__code']
