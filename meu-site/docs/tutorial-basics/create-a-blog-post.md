---
sidebar_position: 3
---

# URLS

Um arquivo que é responsável por mapear as URLs para suas respectivas funções ou classes do arquivo Views, estabelecendo uma conexão entre a interface do usuário e as URLs que o usuário pode acessar. Os caminhos URLs precisam fazer sentido com as funções indexadas, isso permite que o sistema saiba como responder às solicitações HTTP feitas pelo usuário. 

Caminho pra a URLS: `back/api/urls.py`:

## URLS do Projeto

```jsx title="back/api/urls.py"
from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('id/<int:pk>', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('buscar/nome/', buscar_nome_professor),
    path('search/', ProfessoresSearchView.as_view()),
    
    path('disciplinas', DisciplinasView.as_view()),
    path('disciplina/<int:pk>', DisciplinaDetailView.as_view()),

    path('ambientes', AmbientesView.as_view()),
    path('ambiente/<int:pk>', AmbienteDetailView.as_view()),

    path('turmas', TurmasView.as_view()),
    path('turma/<int:pk>', TurmaDetailView.as_view()),

    path('cursos', CursosView.as_view()),
    path('curso/<int:pk>', CursoDetailView.as_view()),

]
```
## Imports

```jsx title="back/api/urls.py"
from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

```

Os imports tem como conceito principal transportar módulos de certas bibliotecas. Isso permite que um código de uma biblioteca seja usado na sua aplicação atual.

```jsx title="back/api/urls.py"
from django.urls import path

```
Esse import vem da biblioteca do django que manipula as URL’s. O import é do método path, este método manipula os caminhos declarados separando cada função como pequenos pacotes. 

```jsx title="back/api/urls.py"
from .views import *

```
O import que puxa todas as classes do arquivo views. O arquivo views irá manipular as funções da nossa API. 


```jsx title="back/api/urls.py"
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

```
Nesse código o import  está importando duas views da biblioteca djangorestframework-simplejwt que manipula os tokens e as verificações dos usuários. 


# As URL’s 

# URL listar_professores
```jsx title="http://127.0.0.1:8000/api/professores "
path('professores', listar_professores),
```

Passando essa url na área Search com o Token correto a resposta será todos os professores cadastrados dentro do banco de dados. 

```
[ 

    { 

        "id": 1, 

        "ni": "1021328", 

        "nome": "Lindomar José", 

        "email": "lin@lin.com", 

        "cel": "23132132123", 

        "ocup": 50 

    }, 

    { 

        "id": 5, 

        "ni": "5857", 

        "nome": "Miguel da Silva", 

        "email": "skldsk@sakdls.com", 

        "cel": "13212", 

        "ocup": 1 

    }, 

]  
```

# URL ProfessoresView
```jsx title="http://127.0.0.1:8000/api/prof  "
 path('prof', ProfessoresView.as_view()),
```

Da mesma forma que a Url anterior, a resposta será todos os professores cadastrados, é importante frisar a necessidade de passar o Token de acesso. 

# URL ProfessoresDetailView
```jsx title="http://127.0.0.1:8000/api/id/1   "
 path('id/<int:pk>', ProfessoresDetailView.as_view()),
```
Está url deixa possível a busca por id dentro do banco de dados.  

# URL TokenObtainPairView
```jsx title="http://127.0.0.1:8000/api/token/   "
 path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
```
Com está url existe a necessidade de ser passado o nome de usuário e a senha. 

```{ 

    "username": "lin", 

    "password": "123" 

} 
```

Para ser possível o receber do token de acesso e refresh. 

```
{ 

    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTQ5MTEzNCwiaWF0IjoxNzQ1NDA0NzM0LCJqdGkiOiI0NjVjZDA2NDViMGU0M2E5YjM1NDdiZDQ2MGVhOGU1MCIsInVzZXJfaWQiOjF9.NideIUU-XrHacNCzrI02XXnB5tpw24u0bIMn9S41BqI", 

    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NDA4MzM0LCJpYXQiOjE3NDU0MDQ3MzQsImp0aSI6IjhjYmY5OGFkNzNjMDRiYzFiZWQ5Y2UxYzkyODQ2ZTE1IiwidXNlcl9pZCI6MX0.u8w4XN8QIzl_Gsm1R-47UbzXOJyXz8TMMz65OikXA4I" 

} 
```
# URL TokenRefreshView
```jsx title="http://127.0.0.1:8000/api/refresh/   "
  path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
```

