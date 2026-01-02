---
applyTo: "**/*.ts, **/*.tsx"
---
# TypeScript Code Style and Best Practices

## 1. Naming Conventions
- **Classes, Interfaces, Enums, Type Aliases:** Use `PascalCase`.
- **Variables, Functions, Properties, Methods:** Use `camelCase`.
- **Constants:** Use `CONSTANT_CASE` for values that are truly immutable.
- **Files:** Use `kebab-case.ts`.
- **Private properties:** Do not use leading underscores. Use the `private` keyword or `#` private fields.

## 2. Type System & Safety
- **Avoid `any`:** Never use `any`. Use `unknown` if the type is truly not known, and perform type narrowing.
- **Explicit Returns:** Always define explicit return types for functions, especially exported ones.
- **Type Assertions:** Avoid `<Type>item`. Use `item as Type` only when absolutely necessary. Use Type Guards instead of casting.
- **Interfaces vs. Types:** Use `interface` for object structures that can be extended. Use `type` for unions, intersections, and aliases.

## 3. Language Features
- **Null vs. Undefined:** Use `undefined` for missing values or optional parameters. Use `null` only when it is part of an external API or specifically required by a library.
- **Decorators:** Use only when necessary (like in Angular or NestJS).
- **Enums:** Prefer `const enum` or union types for simple value mappings.
- **Array Types:** Use `T[]` for simple types, and `Array<T>` for complex types.

## 4. Coding Style
- **Indentation:** Use 2 spaces.
- **Semicolons:** Always use semicolons at the end of statements.
- **Strings:** Use single quotes `'` unless the string contains a single quote. Use backticks `` ` `` for template literals.
- **Object Shorthand:** Use shorthand `{key}` instead of `{key: key}`.
- **Arrow Functions:** Prefer arrow functions for anonymous callbacks and when lexical `this` is needed.

## 5. Documentation (JSDoc)
- Use `/** ... */` for all exported symbols (classes, methods, interfaces).
- Do not use `@params` or `@returns` if the information is already clear from the TypeScript types, unless additional explanation is needed.

## 6. Project Structure Requirements
- **Imports:** Group imports: 1. Third-party libraries, 2. Internal modules, 3. Relative paths. Use absolute paths (aliasing) where possible.
- **Exports:** Use named exports. Avoid `default export`.