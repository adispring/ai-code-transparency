# AI Code Transparency Project Instructions

## Project Overview

This project focuses on transparency in AI-generated code. When generating code for this project, follow these principles.

## Coding Guidelines

### Style

- Use TypeScript for all new code
- Follow strict TypeScript practices with proper typing
- Use functional programming patterns where appropriate
- Add JSDoc comments to all public functions, classes, and interfaces

### Architecture

- Maintain a clear separation of concerns
- Use a modular architecture with well-defined boundaries
- Implement dependency injection for better testability
- Keep components small and focused on a single responsibility

### Testing

- Include unit tests for all new functionality
- Aim for high code coverage
- Use descriptive test names that explain the behavior being tested

### Performance

- Consider performance implications of generated code
- Avoid unnecessary computations or memory allocations
- Use efficient data structures and algorithms

### Security

- Never generate code with hardcoded credentials
- Validate all inputs, especially user inputs
- Handle errors gracefully and avoid exposing sensitive information

## Project-Specific Conventions

- Prefix interface names with 'I' (e.g., IDataProvider)
- Use PascalCase for class and interface names
- Use camelCase for variables and function names
- Place each class in its own file
- Group related functionality in directories

## Documentation

- Document complex algorithms or non-obvious code behavior
- Include examples where helpful
- Keep the documentation up-to-date with code changes

Remember to ensure any generated code aligns with the project's focus on transparency and ethical AI usage.
