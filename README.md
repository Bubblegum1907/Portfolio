# 🎀 IBA_OS v2.0

Welcome to **IBA_OS v2.0**, a personal portfolio themed as a retro-inspired, kawaii operating system. This project transforms a standard professional portfolio into an interactive desktop experience with draggable windows and a custom AI assistant.

## ✨ Key Features

* **Retro Window Manager**: Features a custom z-index management system and `react-draggable` to allow for a true desktop experience where windows can be moved and brought to the front.
* **Gibby_AI**: An integrated AI assistant powered by a custom intent-matching system that answers questions about skills, projects, and academic background.
* **Interactive Mail Client**: A functional contact form integrated with **EmailJS** for direct messaging.
* **Dynamic Tech Stack Viewer**: A dedicated "System Properties" window that displays core competencies in Python, React, and AI/ML.
* **Cat Gallery**: A status-bar integrated gallery featuring the developer's favorite "co-workers" (Simba, Fury, Dodo, Juno, and Paris).

## 🛠️ Tech Stack

* **Frontend**: React 19, Vite, Tailwind CSS
* **Animations & UI**: Framer Motion, Lucide React (Icons), and React Draggable
* **Backend Services**: EmailJS for contact functionality
* **Language**: JavaScript (ES6+)

## 📁 Project Structure

├── public/                  # Pixel-art icons and project media  
├── src/  
│   ├── components/          # Draggable Window and Gallery components  
│   ├── data/                # Projects, tech stack, and AI intents  
│   ├── App.jsx              # Main OS logic and window management  
│   └── index.css            # Global retro styles and custom scrollbars  

## 🚀 Getting Started

### Clone the repository:
git clone https://github.com/Bubblegum1907/portfolio-v2.git

### Install dependencies:
npm install

### Set up environment variables: Create a .env file with your EmailJS credentials:  
VITE_EMAILJS_SERVICE_ID=your_service_id  
VITE_EMAILJS_TEMPLATE_ID=your_template_id  
VITE_EMAILJS_PUBLIC_KEY=your_public_key  

### Run in development mode:
npm run dev

## 🌸 About the Developer
I'm **Iba Shibli**, a Computer Science student specializing in Artificial Intelligence. I focus on building AI systems that feel more human and design experiences that bridge the gap between technical complexity and aesthetic comfort.
