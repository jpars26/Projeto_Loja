# Iara Noivas - Loja Virtual 👰✨

![React](https://img.shields.io/badge/React-18.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)  
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)  
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)  
![Jest](https://img.shields.io/badge/Jest-29.0.0-C21325?style=for-the-badge&logo=jest&logoColor=white)  
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI/CD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)  

---

## 📌 Sobre o Projeto

<<<<<<< HEAD
🚀 **Iara Noivas** é uma loja especializada na criação e aluguel de vestidos de noiva exclusivos. A plataforma permite que clientes explorem coleções sofisticadas, agendem consultas e interajam com depoimentos reais de noivas felizes.  
=======
🚀 **Iara Noivas** é uma plataforma dedicada à criação e aluguel de vestidos de noiva exclusivos. A loja online permite que clientes explorem coleções sofisticadas, agendem consultas e interajam com depoimentos reais de noivas felizes.
>>>>>>> bd2008cf824f20b3e11d0e92c0c104671127fdff

O projeto foi desenvolvido com **React, Firebase e CI/CD automatizado via GitHub Actions**, garantindo **alta performance**, **responsividade**, **testes automatizados** e **SEO otimizado**.

---

## 🛠 Tecnologias Utilizadas

### 💻 **Frontend**
- ⚛️ [ReactJS](https://reactjs.org/) - SPA para melhor experiência do usuário
- 🎨 [TailwindCSS](https://tailwindcss.com/) + CSS puro - Estilização
- 🗂️ [React Lazy Load Image](https://www.npmjs.com/package/react-lazy-load-image-component) - Otimização do carregamento de imagens
- 🛠️ [Framer Motion](https://www.framer.com/motion/) - Animações suaves
- 🔍 [React Helmet](https://www.npmjs.com/package/react-helmet) - SEO e metadados
- 🏡 [React Router Dom](https://reactrouter.com/) - Navegação entre páginas
- 🎭 [React Icons](https://react-icons.github.io/react-icons/) - Ícones personalizados
- 🌧️ [Styled Components](https://styled-components.com/) - Estilização dinâmica

<<<<<<< HEAD
### ⚙️ **Backend e Banco de Dados**
- 🔥 [Firebase Firestore](https://firebase.google.com/products/firestore) - Banco de dados NoSQL
- 🌎 [Firebase Hosting](https://firebase.google.com/products/hosting) - Hospedagem do site
- 🔒 [Firebase Authentication](https://firebase.google.com/products/auth) - Autenticação de usuários (caso necessário)
- 🛡️ [CORS](https://www.npmjs.com/package/cors) - Permissões CORS para segurança

### ✅ **Testes e Automação**
- 🥞 [Jest](https://jestjs.io/) - Testes unitários e de integração
- 🚀 [GitHub Actions](https://github.com/features/actions) - CI/CD automatizado
=======
### ⚙️ **Backend**
- ⚡ [Express.js](https://expressjs.com/) - Framework minimalista
- 🔥 [Firebase Firestore](https://firebase.google.com/products/firestore) - Banco de dados
- 🔐 [Dotenv](https://www.npmjs.com/package/dotenv) - Gerenciamento de variáveis de ambiente
- 🛑 [CORS](https://www.npmjs.com/package/cors) - Permissões CORS
>>>>>>> bd2008cf824f20b3e11d0e92c0c104671127fdff

---

## 📦 Instalação e Configuração

### 🏷 Passo 1 - Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 🏷 Passo 2 - Configurar Firebase
- **Crie um projeto no Firebase**  
- **Ative o Firestore e Hosting**  
- **Obtenha as credenciais em "Configurações do Projeto > Configuração do SDK"**  
- **Crie um arquivo `.env.local` no frontend** e adicione:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 🏷 Passo 3 - Instalar Dependências
```bash
cd frontend
npm install
```
<<<<<<< HEAD
=======
---

## 🚀 Principais Comandos Utilizados

### 📦 Pacotes do Frontend
```bash
npm install react-router-dom         # Navegação entre páginas
npm install react-lazy-load-image-component  # Carregamento otimizado de imagens
npm install framer-motion            # Animações
npm install react-helmet             # SEO e metadados
npm install react-icons              # Ícones para UI
npm install styled-components        # Estilização de componentes
```

### ⚙️ Pacotes do Backend
```bash
npm install express                  # Framework backend
npm install firebase-admin            # Integração com Firestore
npm install dotenv                    # Gerenciamento de variáveis de ambiente
npm install cors                      # Permissões CORS
```
>>>>>>> bd2008cf824f20b3e11d0e92c0c104671127fdff

---

## 🔥 Executando o Projeto

### 🚀 Rodando o Frontend
```bash
cd frontend
npm start
```

### 🚀 Rodando os Testes Automatizados
```bash
npm test
```

---

## ✨ Melhorias Implementadas
✔️ **Lazy Loading de Imagens** para carregamento otimizado  
✔️ **Animações suaves** com `Framer Motion`  
✔️ **SEO otimizado** com `React Helmet`  
✔️ **Formulário conectado ao Firebase Firestore**  
✔️ **Deploy automatizado via GitHub Actions**  
✔️ **Testes unitários com Jest**  
✔️ **Regras de segurança no Firebase Firestore**  

---

## 📜 GitHub Actions - CI/CD Automatizado
Arquivo de configuração do workflow `.github/workflows/deploy.yml`:
```yml
name: Deploy Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v3

      - name: Instalar dependências
        run: npm install

      - name: Rodar testes
        run: npm test

      - name: Construir projeto
        run: npm run build

      - name: Fazer deploy para Firebase Hosting
        run: firebase deploy --only hosting --token ${{ secrets.FIREBASE_TOKEN }}
```

---

## 📚 `.gitignore` Atualizado
```gitignore
node_modules/
.firebase/
.env
.env.local
/build
/public/build
```

---

## 🎨 Prévia do Projeto
🌟 **Homepage com vídeo hero, coleção e depoimentos**  
🛒 **Seção de produtos exclusivos**  
📸 **Depoimentos das noivas em formato de carrossel animado**  

---

## 💎 Contato
💌 **E-mail:** jpars131@gmail.com  
🌐 **Website:** [www.iaranoivas.com](https://www.iaranoivas.com)  
📷 **Instagram:** [@iaranoivas](https://www.instagram.com/iaranoivas)

