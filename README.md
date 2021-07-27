<h1 align="center">
   Aplicativo mockup para comunicação BLE no React Native
</h1>
<p align="center">
  <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias-utilizadas">Tecnologias Utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-resultado-em-19072021">Resultado</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-uso">Uso</a>
</p>

## 🔖 Sobre

Esse projeto tem como objetivo realizar um fluxo completo de comunicação utilizando o protocolo Bluetooth Low Energy (Escaneamento por devices -> Conexão -> Descobrimento de serviços e características -> Criação de listeners para características do tipo Notify -> Escrita em características do tipo Write -> Desconexão).

## 🚀 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Elements](https://reactnativeelements.com/)
- [React Native BLE PLX](https://github.com/dotintent/react-native-ble-plx)

### 💡 Resultado em 26/07/2021

![""](/docs/ble-app-screens.png)

## 🏃 Uso

```bash
    // Clonar repositório
    $ git clone https://github.com/joaovitorpessoa/ble

    // Acessar diretório
    $ cd ble

    // Instalar dependências
    $ npm install

    // Iniciar projeto em modo debug (desenvolvimento)
    $ npx react-native run-android
    
    // Ou simplesmente instalar o apk do último build do repositório
    $ cd dist
```

---

<h3 align="center">Desenvolvido por <a href="https://www.linkedin.com/in/jo%C3%A3o-vitor-pessoa-5017561b9">João Vitor Pessoa</h3>
