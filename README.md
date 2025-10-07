# Gemini Frontend Clone

A fully functional, responsive, and visually appealing frontend for a Gemini-style conversational AI chat application, built with React and Redux.

**Live Link:** [**➡️ View Live Demo**](https://gemini-frontend-84v3.vercel.app/)


---

## Features

### 🔑 Authentication & Routing
- **Simulated OTP Login:** A clean login/signup flow using phone numbers and country code selection from a local JSON list.
- **Protected Routes:** Users are automatically redirected based on their authentication status. Unauthenticated users cannot access the main dashboard.

### 💬 Chat & Chatroom Management
- **Create & Delete Chatrooms:** Users can manage their list of conversations.
- **Debounced Search:** A performant search bar instantly filters chatrooms by title without lagging the UI.
- **Real-time Messaging:** Send text and image messages with a simulated AI reply.
- **Typing Indicator:** A "Gemini is typing..." indicator provides feedback while waiting for a response.
- **Image Uploads:** Attach and preview images directly in the chat window using local preview URLs.
- **Data Persistence:** All chatrooms and user preferences are saved to `localStorage`, preserving the state between sessions.

### ✨ Advanced UI/UX
- **Reverse Infinite Scroll:** Seamlessly scroll to the top of a chat to load older messages from the history.
- **Copy to Clipboard:** Easily copy any message text with a single click and receive a toast notification.
- **Timestamps:** Every message is timestamped for clarity.
- **Loading Skeletons:** Skeletons provide a smooth loading experience when switching between chats.
- **Mobile Responsive Design:** The interface is fully optimized for both desktop and mobile devices, featuring a collapsible sidebar drawer.
- **Dark Mode:** A beautiful dark mode with support for light, dark, and system preference themes.

---

## Tech Stack

-   **Framework:** React (Vite)
-   **State Management:** Redux Toolkit
-   **Styling:** Tailwind CSS
-   **Form Management:** React Hook Form
-   **Schema Validation:** Zod
-   **Routing:** React Router
-   **Icons:** Lucide React
-   **Notifications:** React Hot Toast
-   **Deployment:** Vercel

---

## 🧠 Implementation Highlights

### Form Validation
The login form uses a combination of **React Hook Form** for performance and **Zod** for schema validation. This allows for robust, type-safe validation with minimal re-renders. The country selector is populated from a local JSON file for reliability.

### Reverse Infinite Scroll & Pagination
To handle long chat histories, the `ChatWindow` component implements reverse infinite scroll.
1.  **Client-Side Pagination:** A large array of dummy messages is stored in the Redux state. The UI only displays a "page" of messages (20 at a time), calculated using `useMemo` for efficiency.
2.  **Scroll Detection:** An `onScroll` event listener detects when the user scrolls to the very top (`scrollTop === 0`).
3.  **Loading More:** When the top is reached, a Redux action increments the current page number for that chatroom.
4.  **Maintaining Scroll Position:** To prevent the content from jumping, the component saves the `scrollHeight` before new messages are rendered. After the re-render, it programmatically sets the `scrollTop` to maintain the user's view on the same message they were looking at before.

### AI Response Throttling
The AI response is simulated with a `setTimeout` in a `useEffect` hook that triggers only after the last user message. This naturally prevents the AI from "replying" to every rapid-fire message, effectively throttling the responses and creating a more realistic chat experience.

---

## 📁 Folder Structure

The project follows a scalable, feature-sliced folder structure to keep the code organized and maintainable.

```
src/
├── app/          # Redux store configuration
├── components/   # Reusable components
│   ├── auth/     # Authentication-specific components (e.g., ProtectedRoute)
│   ├── chat/     # Components for the chat interface (e.g., ChatWindow)
│   ├── common/   # Components used across multiple features (e.g., Sidebar)
│   └── ui/       # Generic, base UI elements (Button, Input, Skeleton)
├── features/     # Redux Toolkit slices (state logic)
├── hooks/        # Custom React hooks (e.g., useDebounce)
├── lib/          # Utility functions and local data
└── pages/        # Page-level components
```

---

## 🚀 Setup and Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_GITHUB_REPO_URL]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd gemini-frontend-clone
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```