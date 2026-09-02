# Inteligência Artificial na Educação

Site estático de apoio para professores: panorama da pesquisa brasileira sobre IA na educação, ferramentas de IA comentadas, canais de atualização (podcasts, newsletters e formação oficial) e bibliografia em padrão ABNT — com materiais em PDF disponíveis para download direto.

Publicado em: **[adicione aqui a URL do GitHub Pages depois do deploy]**

## Estrutura do projeto

```
.
├── index.html                                  # página principal
├── style.css                                    # estilos
├── script.js                                    # menu mobile e animações de entrada
├── material-ia-educacao.pdf                      # guia completo (download)
└── slides_panorama_completo_IA_EDUCACAO.pptx.pdf # slides do panorama (download)
```

Site em HTML/CSS/JS puro — sem build, sem dependências, sem framework. Basta abrir `index.html` no navegador para visualizar localmente.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta (exceto os listados no `.gitignore`) para o branch `main`.
2. No repositório, vá em **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha o branch `main` e a pasta `/ (root)`.
5. Salve. Em alguns minutos o site estará no ar em `https://<seu-usuario>.github.io/<nome-do-repositorio>/`.

## Notas

- Os textos das seções "Ferramentas de IA" e "Podcasts, Newsletters e Formação" foram organizados em categorias distintas: a primeira reúne ferramentas que geram ou processam conteúdo; a segunda reúne canais de atualização e formação (que não geram conteúdo, mas mantêm o professor informado e capacitado).
- Um arquivo estava duplicado na pasta original (`Cópia de IA_e_educacao.pdf`, idêntico a `material-ia-educacao.pdf`) e não faz parte deste repositório.
- As anotações de curadoria (`LinksEExplicações.txt`, `Sugestoes.txt`) permanecem na pasta local como referência de trabalho, mas estão fora do controle de versão (veja `.gitignore`) — o conteúdo delas já foi incorporado ao site.

## Autoria

Idealizado e desenvolvido por **Verônica Silveira** — [Academia Isidoro](https://academiaisidoro.wordpress.com)
