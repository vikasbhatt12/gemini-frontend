# Gemini Frontend Clone

A fully functional, responsive, and visually appealing frontend for a Gemini-style conversational AI chat application, built with React and Redux.

**[Live vercel Link](https://gemini-frontend-84v3.vercel.app/)**

## Features

-   **Authentication:** Simulated OTP-based login with country code selection.
-   **Chatroom Management:** Create, delete, and search for chatrooms.
-   **Real-time Chat Interface:** Send text and image messages with a simulated AI response.
-   **Advanced Chat Features:**
    -   Typing indicators ("Gemini is typing...").
    -   Reverse infinite scroll to load historical messages.
    -   Image previews directly in the chat.
    -   Copy-to-clipboard for messages.
-   **Polished UX:**
    -   Fully mobile-responsive design.
    -   Dark mode toggle with system preference detection.
    -   Debounced search for smooth filtering.
    -   Loading skeletons for a better user experience.
    -   Toast notifications for key actions.
-   **Data Persistence:** Chat and theme data are saved in `localStorage`.

## Tech Stack

-   **Framework:** React (Vite)
-   **State Management:** Redux Toolkit
-   **Styling:** Tailwind CSS
-   **Form Management:** React Hook Form
-   **Schema Validation:** Zod
-   **Icons:** Lucide React

## Setup and Run Instructions

1.  **Clone the repository:**
    ```bash
    git clone [Your-Repo-URL]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd gemini-clone
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Implementation Details

### Form Validation
Form validation is handled using **React Hook Form** for performance and **Zod** for schema validation. The `zodResolver` connects the two, allowing for type-safe and robust validation with minimal re-renders.

### Infinite Scroll
Reverse infinite scroll is implemented in the `ChatWindow` component.
1.  A large list of dummy messages is generated in the Redux slice.
2.  Only a "page" of messages (20 at a time) is displayed.
3.  An `onScroll` event listener on the message container detects when the user scrolls to the top (`scrollTop === 0`).
4.  When triggered, it dispatches a Redux action to increment the current page number, which causes more messages to be displayed.
5.  The user's scroll position is maintained by calculating the difference in `scrollHeight` before and after the new messages are rendered.