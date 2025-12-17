# Neuralmap

A powerful mindmapping application built with Next.js, React Flow, and TypeScript.

## Demo
🚀 [Live Demo](https://neuralmap.co/)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand with lens slices
- **Data Fetching:** React Query (TanStack Query)
- **Authentication:** Auth0
- **Payments:** Paddle
- **UI Components:** Shadcn UI + Radix UI
- **Styling:** Tailwind CSS
- **Rich Text Editor:** Tiptap
- **Mindmap Visualization:** React Flow
- **Error Monitoring:** Sentry
- **Package Manager:** Yarn Berry (PnP)

## Getting Started

### 1. Prerequisites

- Node.js 18+ (recommended: 20+)
- Yarn Berry (included in project via `.yarnrc.yml`)

### 2. Clone the Repository

```bash
git clone <repository-url>
cd neuralmap
```

### 3. Environment Setup

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the required environment variables:

#### Required Variables:

```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Auth0 Configuration
NEXT_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000/callback
NEXT_PUBLIC_AUTH0_AUDIENCE=your-api-audience

# Paddle (Payment Provider)
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your-paddle-token
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox

# Sentry (Error Monitoring)
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id
NEXT_PUBLIC_SENTRY_ENV=development
SENTRY_AUTH_TOKEN=your-auth-token
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
```

For detailed Sentry configuration, see **[SENTRY_SETUP.md](./SENTRY_SETUP.md)**.

### 4. Install Dependencies

```bash
yarn install
```

> **Note:** This project uses Yarn Berry with PnP (Plug'n'Play). The first install will set up the `.pnp.cjs` and `.yarn/` directory.

### 5. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
neuralmap/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authenticated routes
│   │   └── (public)/          # Public routes
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── mindmap-ui/       # Mindmap-specific components
│   │   └── ...
│   ├── hooks/                 # Custom React hooks
│   ├── demo-hooks/           # Demo-specific hooks (no backend)
│   ├── services/             # API services & React Query
│   ├── lib/                  # Utilities and libraries
│   │   ├── features/        # Zustand store slices
│   │   └── validations/     # Zod schemas
│   ├── providers/            # React context providers
│   ├── types/                # TypeScript types
│   ├── constants/            # App constants
│   └── utils/                # Utility functions
├── public/                   # Static assets
├── SENTRY_SETUP.md          # Sentry configuration guide
└── ...
```

## Available Scripts

```bash
# Development
yarn dev              # Start dev server (port 3000)

# Building
yarn build           # Production build
yarn start           # Start production server

# Code Quality
yarn lint            # Run ESLint
yarn type-check      # Run TypeScript compiler check

# Testing (if configured)
yarn test            # Run tests
```

## Key Features

### 🗺️ Mindmapping
- Interactive node-based mindmaps using React Flow
- Real-time updates with optimistic UI
- Rich text editing with Tiptap
- Drag-and-drop node positioning

### 🔐 Authentication
- Auth0 integration with refresh tokens
- Protected routes with automatic redirects
- Demo mode (no auth required)

### 💳 Subscriptions
- Three tiers: Demo, Free, Pro
- Paddle integration for payments
- Usage tracking (nodes, mindmaps, views)
- Grace period for failed payments

### 🚨 Error Handling
- **Error Boundaries** for React errors
- **Global Error Handler** with categorization
- **Sentry Integration** for production monitoring
- **User-Friendly Error Messages** with Shadcn Empty component
- **Form Validation** with Zod

### 🎨 UI/UX
- Responsive sidebar with collapsible navigation
- Dark mode support
- Toast notifications (Sonner)
- Loading states and skeletons
- Empty states with actionable messages

## Configuration Files

### Sentry
- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking
- `next.config.ts` - Sentry webpack plugin setup

**📖 See [SENTRY_SETUP.md](./SENTRY_SETUP.md) for complete setup instructions.**

### Next.js
- `next.config.ts` - Next.js configuration with Sentry
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

### Yarn Berry
- `.yarnrc.yml` - Yarn configuration (PnP enabled)
- `.pnp.cjs` - Auto-generated PnP loader
- `.yarn/` - Yarn Berry cache and plugins

## Environment-Specific Behavior

### Development
- Sentry disabled (console logging only)
- Hot module replacement
- React Query DevTools enabled
- Verbose error messages

### Production
- Sentry enabled with sampling
- Optimized builds
- Source maps hidden
- User-friendly error messages

## Troubleshooting

### Yarn Berry Issues
If you encounter module resolution errors:
```bash
yarn install
rm -rf .next
yarn dev
```

### Port Already in Use
If port 3000 is busy:
```bash
lsof -ti:3000 | xargs kill -9
yarn dev
```

### Sentry Not Working
See the [SENTRY_SETUP.md](./SENTRY_SETUP.md) troubleshooting section.

## Learn More

### Framework & Libraries
- [Next.js Documentation](https://nextjs.org/docs)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Flow](https://reactflow.dev/)
- [Tiptap Editor](https://tiptap.dev/)
- [Shadcn UI](https://ui.shadcn.com/)

### Services
- [Auth0 Documentation](https://auth0.com/docs)
- [Paddle Documentation](https://developer.paddle.com/)
- [Sentry Documentation](https://docs.sentry.io/)

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure code passes linting and type checks
4. Test thoroughly in both demo and authenticated modes
5. Submit a pull request

## License

[Your License Here]
