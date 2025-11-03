from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
# from .models import CustomUser as 
User = get_user_model()

# ✅ Test endpoint
@api_view(['GET'])
def getData(request):
    return Response({'name': 'React + Django Connected!', 'status': 'success'})

# ✅ Signup
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role')
    email = request.data.get('email')

    if not all([username, password,role, email]):
        return Response({'error': 'Missing fields'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists'}, status=400)

    # You can add allowed roles check here
    user = User.objects.create_user(username=username,password=password, role=role, email=email)

    return Response(
        {'message': 'User created successfully', 'username': user.username, 'role':role},
        status=201
    )


# ✅ Login
@api_view(['POST'])
def loginUser(request): 
    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role')

    print(request.data)

    user = authenticate(username=username, password=password,role=role)
    if user is not None:

        if hasattr(user, 'role'):
            if user.role.lower() != role.lower():
                return Response({"detail":"Role mismatch!"}, status=400)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({
            'access': access_token,
            'refresh': str(refresh),
            'user': {'username': user.username, 'role': user.role}
        })
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=7*24*3600
        )
        return response
    return Response({'error': 'Invalid credentials'}, status=401)

# ✅ Protected user data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserData(request):
    user = request.user
    return Response({'username': user.username, 'email': user.email, "role":user.role})


# ✅ Token refresh
@api_view(['POST'])
def refresh_token_view(request):
    from rest_framework_simplejwt.tokens import RefreshToken
    refresh_token = request.COOKIES.get('refresh_token')

    if not refresh_token:
        return Response({'error': 'No refresh token found'}, status=401)

    try:
        token = RefreshToken(refresh_token)
        access = str(token.access_token)

        response = Response({'access': access})
        response.set_cookie(
            key='access_token',
            value=access,
            httponly=True,
            secure=False,  # True in production
            samesite='Lax',
            max_age=5 * 60
        )
        return response
    except Exception:
        return Response({'error': 'Invalid refresh token'}, status=401)


# ✅ Logout
@api_view(['POST'])
def logout_view(request):
    response = Response({'message': 'Logged out'}, status=200)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response
