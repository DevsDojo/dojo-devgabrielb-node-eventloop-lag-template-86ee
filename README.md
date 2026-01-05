# 🚀 Desafio: Node.js Event Loop Lag

Bem-vindo ao desafio de performance! Você acabou de ser contratado para salvar uma API que está sofrendo com lentidão crítica sob carga.

## 📜 O Cenário

Nossa API possui um endpoint `/feed` que busca posts de usuários. Recentemente, começamos a notar que, quando muitos usuários acessam simultaneamente, o tempo de resposta sobe drasticamente e o servidor parece "congelar" por alguns instantes.

Seus logs de monitoramento indicam um **Event Loop Lag** alto. Sua missão é identificar o gargalo no código e otimizá-lo.

## 🛠️ Como Rodar Localmente

Pré-requisitos: Docker e Docker Compose.

1.  **Suba o ambiente:**
    ```bash
    docker compose up -d
    ```
    Isso iniciará a API na porta `3000` e um banco Postgres.

2.  **Teste Manual:**
    Acesse `http://localhost:3000/feed` no navegador ou via curl.
    ```bash
    curl http://localhost:3000/feed
    ```

3.  **Simulando o Problema (Load Test):**
    Para ver o problema acontecer, você precisa gerar carga. Recomendamos usar o [k6](https://k6.io/) ou simplesmente abrir várias abas/curls simultâneos.
    
    Exemplo simples com K6 (se tiver instalado):
    ```javascript
    import http from 'k6/http';
    import { sleep } from 'k6';
    export default function () {
      http.get('http://localhost:3000/feed');
      sleep(1);
    }
    ```
    *Dica: Observe como o tempo de resposta degrada rapidamente.*

## 🎯 Objetivo da Avaliação

Você deve refatorar o arquivo `src/index.js` para reduzir o tempo de resposta e o bloqueio do Event Loop.
- **Não** altere a lógica de negócio (o feed deve retornar os mesmos dados).
- **Não** altere o banco de dados (schema).

### Critérios de Aceite
1.  **RFC (Obrigatório):** Antes ou depois de codar, explique sua estratégia em `docs/RFC.md`. Soluções sem explicação não serão aceitas.
2.  **Pipeline Verde:** Nosso sistema de validação automática rodará um teste de carga idêntico ao que você deve simular. Ele espera que 95% das requisições sejam respondidas em menos de **500ms** com 10 usuários simultâneos.

## 🖥️ Especificações do Ambiente de Teste

Seu código será avaliado em um ambiente controlado (GitHub Actions Runner) com as seguintes restrições aplicadas via Docker:

- **CPU:** 0.5 vCPU (Sim, é limitado propositalmente!)
- **Memória:** 512MB
- **Node Version:** 20-alpine
- **Banco de Dados:** Postgres 15 (Local network, baixa latência)

⚠️ **Atenção:** Soluções que dependem de hardware parrudo falharão. Você precisa ser eficiente.

## 📨 Como Submeter

1.  Crie uma **Branch** com sua solução.
2.  Faça o **Commit** das suas alterações (Código + RFC).
3.  Abra um **Pull Request** para a branch `main`.
4.  O nosso **Bot de Avaliação** (DevArena Judge) entrará em ação automaticamente.
5.  Aguarde o comentário no PR com o resultado:
    - ✅ **APROVADO:** Parabéns!
    - ❌ **FALHO:** Verifique os logs, ajuste e faça um novo commit na mesma branch.

Boa sorte! 💻🔥
