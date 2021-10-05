# Treefall - Mobile

## Requisitos

- [Node.js](https://nodejs.org/en/) - LTS
- [Expo](https://docs.expo.dev/get-started/installation/)
- Emulador - Android ou IOS
- [Expo Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)
- [Expo Client IOS](https://apps.apple.com/us/app/expo-go/id982107779)

Como executar

Execute o backend da aplicação - [Treefall-Backend](https://github.com/DenisMedeirosSDK/TreeFall-Backend)

Copie o conteudo do arquivo `.env.example` para dentro de um novo arquivo `.env`

Faça as modificações necessaria para seu ambiente, como:

- URL da API
  - Local - Utilize o ip da sua maquina.
  - Prod - Utilize a URL de produção.

```bash
npm install

expo start
```

**Dispositivo fisico**: Baixe o expo client na loja de app, após executar a aplicação leia o **qrCode**.

**Dispositivo virtual**: Após executar a aplicação abrira uma pagina, `http://localhost:19000/`, clique na opição de seu ambiente como: `Run on Android device/emulator` ou `Run on iOS simulator`
