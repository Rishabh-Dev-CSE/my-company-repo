# from django.db import models
# from django.db.models.signals import post_save, post_delete
# from django.dispatch import receiver
# from . models import *

# @receiver(post_save, sender=CustomUser)
# def create_staff_member(sender, instance, created, **kwargs):
#     if created and instance.role == 'staff':
#         print(f"👀 Creating staff member for {instance.username}...")

#         try:
#             # find restaurant by restaurant_id (string in user model)
#             restaurant = Restaurant.objects.get(restaurant_id=instance.restaurant)
#         except Restaurant.DoesNotExist:
#             print(f"⚠️ Restaurant not found for user: {instance.username}")
#             return

#         # now create staff record
#         StaffMember.objects.create(
#             user=instance,
#             restaurant=restaurant
#         )

#         print(f"✅ StaffMember created for {instance.username} under {restaurant.restaurant_name}")
   
