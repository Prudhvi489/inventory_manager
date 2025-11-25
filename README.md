
# Product Management System

A modern, responsive product management application built with React and Vite, featuring a premium UI/UX design with advanced data persistence and management capabilities.

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS with modern design patterns
- **Data Storage**: Browser localStorage with delta-based persistence
- **State Management**: React Hooks (useState, useEffect, useMemo)

## ✨ Features

### Core Functionality
- **Product CRUD Operations**: Create, Read, Update, and Delete products
- **Dual View Modes**: Toggle between List (table) and Grid (card) views
- **Search Functionality**: Real-time search with 500ms debounce
- **Pagination**: Navigate through products with configurable page size (6 items per page)
- **Data Persistence**: Smart localStorage implementation with delta-based saving

### UI/UX Enhancements
- **Premium Color Theme**: Modern slate/indigo color palette
- **Professional Icons**: SVG-based view toggle icons
- **Responsive Design**: Optimized for various screen sizes
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Centered Layout**: All content properly aligned and centered
- **Modern Typography**: Clean, readable font hierarchy

### Advanced Features
- **Delta-Based Persistence**: Only stores changes (new/edited products) in localStorage
- **Deleted Items Tracking**: Maintains a separate list of deleted IDs to prevent data conflicts
- **Smart ID Generation**: Ensures unique IDs by considering both active and deleted products
- **Confirmation Dialogs**: Prevents accidental deletions

## 📁 Project Structure

```
inventoryManager/
├── src/
│   ├── components/
│   │   ├── ProductGrid.jsx       # Grid view component
│   │   ├── ProductTable.jsx      # Table view component
│   │   ├── ProductForm.jsx       # Add/Edit form modal
│   │   ├── SearchBar.jsx         # Debounced search input
│   │   ├── ViewToggle.jsx        # View mode switcher
│   │   └── Pagination.jsx        # Pagination controls
│   ├── styles/
│   │   ├── ProductGrid.css       # Grid view styles
│   │   ├── ProductTable.css      # Table view styles
│   │   ├── SearchBar.css         # Search bar styles
│   │   └── ViewToggle.css        # Toggle button styles
│   ├── data/
│   │   └── products.json         # Seed data (40 products)
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Main application styles
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 20.12.0
- npm or yarn package manager

### Installation Steps

1. **Clone or extract the project**
   ```bash
   cd inventory_manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 💾 Data Persistence Strategy

The application uses a sophisticated localStorage-based persistence system:

### Storage Keys
- **`user_products`**: Stores only new or modified products (delta)
- **`deleted_ids`**: Tracks IDs of deleted products

### How It Works

1. **On Load**:
   - Loads base data from `products.json`
   - Merges with `user_products` from localStorage
   - Filters out any IDs in `deleted_ids`

2. **On Save**:
   - Compares current products with seed data
   - Saves only changed/new items to `user_products`
   - Maintains `deleted_ids` separately

3. **Benefits**:
   - Minimal storage usage
   - Fast load times
   - Preserves original seed data
   - Persistent deletions

### ID Generation
```javascript
// Ensures unique IDs by checking both active and deleted products
const maxActiveId = Math.max(...products.map(p => p.id));
const maxDeletedId = Math.max(...deletedIds);
const nextId = Math.max(maxActiveId, maxDeletedId) + 1;
```

### Search with Debounce
- 500ms delay to prevent excessive filtering
- Case-insensitive search
- Searches product names

### Pagination Logic
- Automatically adjusts current page if filtered results change
- Maintains page state during view switches
- Resets to page 1 on new product addition


1. **UI/UX Refinement**
   - Moved all inline styles to dedicated CSS files
   - Applied premium color theme throughout
   - Ensured proper centering and alignment
   - Added professional icons for view toggle

2. **Layout Optimization**
   - Fixed spacing issues in ProductGrid
   - Prevented pagination overlap
   - Improved card and table styling

3. **Data Management**
   - Implemented localStorage persistence
   - Optimized to delta-based storage
   - Added delete functionality with proper tracking
   - Fixed ID generation bug

4. **Code Quality**
   - Organized CSS into modular files
   - Improved component structure
   - Added proper prop validation
   - Implemented confirmation dialogs



## 📄 License

This project is part of a technical assessment/task.

## 👨‍💻 Development Notes

- All changes are tracked in `task.md` artifact
- Implementation plans documented in `implementation_plan.md`
- Walkthroughs available in `walkthrough.md`

---

**Last Updated**: November 2025
**Version**: 1.0.0
