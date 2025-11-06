from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None,**extra_fields):
        if not username:
            raise ValueError("The Username field is required")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, role = 'admin',  **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault('role', role)

        if not extra_fields.get("is_staff"):
            raise ValueError("Superuser must have is_staff=True.")
        if not extra_fields.get("is_superuser"):
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password ,**extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=100, blank=True)

    ROLE_CHOICES = [
        ('admin', 'Super Admin'),
        ('owner', 'Restaurant Owner'),
        ('staff', 'Kitchen Staff'),
        ('customer', 'Customer'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    restaurant = models.CharField(max_length=50, default="disabled")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username


class Restaurant(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owned_restaurants')
    restaurant_id = models.CharField(max_length=100, unique=True)
    restaurant_name = models.CharField(max_length=30)
    restaurant_logo = models.ImageField(upload_to='', blank=True)
    restaurant_about = models.TextField(max_length=200)
    restaurant_address = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.restaurant_name} ({self.restaurant_id}) ({self.user})"


class PresonalInformation(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    pancard = models.CharField(max_length=10, unique=True)
    aadhar = models.CharField(unique=True, default="-")
    gst = models.CharField(max_length=15, unique=True, null=True, blank=True)
    food_licanse = models.CharField(max_length=14, null=True, unique=True)

    def __str__(self):
        return f"{self.pancard} {self.restaurant.user}"
    
class StaffMember(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="staff_members")  # owner can have multiple staff
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='staff_members')
    member_id = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="staff_profile", null=True, blank=True)
    member_name = models.CharField(max_length=100, default="")

    def __str__(self):
        return f"{self.member_id} - {self.member_name} - {self.restaurant.restaurant_name} "
