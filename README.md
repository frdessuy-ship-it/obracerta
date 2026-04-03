# ObraCerta

Primeira versao de um app web para controle de custos de obra, inspirado na planilha `CASA BAIRRO UNIVERSITARIO.xlsm`.

## O que ja existe

- dashboard financeiro
- cadastro de fornecedores
- lancamentos com varios itens
- importacao de XML
- relatorios com filtros
- graficos com detalhamento
- persistencia local via `localStorage`

## Estrutura

- `index.html`: layout principal
- `styles.css`: identidade visual e responsividade
- `app.js`: dados, calculos e interacao da tela

## Como testar localmente

Abra o arquivo `index.html` no navegador.

## Publicar gratis no GitHub Pages

### Jeito mais facil

Voce pode publicar sem instalar `git`, direto pelo site do GitHub.

1. Crie uma conta em [GitHub](https://github.com/) se ainda nao tiver.
2. Clique em `New repository`.
3. Crie um repositorio com um nome simples, por exemplo `obracerta`.
4. Entre no repositorio criado.
5. Clique em `uploading an existing file`.
6. Envie estes arquivos da pasta `app-obra`:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `.nojekyll`
7. Clique em `Commit changes`.
8. No repositorio, abra `Settings`.
9. Entre em `Pages`.
10. Em `Build and deployment`, escolha:
    - `Source`: `Deploy from a branch`
    - `Branch`: `main`
    - pasta: `/ (root)`
11. Salve.
12. Aguarde alguns minutos.
13. O GitHub vai gerar um link como:
    - `https://seu-usuario.github.io/obracerta/`

## Usar no celular

1. Abra o link do GitHub Pages no celular.
2. No navegador, use `Adicionar a tela inicial`.
3. O app vai ficar com cara de aplicativo.
4. Depois da publicacao dos arquivos `manifest.webmanifest`, `service-worker.js` e `icons/`, o navegador passa a reconhecer o ObraCerta como PWA instalavel.

## Limitacao atual

Como esta versao ainda usa `localStorage`:

- os dados ficam salvos no navegador de cada aparelho
- celular e computador nao compartilham os mesmos lancamentos
- para testes isso funciona bem

## Proximo passo sugerido

Quando quiser evoluir para uso profissional online:

- login
- banco de dados
- sincronizacao entre aparelhos
- backup na nuvem
- versao PWA ou APK

## Sincronizar celular e computador com Supabase

Esta versao ja ficou preparada para sincronizar os dados online.

Agora a sincronizacao pode ficar protegida por uma chave compartilhada entre seus aparelhos, em vez de deixar leitura e escrita totalmente abertas.

Arquivos usados:

- `supabase-config.js`
- `supabase/schema.sql`

### O que fazer

1. Crie uma conta em [Supabase](https://supabase.com/).
2. Crie um novo projeto.
3. No painel do projeto, abra `SQL Editor`.
4. Copie o conteudo de `supabase/schema.sql` e execute.
5. Depois abra `Settings > API`.
6. Copie:
   - `Project URL`
   - `anon public key`
7. Abra o arquivo `supabase-config.js`.
8. Preencha:
   - `url`
   - `anonKey`
   - deixe `accessKey` em branco se quiser informar a chave manualmente no primeiro acesso de cada aparelho
9. Salve o arquivo.
10. No painel do projeto, execute novamente o SQL atualizado de `supabase/schema.sql`.
11. Atualize no GitHub estes arquivos:
   - `index.html`
   - `app.js`
   - `supabase-config.js`
   - `supabase/schema.sql`

### Chave de sincronizacao

Na primeira vez que abrir o app em cada aparelho, ele vai pedir uma chave de sincronizacao.

- use exatamente a mesma chave no celular e no PC
- essa chave fica salva localmente no aparelho
- sem a chave correta, o aparelho nao consegue ler nem gravar os dados online

### Resultado

Depois disso:

- o mesmo link vai funcionar no celular e no PC
- os lancamentos vao sincronizar entre os dois
- a pagina aberta consulta atualizacoes online periodicamente
- ao atualizar a pagina, os dados online voltam

### Observacao

Esta protecao com chave compartilhada melhora bastante o uso sem login, mas ainda nao substitui autenticacao por usuario.
Depois podemos evoluir para:

- usuarios
- permissoes
- obras separadas
- backup mais seguro
