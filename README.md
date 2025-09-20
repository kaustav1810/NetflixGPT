# NetflixGPT

A Netflix clone built with React, TypeScript, Redux Toolkit, and Firebase authentication.

## 🚀 Features

- User Authentication (Sign Up/Sign In)
- Movie browsing with TMDB API integration
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Redux Toolkit for state management
- Firebase for authentication

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **API**: The Movie Database (TMDB)
- **Build Tool**: Vite
- **Linting**: ESLint

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   └── features/        # Feature-specific components
├── pages/               # Route/page components
├── layouts/             # Layout components
├── hooks/               # Custom React hooks
├── services/            # API services
├── store/               # Redux store setup
│   ├── slices/         # Redux slices
│   └── index.ts        # Store configuration
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── constants/           # Application constants
├── lib/                 # Third-party library configurations
└── assets/              # Static assets
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NetflixGPT
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Add your API keys:
- Firebase configuration
- TMDB API key

5. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌟 Key Features Implementation

### Authentication
- Firebase Auth integration
- Form validation
- Protected routes

### Movie Data
- TMDB API integration
- Now playing movies
- Movie trailers

### State Management
- Redux Toolkit slices
- TypeScript integration
- Centralized state

## 🔒 Environment Variables

Create a `.env` file with the following variables:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.