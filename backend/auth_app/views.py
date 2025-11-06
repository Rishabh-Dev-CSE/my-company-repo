from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
User = get_user_model()

# ✅ Test endpoint
@api_view(['GET'])
def getData(request):
    return Response({'name': 'React + Django Connected!', 'status': 'success'})

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


# ✅ Signup
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role')
    email = request.data.get('email')

    print(username,password,role,email)

    if not all([username,password,role,email]):
        return Response({'error':'field value missig '}, status=status.HTTP_400_BAD_REQUEST)
    
    if role == "owner":
        try:
            if User.objects.filter(username=username).exists():
                return Response({"message":"user already exist"}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=email).exists():
                return Response({"message":"user already exist"}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(username=username,password=password, email=email, role=role)
            user.save()
            if user:
                return Response({"message":f"user {user.username} successfully created!"}, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            print(f'{e}')
            return Response({'error':"Internal problem "}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   
    else:
        try:
            authenticated = request.user.is_authenticated
            member_name =username
            if not authenticated:
                return Response({'error':'Only logged in owner can add staff (create owner account first)!'}, status=status.HTTP_400_BAD_REQUEST)
            
            if authenticated:
                user_id = request.user.id
                print(user_id)
                restaurant = Restaurant.objects.filter(user=request.user ).first()
                if not restaurant:
                    return Response({'error':'create your restaurant (get id) after that you can add staff member'}, status=status.HTTP_404_NOT_FOUND)
                
                if User.objects.filter(username=username).exists():
                    return Response({"message":"user already exist"}, status=status.HTTP_400_BAD_REQUEST)
                if User.objects.filter(email=email).exists():
                    return Response({"message":"user already exist"}, status=status.HTTP_400_BAD_REQUEST)
                
                user_as_staff = User.objects.create_user(username=username,password=password, email=email, role=role)
                user_as_staff.save()
     
                staff = StaffMember.objects.create(owner = restaurant.user , restaurant = restaurant,member_name=member_name, member_id = user_as_staff)
                staff.save()

                return Response({'message': f'Staff account can be created for {restaurant.restaurant_name}'}, status=status.HTTP_200_OK)
            
            else:
                print(f'else {request.user}')
                return Response({'error': 'Unexpected authentication state'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            user_as_staff.delete()
            print(f"{e}")
            return Response({'error': "internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
