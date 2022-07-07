from django.shortcuts import render
from .models import Frase, Element, Syllabe
from django.shortcuts import redirect
from django.core import serializers

def home(request):
    # all_words = serializers.serialize("json", Palabra.objects.all())
    # all_silabas = serializers.serialize("json", Silaba.objects.all())
    all_frases = serializers.serialize("json", Frase.objects.all())
    all_elements = serializers.serialize("json", Element.objects.all())
    all_syllabes = serializers.serialize("json", Syllabe.objects.all())
    frases = Frase.objects.all()

    return render(request, 'syllableGame/home.html', {'all_syllabes': all_syllabes, 'all_frases': all_frases,  'all_elements':  all_elements, 'frases': frases})