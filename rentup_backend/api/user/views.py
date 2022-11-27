from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from api.utils import send_forget_password_mail
import uuid

# Create your views here.


class OwnProfilePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj == request.user


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_superuser=False)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve' or self.action == 'create' or self.action == 'forget_password' or self.action == 'change_password':
            return [permissions.AllowAny()]

        return [permissions.IsAuthenticated(), OwnProfilePermission()]

    @action(methods=['get'], detail=False, url_path="get_current_user", permission_classes=[permissions.IsAuthenticated])
    def get_current_user(self, request):
        if request.user != None:
            return Response(self.serializer_class(request.user, context={"request": request}).data,
                            status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data="Token is expried")

    @action(methods=['patch'], detail=False, url_path="forget_password")
    def forget_password(self, request):
        forget_password_data = request.data

        try:
            user = User.objects.get(email=forget_password_data['email'])
            token = str(uuid.uuid4())
            user.forgetPasswordToken = token
            user.save()
            send_forget_password_mail(user.email, token)
            return Response(status=status.HTTP_200_OK, data="Email has been sent to your email!")
        except User.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="Cant find user with this email!")

    @action(methods=['patch'], detail=True, url_path="change_password")
    def change_password(self, request, pk):
        token = pk
        change_password_data = request.data

        try:
            user = User.objects.get(forgetPasswordToken=token)
            user.set_password(change_password_data['new_password'])
            user.forgetPasswordToken = None
            user.save()
            return Response(status=status.HTTP_200_OK, data="Your account password has been updated!")
        except User.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="Cant find user with this token!")
