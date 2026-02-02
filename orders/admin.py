from django.contrib import admin
from .models import Order, Driver

@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'car_type', 'is_active')
    list_filter = ('car_type', 'is_active')
    search_fields = ('name', 'phone')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'client_name',
        'client_phone',
        'status',
        'driver',
        'total_price',
        'service_fee',
        'created_at',
    )
    list_filter = ('status',)
    search_fields = ('client_name', 'client_phone')
