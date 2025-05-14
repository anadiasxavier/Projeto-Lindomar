---
sidebar_position: 2
---

# Serializers


# Para que serve o Serializer?

Os Serializers servem para converter dados complexos (como objetos, dados de um banco) em formatos simples (como JSON) e vice-versa. Ele é muito usado em APIs para enviar e receber dados de forma organizada e validada. 

# Em geral, o que este codigo faz?

Esse código cria serializers para cada uma de suas models (Cadastro, Disciplinas, Ambiente, Turma e Curso). Esses serializers são responsáveis por: 

 

 - Transformar os dados dos models em formatos como JSON, para que possam ser enviados por uma API. 

 

 - Validar e transformar dados recebidos pela API em objetos do banco de dados, garantindo que a entrada esteja correta antes de salvar. 

 
 # O que a class Meta faz? 
 A class Meta é uma classe interna usada nos serializers (e nos models e forms) para configurar o comportamento da classe principal. 

No caso dos serializers, ela é usada para dizer: 

 - Qual model o serializer vai representar (model = Cadastro) 

 - Quais campos devem ser incluídos (fields = __all_ ou uma lista) 


# Import Serializer

```
from rest_framework import serializers
from .models import *
```
Importa o módulo serializers do Django REST Framework. 
Importa todos os models definidos no seu arquivo models.py. 

# Class CadastroSerializer
```
class CadastroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadastro
        fields = '__all__'
```
Esse class serializa todos os campos do model Cadastro. 

# Class DisciplinaSerializer
```
class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplinas
        fields = '__all__'
```
Esse class serializa todos os campos do model Disciplina. 

# Class AmbienteSerializer
```
class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'
```

Esse class serializa todos os campos do model Ambiente. 


# Class TurmaSerializer
```
class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = '__all__'
```
Esse class serializa todos os campos do model Turma. 

# Class CursoSerializer
```
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
```

Esse class serializa todos os campos do model Curso. 

