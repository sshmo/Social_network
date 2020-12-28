from django.shortcuts import render

from rest_framework import generics
from network.models import Post
from api.serializers import PostSerializer

from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view


class PostAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
