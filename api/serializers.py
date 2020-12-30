from network.models import User, Post
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id']


class PostSerializer(serializers.ModelSerializer):

    likers = UserSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = ['id', 'poster', 'post', 'post_time', 'likers']

        extra_kwargs = {
            'poster': {
                'required': False,
            },
            'post': {
                'required': False,
            },
        }

    def update(self, instance, validated_data):
        print(validated_data)
        likers = validated_data.pop('likers', [])
        print(likers)
        instance = super().update(instance, validated_data)
        for liker_data in likers:
            print(liker_data.get('id'))
            liker = User.objects.get(pk=liker_data.get('id'))
            instance.likers.add(liker)
        return instance 