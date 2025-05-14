---
sidebar_position: 1
---

# Models
No Django, os models são utilizadas para e representar e organizar os dados da aplicação. Eles são como uma tabela do banco de dados, onde cada classe representa uma tabela, e cada atributo fosse uma coluna. Com as models, é possível definir quais informações serão armazenadas. 

Caminho pra o Models: `back/api/models.py`:


# Import Models
```
from django.db import models
```
Esse import é utilizado para ter acesso às ferramentas que permite criar tabela no banco de dados usando classes Python. 



## Class Cadastro

```jsx title="back/api/models.py"
from django.db import models

class Cadastro(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()
```
A class Cadastro armazena os dados/informações do cadastro do usuário no sistema (aluno/funcionário). 

# Atributos: 

ni (str) = É o número de identificação único de cada usuário. 

nome (str) = Nome do usuário. 

email (str) = Endereço do e-mail do usuário. 

cel (str)= Celular do usuário. 

ocup (float)= Ocupação do usuário. 

## Class Disciplinas

```jsx title="back/api/models.py"
class Disciplinas(models.Model):
    cod = models.CharField(max_length=100)              
    disc = models.CharField(max_length=100)         
    ch = models.IntegerField() 
```
A class Disciplinas armazena informações das disciplinas ofertadas pelo curso. 

# Atributos: 

cod (str) = Código da disciplina. 

disc (str) = Nome da disciplina. 

ch (int) = Carga horaria da disciplina. 


## Class Ambiente

```jsx title="back/api/models.py"
PERIODOS = [
        ('M', 'Manhã'),
        ('T', 'Tarde'),
        ('N', 'Noite'),
        ('I', 'Integral'),
]
class Ambiente(models.Model):
    cod = models.CharField(max_length=255) 
    sala = models.CharField(max_length=255) 
    cap = models.IntegerField()             
    resp = models.CharField(max_length=255)
    per = models.CharField(choices=PERIODOS, max_length=10, default="M") 
```
A class Ambiente é o lugar em que a aula irá acontecer.

# Atributos: 

cod (str)= 	Codigo do ambiente. 

sala(str)= Nome ou descrição da sala. 

       cap(int)= Capacidade de alunos. 

      resp (int)= Responsável pela sala. 

      per(str)= Escolha dos períodos, Manhã, Tarde, Noite e Integral. 

## Class Turma

```jsx title="back/api/models.py"
class Turma(models.Model):
    cod = models.CharField(max_length=255)      
    turrma = models.CharField(max_length=255) 
```
A class Turma representa uma turma específica. 

# Atributos:

cod(str) = Código da turma. 

turrma(str)= Nome ou identificação da turma. 

 ## Class Curso

```jsx title="back/api/models.py"
TIPOS = [
    ('CAI', 'Aprendizagem'),
    ('CT','Técnico'),
    ('CS','Superior'),
    ('FIC','Formação')
]
class Curso(models.Model):
    cod = models.CharField(max_length=255)      
    curso = models.CharField(max_length=255)   
    tipo = models.CharField(max_length=20, choices=TIPOS, default="CT")
    ha =  models.CharField(max_length=255)      
```

A class Curso armazena informações dos cursos fornecidos, como o seu código, o nome, o seu tipo e a sua carga horária. 

# Atributos:

cod(str): Código do curso. 

curso(str): Nome do curso. 

tipo(str): Escolha do tipo de curso, como ‘CAI’:Aprendizagem, ‘CT’:Técnico, ‘CS’:Superior e ‘FIC’:Formação. 

ha(str): A carga horária do curso em horas de aula. 

 

 

 

 