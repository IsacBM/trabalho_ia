from django.urls import path
from api.views import analisar_olho, painel_zoiudo
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('', painel_zoiudo, name='painel'),
    path('api/diagnostico/', analisar_olho, name='diagnostico'),
]

urlpatterns += staticfiles_urlpatterns()