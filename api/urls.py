from django.urls import path
from api.views import PostAPIView

urlpatterns = [
    path('post/<int:pk>/', PostAPIView.as_view()),
]