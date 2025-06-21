# TaskFlow AI - Intelligent Task Management System

![TaskFlow AI](https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

A modern, AI-powered task management application built with React, TypeScript, and Tailwind CSS. TaskFlow AI leverages artificial intelligence to generate personalized tasks based on user topics, helping users stay organized and productive.

## 🚀 Features

### Core Functionality
- **AI-Powered Task Generation**: Generate intelligent, actionable tasks using Google Gemini API
- **User Authentication**: Secure login and registration system
- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Management**: Complete, edit, and organize tasks efficiently
- **Progress Tracking**: Visual progress indicators and completion statistics

### Advanced Features
- **Smart Categorization**: Organize tasks by categories (Work, Personal, Learning, Health, Finance, Other)
- **Priority Management**: Set task priorities (Low, Medium, High, Urgent)
- **Advanced Filtering**: Filter tasks by category, priority, and completion status
- **Due Date Tracking**: Set and track task deadlines
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Instant UI updates with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Framer Motion** - Smooth animations and transitions
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskflow-ai.git
   cd taskflow-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🎯 Usage

### Getting Started
1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Generate AI Tasks**: Click "Generate AI Tasks" and enter a topic (e.g., "Learn Python")
3. **Review Generated Tasks**: Preview AI-generated tasks before saving
4. **Manage Tasks**: Create, edit, complete, and delete tasks as needed
5. **Track Progress**: Monitor your completion rate and productivity stats

### Task Generation Examples
- **Learning**: "Learn React", "Master TypeScript", "Study Data Structures"
- **Fitness**: "Build muscle", "Lose weight", "Marathon training"
- **Work**: "Project planning", "Team management", "Skill development"
- **Personal**: "Home organization", "Financial planning", "Hobby development"

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout components
│   ├── tasks/           # Task-related components
│   └── ui/              # Base UI components (Radix UI)
├── lib/                 # Utility functions and helpers
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Action buttons and highlights
- **Secondary**: Gray (#6B7280) - Secondary text and borders
- **Success**: Green (#10B981) - Completed tasks and success states
- **Warning**: Orange (#F59E0B) - Pending tasks and warnings
- **Error**: Red (#EF4444) - Error states and destructive actions

### Typography
- **Headings**: Inter font family, various weights
- **Body**: Inter font family, regular weight
- **Code**: Monospace font family

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings (automatically detected)
3. Deploy with automatic CI/CD

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

For support, email support@taskflow-ai.com or create an issue in the GitHub repository.

---

**Built with ❤️ by [Your Name]**