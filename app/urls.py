from django.urls import path

from app.backend.live.views import index_view, newsample_view, livesample_view


app_name = 'app'
urlpatterns = [
    path('', index_view, name='live.index'),
    path('newsample/', newsample_view, name='live.newsample'),
    path('livesample/', livesample_view, name='live.livesample'),
]
