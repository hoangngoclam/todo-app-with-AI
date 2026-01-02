---
applyTo: "*.tsx"
---
# React & JSX Best Practices

## Component Structure
- Use Functional Components with Arrow Functions.
- Define a `Props` interface for every component.
- Destructure props in the function signature.
- Use `PascalCase` for component filenames (e.g., `UserCard.tsx`).

## Hooks & Performance
- Always include dependency arrays in `useEffect`, `useMemo`, and `useCallback`.
- Prefer `useMemo` for heavy calculations.
- Follow the "Lifting State Up" pattern when necessary.