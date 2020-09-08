from rest_framework import generics, status
from .models import Post, Profile
from .serializers import PostInSerializer, PostOutSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

# from posts.serializers import CreateRegistration, ReadProfileSerializer


class PostList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Post.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PostInSerializer
        return PostOutSerializer

    def create(self, request, *args, **kwargs):
        serializer = PostInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = Post()
        post.title = serializer.validated_data.get('title')
        post.body = serializer.validated_data.get('body')
        post.category = serializer.validated_data.get('category')
        post.author = Profile.objects.get(pk=self.request.user.pk)
        post.save()
        serializer = PostOutSerializer(post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def filter_queryset(self, queryset):
        category = self.request.query_params.get('category')
        ret = queryset
        if category:
            ret = queryset.filter(
                category=category)
        return ret


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=(IsAuthorOrReadOnly,)
    queryset=Post.objects.all()
    serializer_class=PostOutSerializer


# class ProfileDetail(RetrieveUpdateAPIView):
#     permission_classes = IsAdminUser
#     queryset = Profile.objects.all()
#     # .select_related("user_tags")
#     serializer_class = CreateRegistration

#     def update(self, request, *args, **kwargs):
#         super().update(request, *args, **kwargs)
#         print(self.get_object())
#         return Response(ReadProfileSerializer(self.get_object()).data)
