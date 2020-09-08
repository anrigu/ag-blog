from rest_framework import serializers
from .models import Post, Profile
from rest_auth.registration.serializers import RegisterSerializer


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'username', 'first_name', 'last_name')
        model = Profile


class PostOutSerializer(serializers.ModelSerializer):
    author = ProfileSerializer()

    class Meta:
        fields = ('id', 'author', 'title', 'body',
                  'created_at', 'category','blurb',)
        model = Post


class PostInSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'body', 'created_at', 'category','blurb',)
        model = Post


class CreateRegistration(RegisterSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    grade = serializers.IntegerField()

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name')
        data_dict['last_name'] = self.validated_data.get('last_name')
        data_dict['grade'] = self.validated_data.get('grade', None)
        return data_dict

    def validate_first_name(self, first_name):
        if len(first_name) < 1:
            raise serializers.ValidationError("First name is too short.")
        return first_name

    def validate_last_name(self, last_name):
        if len(last_name) < 1:
            raise serializers.ValidationError("Last name is too short.")
        return last_name
