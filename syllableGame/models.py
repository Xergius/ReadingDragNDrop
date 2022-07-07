from turtle import position
from django.db import models
from django.forms import ChoiceField, ValidationError


def restrict_amount(value):
    if Element.objects.filter(frase_id=value).count() >= 5:
        raise ValidationError('Frase already has maximum amount of elements')

# --------FRASES----------
class Frase(models.Model):
    name = models.CharField(max_length=29)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    img_address = models.CharField(max_length=200, null=True, blank=True)
    
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name 

class Syllabe(models.Model):
    syllabe_name = models.CharField(max_length=5, unique=True)
    
    
    class Meta:
        ordering = ['syllabe_name']

    def __str__(self) -> str:
        return self.syllabe_name

class Element(models.Model):
    position = models.CharField(max_length=2, blank=True, null=True, choices=[('1','1'),('2','2'),('3','3'),('4','4'),('5','5'),('6','6'),('7','7'),('8','8'),('9','9'),('10','10')])
    frase = models.ForeignKey(Frase, on_delete=models.CASCADE, validators=(restrict_amount, ))
    syllabe = models.ForeignKey(Syllabe, on_delete=models.CASCADE)
    def __str__(self) -> str:
        return self.frase.name + " | posicion: " + self.position + " | " +self.syllabe.syllabe_name
    class Meta:
        ordering = ['frase','position']        

