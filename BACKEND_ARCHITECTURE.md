# Aeon Web Backend Architecture

This document outlines the backend architecture and conventions for the `aeon-web` codebase to guide future backend development.

## Overview

The `aeon-web` project is built on Next.js (App Router). Instead of a separate backend server (like Express), we utilize **Next.js Route Handlers** (API routes) located inside `src/app/api/` to handle all backend operations.

## Key Principles

1. **Serverless by Default:** We use Next.js API routes (`src/app/api/.../route.ts`) which map perfectly to serverless functions.
2. **Bring Your Own Key (BYOK) Support:** The infrastructure is designed to read AI API keys securely on the server-side, primarily from `.env.local`. Currently, we support NVIDIA NIM (`NVIDIA_API_KEY`) and Moonshot AI (`MOONSHOT_API_KEY`).
3. **Direct Integration:** We connect directly to upstream AI APIs using standard `fetch` without heavy intermediate wrappers.

## Current Endpoints

### 1. Chat Completion (`/api/chat`)
- **Location:** `src/app/api/chat/route.ts`
- **Purpose:** Handles the conversational interface for the Aeon Builder assistant.
- **Mechanism:** Takes in an array of messages, appends a specialized system prompt, and calls the upstream AI provider.
- **Response Format:** Transforms the upstream Server-Sent Events (SSE) into a plain text stream (`ReadableStream`) back to the client.

### 2. Website Generation (`/api/generate`)
- **Location:** `src/app/api/generate/route.ts`
- **Purpose:** Generates a structured JSON layout representing a full website based on a user prompt.
- **Mechanism:** Injects the block schema (via `getSchemaPrompt()`), calls the AI provider with a high token limit, and parses the response to ensure valid JSON is returned.
- **Response Format:** Validated JSON array of blocks (`{ blocks: [...] }`).

## Future Infrastructure Guidelines

When adding new backend features (e.g., database integrations, authentication, or new AI tools), please adhere to the following:

- **New Routes:** Create new route handlers in `src/app/api/<feature_name>/route.ts`.
- **Environment Variables:** All secrets and keys must remain strictly in `.env.local` and never be prefixed with `NEXT_PUBLIC_` unless they are explicitly meant for the client.
- **Error Handling:** Ensure route handlers return proper HTTP status codes and JSON error messages (e.g., `status: 500` and `{ "error": "Message" }`) so the frontend can gracefully handle failures.
- **Streaming:** When adding new LLM endpoints, prefer streaming (like the chat route) where possible to improve perceived latency for the user.
