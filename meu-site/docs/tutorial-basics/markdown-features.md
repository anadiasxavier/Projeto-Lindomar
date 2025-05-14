---
sidebar_position: 4
---

# Views

Views é a parte de codificação do projeto que comanda a lógica e funções da página, é aqui que declaramos as funções da página e suas limitações como Token de acesso e CRUD. 

## Importação das bibliotecas



```text title="my-doc.md"


from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
```

## importações

```
from django.shortcuts import render
```
O **Shortcuts** é uma coleção de funções auxiliares enquanto o render combina um template com um dicionário de contexto e retorna HttpResponse renderizado. 


```
from .models import *
```
Importa **todas as clases do models.py** que é nosso modelo do banco de dados 


```
from .serializer import *
```
Irá importar **tudo que há no serializer.py** que é responsável pela transformação em JSON 


```
from rest_framework.response import Response
```
Aqui importamos a biblioteca Rest Framework do Django no módulo rest_framework.response a classe Response que é fundamental para construir respostas HTTP. 


```
from rest_framework.decorators import api_view, permission_classes
```
Importa os **dois decoradores específicos** do módulo rest_framework.decorators da biblioteca Django REST Framework que são usados para configurar as views de API de forma declarativa. 


```
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
```
Essa biblioteca é poderosa para criação de APIs REST em projetos Django, suas classes representam: 
ListCreateAPIView:  

 - É a “junção” do GET ListAPIView com o POST CreateAPIView. 
 - Sendo assim é responsável por listar todos os usuários e criar um novo. 


```
From rest_framework import status 
```
É usada para acessar códigos de status HTTP sem a necessidade de números “mágicos”, ele já fornece estruturas para os Status HTTP de forma simplificada. 


```
From rest_framework.permissions import IsAuthenticated, AllowAny 
```
Nesta importação há duas classes de permissão do módulo rest_framework.permissions. 
 - IsAuthenticated: 

    - É uma classe que permite a verificação de autenticação do usuário, garantindo que ele esteja autenticado para ter acesso ao recurso. 

 - AllowAny: 

    - Essa classe concede a permissão de acesso a todos os usuários independentemente de sua autenticação. 


```
 From rest_framework.filters import SearchFilter 
```
Importa uma classe do módulo rest_framework.filters da biblioteca Django REST Framework. 

 - SearchFilter:

    -   É uma classe de filtro que permite a adição de funcionalidades de pesquisa em sua API REST, permitindo que usuários filtrem a lista de resultados com base em um ou mais campos específicos. 


```
From django_filters.rest_framework import DjangoFilterBackend 
```
Neste bloco é importada a classe DjangoFilterBackend do módulo django_filters.rest_framework. 
 - DjangoFilterBackend: 

    - Integra a biblioteca django-filter que permite a criação de filtros complexos baseados nos campos dos seus modelos Django ao Django REST Framework que permite que esses filtros sejam acessíveis através de parâmetros de consulta na sua API REST. 



## Funções dos códigos das Views
```
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Cadastro.objects.all()
        serializer = CadastroSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CadastroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
```
Este código define uma view de função chamada “listar_professores” com a qual responde aos métodos HTTP especificados dentro da lista, neste caso essa função pode receber requisições HTTP do tipo GET para listar os professores e POST para “Criar um novo professor”, ela possui a classe IsAuthenticated do módulo rest_framework.permissions, o método status do rest_framework e Response do módulo rest_framework.response. Essa view é lincada com a url ‘professores’. 

 ```
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def buscar_nome_professor(request):
    termo = request.get('nome', '')
    if termo:
        professores = Cadastro.objects.filter(nome_incontains = termo)
    else:
        professores = Cadastro.objects.all()
    
    serializer = CadastroSerializer(professores, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
 ```

Este código define uma view que transforma a função buscar_nome_professor em uma API que corresponde aos métodos HTTP GET e POST, embora ambos estejam declarados a lógica da função utiliza principalmente o método GET para a busca de professores por nome. Utiliza o permission_classes também para a autorizão de acesso apenas para usuários autenticados, também utiliza o request.GET que contém todos osparâmetros passados na URL da requisição GET e neste caso pega os valores da da chave ‘nome’ e se ela não estiver presente nos parâmetros da URL ela retorna uma STR vazia. Nesta classe utilizamos o From rest_framework.filters import SearchFilter que retorna todos os Cadastros que atendem à condição específica. 

## Class ProfessoresView
```
class ProfessoresView(ListCreateAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]
```
Esta view irá listar todos os professores cadastrados e criar novos professores.  

Utiliza o queryset para buscar os registros do modelo Cadastro, o serializer_class converte os objetos Cadastro em JSON, e o permission_classes para apenas usuários autenticados acessarem as views tanto para listar quanto para criar. 

