from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'role', 'email','is_staff','is_active','is_superuser']

admin.site.register(CustomUser,CustomUserAdmin)
admin.site.register(Restaurant)
admin.site.register(PresonalInformation)
admin.site.register(StaffMember) 


