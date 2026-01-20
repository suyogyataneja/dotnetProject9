# AI Coding Agent Instructions - Reactivities Client

## Project Overview
This is a React 19 + TypeScript + Vite frontend application for the "Reactivities" project. The client fetches activity data from a backend API and displays it in a React component.

**Key Technologies:**
- React 19.2.0 with React Compiler enabled (Babel integration)
- TypeScript 5.9.3 with strict type checking
- Vite 7.2.4 (dev server on port 3000)
- ESLint with TypeScript and React Hooks rules

## Architecture & Data Flow

### Component Structure
The project follows a minimal setup with components in `src/`:
- **`App.tsx`**: Main component that fetches activities from backend API and renders activity list
- **`main.tsx`**: React root entry point with StrictMode wrapper
- **API Integration**: Direct fetch calls to `https://localhost:5001/api/activities` (note: uses hardcoded localhost)

### Data Flow
1. `App.tsx` initializes empty `activities` state
2. `useEffect` hook fetches from backend on component mount
3. Backend response is JSON parsed and set to state
4. Activities are mapped into list items with `activity.title` display

**Important**: Ensure activity objects have a `title` property for rendering.

## Build & Deployment Commands

- **`npm run dev`**: Start Vite dev server on port 3000 with HMR
- **`npm run build`**: TypeScript compilation + Vite production build (generates `dist/`)
- **`npm run lint`**: Run ESLint on all `.ts` and `.tsx` files
- **`npm run preview`**: Preview production build locally

## TypeScript & Linting Configuration

### Strict Type Settings (`tsconfig.app.json`)
- **Target**: ES2022
- **Module**: ESNext (bundler resolution)
- **JSX**: react-jsx (automatic imports)
- **Strict Mode**: Enabled globally
- **Unused Detection**: Errors on unused locals/parameters
- **Side Effects**: `noUncheckedSideEffectImports` enabled

### ESLint Rules (`eslint.config.js`)
Applies recommended configs for:
- JavaScript, TypeScript, React Hooks, React Refresh
- Enforces React Hooks best practices (dependencies, cleanup)
- React Refresh compatibility for Fast Refresh

**Convention**: Components should be arrow functions or function declarations compatible with React Refresh.

## Development Patterns

### Component Creation
- Use function components with hooks (App.tsx is the pattern)
- Explicitly type state: `useState<ActivityType[]>([])` not `useState([])`
- Import React from 'react' for hooks, not just JSX

### State Management
- Use `useState` for local component state
- No centralized state library currently (consider Redux/Zustand if expanded)
- Extract types for state objects (e.g., `interface Activity { title: string; ... }`)

### API Communication
- Fetch calls currently hardcoded; consider environment variables for API endpoint
- No error handling in current pattern—add `.catch()` to fetch chains
- API runs on `https://localhost:5001` (HTTPS, port 5001)

## Critical Developer Notes

1. **React Compiler Impact**: Babel plugin for React Compiler enabled; may affect build times
2. **Port Configuration**: Dev server uses port 3000 (customizable in `vite.config.ts`)
3. **Type Safety**: Strict mode enabled—all React hooks must have proper dependency arrays
4. **No Test Setup**: Currently no Jest/Vitest configured; add if needed
5. **CSS**: Global styles in `index.css`, component styles in `App.css` (inline + CSS files)

## Common Tasks

- **Add New Component**: Create `.tsx` file in `src/`, use React Hooks, export as default
- **Fetch New API Data**: Add `useEffect` hook with dependency array, handle errors
- **Fix Type Errors**: Check TypeScript strict flags in `tsconfig.app.json`; explicit types required
- **Debug Build Issues**: Run `npm run lint` first—ESLint often catches configuration issues
