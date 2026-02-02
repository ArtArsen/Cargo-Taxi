from django.db import models

class Driver(models.Model):
    name = models.CharField('Имя', max_length=100)
    phone = models.CharField('Телефон', max_length=20)
    car_type = models.CharField(
        'Тип машины',
        max_length=20,
        choices=[
            ('porter', 'Hyundai Porter'),
            ('gazel', 'Газель'),
            ('labo', 'Labo'),
            ('bort', 'Бортовая'),
        ]
    )
    is_active = models.BooleanField('Активен', default=True)

    class Meta:
        verbose_name = 'Водитель'
        verbose_name_plural = 'Водители'

    def __str__(self):
        return self.name


class Order(models.Model):
    client_name = models.CharField('Имя клиента', max_length=100)
    client_phone = models.CharField('Телефон', max_length=20)

    point_a = models.CharField('Откуда', max_length=200)
    point_b = models.CharField('Куда', max_length=200)

    comment = models.TextField('Комментарий', blank=True)

    total_price = models.IntegerField('Общая стоимость', null=True, blank=True)
    service_fee = models.IntegerField('Наша комиссия', null=True, blank=True)

    driver = models.ForeignKey(
        Driver,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Водитель'
    )

    status = models.CharField(
        'Статус',
        max_length=20,
        choices=[
            ('new', 'Новая'),
            ('assigned', 'Назначен водитель'),
            ('done', 'Завершена'),
            ('cancelled', 'Отменена'),
        ],
        default='new'
    )

    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']

    def __str__(self):
        return f"Заказ #{self.id} - {self.client_name}"