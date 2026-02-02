from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.middleware.csrf import get_token
import json
from .models import Order

def index(request):
    """Главная страница"""
    return render(request, 'orders/index.html')


@require_http_methods(["POST"])
def create_order_api(request):
    """API для создания заказа"""
    try:
        data = json.loads(request.body)
        
        order = Order.objects.create(
            client_name=data.get('name', ''),
            client_phone=data.get('phone', ''),
            point_a=data.get('point_a', ''),
            point_b=data.get('point_b', ''),
            comment=data.get('comment', ''),
        )
        
        return JsonResponse({
            'status': 'success',
            'order_id': order.id,
            'message': 'Заявка успешно принята'
        })
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=400)