from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Student
        fields = ['id', 'user', 'user_id', 'student_id', 'phone', 'address', 'date_of_birth', 'profile_picture', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist")
        
        student = Student.objects.create(user=user, **validated_data)
        return student