```
{ 

    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTQ5MTEzNCwiaWF0IjoxNzQ1NDA0NzM0LCJqdGkiOiI0NjVjZDA2NDViMGU0M2E5YjM1NDdiZDQ2MGVhOGU1MCIsInVzZXJfaWQiOjF9.NideIUU-XrHacNCzrI02XXnB5tpw24u0bIMn9S41BqI" 

} 
```

Passando a chave de refresh teremos como resposta o token de acesso 

```
{ 

    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NDA5NjM3LCJpYXQiOjE3NDU0MDQ3MzQsImp0aSI6IjE2YTFhNzkyMDE4YjQ0ZTU4YTg4Zjc0YjY3NTI3ODRjIiwidXNlcl9pZCI6MX0.Je1e3G7Z-jurM-vyzOTzlKgBh5wJA1OOV1_TL6lDsuA" 

}  
```
# URL buscar_nome_professor
```jsx title="http://127.0.0.1:8000/api/ buscar/nome/    "
path('buscar/nome/', buscar_nome_professor),
```

Nesta url você deixa possível a busca por nome específico, lembrando que esses nomes têm que estar dentro do banco de dados. 

# URL ProfessoresSearchView
```jsx title="http://127.0.0.1:8000/api/search/    "
 path('search/', ProfessoresSearchView.as_view()),
```
A url traz a capacidade de ser provável a área seach no website, fazendo possível a pesquisa de usuário. 

# URL DisciplinasView & DisciplinaDetailView
```jsx title="http://127.0.0.1:8000/api/disciplinas   "
  
    path('disciplinas', DisciplinasView.as_view()),
    path('disciplina/<int:pk>', DisciplinaDetailView.as_view()),
```
Logo acima temos duas url’s que são bem parecidas, nestas url’s faz com que o backend manipule a classe disciplinas dentro do models. 

 A url é método read da tabela disciplinas. Ou seja, passando o seu token de acesso a resposta será todas as disciplinas salvas no banco. 

```
[ 

    { 

        "id": 2, 

        "cod": "12", 

        "disc": "PWBE", 

        "ch": 123 

    }, 

    { 

        "id": 3, 

        "cod": "32", 

        "disc": "PWFE", 

        "ch": 21 

    }, 

    { 

        "id": 4, 

        "cod": "54", 

        "disc": "LOP", 

        "ch": 31 

    } 

] 
```

```
http://127.0.0.1:8000/api/disciplina/5 
```
Está url direciona, para view DisciplinaDetailView que realiza diversas funções dentro da manipulação do banco de dados. 

# URL AmbientesView & AmbienteDetailView
```
 path('ambientes', AmbientesView.as_view()),
    path('ambiente/<int:pk>', AmbienteDetailView.as_view()),
```

Essas url’s funcionam de maneira idêntica do conjunto de url’s que manipulam a classe de disciplinas, isto é manipulam a classe de ‘ambientes’ dentro do banco de dados.

```
http://127.0.0.1:8000/api/ambientes 
```
Método read da tabela de ambiente. 

```
http://127.0.0.1:8000/api/ambiente/3 
```
Direciona para view ‘AmbienteDetailView’ que manipula de diversas maneiras diferentes a tabela ambiente. 

# URL TurmasView & TurmaDetailView
```
path('turmas', TurmasView.as_view()),
path('turma/<int:pk>', TurmaDetailView.as_view()),
```
Essas url’s funcionam de maneira idêntica do conjunto de url’s que manipulam a classe de disciplinas, isto é manipulam a classe de ‘turmas’ dentro do banco de dados. 

```
http://127.0.0.1:8000/api/turmas 
```
Método read da tabela de turmas. 

```
http://127.0.0.1:8000/api/turma/1 
```
Direciona para view ‘TurmaDetailView’ que manipula de diversas maneiras diferentes a tabela ambiente. 

# URL CursosView & CursoDetailView
```
path('cursos', CursosView.as_view()),
path('curso/<int:pk>', CursoDetailView.as_view()),
```

Essas url’s funcionam de maneira idêntica do conjunto de url’s que manipulam a classe de disciplinas, isto é manipulam a classe de ‘cursos’ dentro do banco de dados. 

```
http://127.0.0.1:8000/api/cursos
```
Método read da tabela de cursos. 

```
http://127.0.0.1:8000/api/cursos/1 
```
Direciona para view ‘CursoDetailView’ que manipula de diversas maneiras diferentes a tabela ambiente
=======
>>>>>>> 531df0b34eef58e73f5c5fa86ef22cd20536b2fa
