from django.db import models
from django.contrib.auth.models import User


class Student(models.Model):
    """Student model for CMUL."""
    LEVEL_CHOICES = [
        (100, '100 Level'),
        (200, '200 Level'),
        (300, '300 Level'),
        (400, '400 Level'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student')
    student_id = models.CharField(max_length=20, unique=True)
    level = models.IntegerField(choices=LEVEL_CHOICES)
    department = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
    profile_picture = models.ImageField(upload_to='student_profiles/', null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date_joined']
        verbose_name_plural = 'Students'
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.student_id}"


class Course(models.Model):
    """Course model."""
    code = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    credits = models.IntegerField(default=3)
    level = models.IntegerField(choices=Student.LEVEL_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['code']
    
    def __str__(self):
        return f"{self.code} - {self.title}"


class Enrollment(models.Model):
    """Student enrollment in courses."""
    GRADE_CHOICES = [
        ('A', 'A (4.0)'),
        ('B', 'B (3.0)'),
        ('C', 'C (2.0)'),
        ('D', 'D (1.0)'),
        ('F', 'F (0.0)'),
        ('I', 'Incomplete'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    semester = models.CharField(max_length=20)  # e.g., "2024/2025-1"
    grade = models.CharField(max_length=2, choices=GRADE_CHOICES, null=True, blank=True)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('student', 'course', 'semester')
        ordering = ['-enrolled_at']
    
    def __str__(self):
        return f"{self.student} - {self.course}"
