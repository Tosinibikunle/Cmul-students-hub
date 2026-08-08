"""
URL configuration for cmul_students_hub project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth.urls')),
    path('api/students/', include('students.urls')),
    path('api/courses/', include('courses.urls')),
]
