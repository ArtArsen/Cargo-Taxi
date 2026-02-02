from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    path('', views.index, name='index'),
    path('api/create-order/', views.create_order_api, name='create_order'),
]