## Class ProfessoresDetailView
```
class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]

```
Esta view permite a visualização dos detalhes de um professor específico a atualização e a exclusão. 

Utiliza o queryset para acessar todos os registros do modelo Cadastro, o serializer_class para representação, atualização e leitura dos dados do professor e o permission classe para apenas usuários autenticados terem acesso as funcionalidades do sistema. 


## Class ProfessoresSearchView
```
class ProfessoresSearchView(ListAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['nome']
```
Esta view permite a listagem de professores e funcionalidades de busca por nome. Utiliza o queryset para buscar todos os registros de professores, o serializer_class utiliza o mesmo serializer para a representação dos resultados de busca o permission_classes para apenas usuários autenticados terem acesso a visualização e busca, o filter_backends para habilitar a filtragem genérica e busca por texto, e o search_fields que especifica que a busca realizada será feita no campo nome do modelo Cadastro. 

## Class DisciplinasView
```
class DisciplinasView(ListCreateAPIView):
    queryset = Disciplinas.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]
```
Essa view permite listar as disciplinas e criar novas. Utiliza o queryset para acessar todos os registros do modelo Disciplinas, o serializer_class que utiliza o DisciplinaSerializer e o permission classes como dito anteriormente. 

## Class DisciplinaDetailView
```
class DisciplinaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Disciplinas.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]
```
Essa view permite a visualização, atualização e exclusão de uma disciplina específica, o queryset para acessar o modelo Disciplinas, o serializer_class para utilizar o DisciplinaSerializer e o permission_classes. 

## Class AmbientesView
```
class AmbientesView(ListCreateAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]
```
Essa view permite a listagem das salas de aula, laboratórios e criação de novos locais, o queryset para acessar o modelo Ambiente, o serializer_class para utilizar o AmbienteSerializer e o permission_classes. 

## Class AmbienteDetailView
```
class AmbienteDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]
```
Essa view permite a visualização, atualização e exclusão de um local específico e os modelos são iguais ao citado acima no AmbientesView. 


## Class CursosView
```
class CursosView(ListCreateAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]
```
Essa view permite a listagem de todos os cursos e criação de novos cursos, o queryset acessa o modelo Curso, o serializer_class utiliza o CursoSerializer e o permission_classes. 

## Class CursoDetailView
```
class CursoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]
```
Essa view permite a visualização, atualização e exclusão de um curso e utiliza os mesmos modelos de CursosView. 

## Class TurmasView
```
class TurmasView(ListCreateAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    permission_classes = [IsAuthenticated]
```
Essa view permite a listagem de todas as turmas e criação de novas. 

Utiliza o queryset para acessar o modelo Turma, o serializer_class que utiliza o TurmaSerializer e o permission_classes. 

## Class TurmaDetailView
```

class TurmaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    permission_classes = [IsAuthenticated]
```
Essa view permite a visualização, atualização e exclusão de uma turma em específico. Utiliza os mesmos modelos de TurmasView. 
=======
## Funções dos codigos das Views







Regular Markdown links are supported, using url paths or relative file paths.

```md
Let's see how to [Create a page](/create-a-page).
```

```md
Let's see how to [Create a page](./create-a-page.md).
```

**Result:** Let's see how to [Create a page](./create-a-page.md).

## Images

Regular Markdown images are supported.

You can use absolute paths to reference images in the static directory (`static/img/docusaurus.png`):

```md
![Docusaurus logo](/img/docusaurus.png)
```

![Docusaurus logo](/img/docusaurus.png)

You can reference images relative to the current file as well. This is particularly useful to colocate images close to the Markdown files using them:

```md
![Docusaurus logo](./img/docusaurus.png)
```

## Code Blocks

Markdown code blocks are supported with Syntax highlighting.

````md
```jsx title="src/components/HelloDocusaurus.js"
function HelloDocusaurus() {
  return <h1>Hello, Docusaurus!</h1>;
}
```
````

```jsx title="src/components/HelloDocusaurus.js"
function HelloDocusaurus() {
  return <h1>Hello, Docusaurus!</h1>;
}
```

## Admonitions

Docusaurus has a special syntax to create admonitions and callouts:

```md
:::tip My tip

Use this awesome feature option

:::

:::danger Take care

This action is dangerous

:::
```

:::tip My tip

Use this awesome feature option

:::

:::danger Take care

This action is dangerous

:::

## MDX and React Components

[MDX](https://mdxjs.com/) can make your documentation more **interactive** and allows using any **React components inside Markdown**:

```jsx
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`)
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !
```

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`);
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !
>>>>>>> 531df0b34eef58e73f5c5fa86ef22cd20536b2fa
