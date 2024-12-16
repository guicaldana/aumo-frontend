Essa é a resolução do desafio  de frontend da AUMO feita por Guilherme Teixeira Caldana

## Como subir

No diretório raiz rode:

```bash
docker buid -t aumo-frontend-guicaldana
```

e depois:
```bash
docker run -p 3000:3000 aumo-frontend-guicaldana
```
Com isso, o app web já deve estar funcionando em localhost:3000.

### Observações
- Devido ao tempo corrido da faculdade, alguns bugs ainda ficaram. Creio que o principal deles seja o fato de que ao retornar a Home da página de meu perfil, o local storage esteja sendo limpado.
- Responsividade no mobile pode não estar das melhores



- Qualquer dúvida, pode me contatar!
