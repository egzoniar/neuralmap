# Sentry Configuration Guide

This document outlines the required configuration for Sentry error monitoring in the application.

## Prerequisites

- Sentry account (https://sentry.io)
- Sentry project created
- Sentry DSN obtained from project settings

## Environment Variables

Add the following variables to your `.env.local` file:

```env
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id
NEXT_PUBLIC_SENTRY_ENV=production
SENTRY_AUTH_TOKEN=your-auth-token-here

# Optional: For source map uploads
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
```

### How to Get These Values:

1. **NEXT_PUBLIC_SENTRY_DSN:**
   - Go to Sentry → Settings → Projects → [Your Project] → Client Keys (DSN)
   - Copy the DSN URL

2. **SENTRY_AUTH_TOKEN:**
   - Go to Sentry → Settings → Account → API → Auth Tokens
   - Create a new token with `project:releases` and `org:read` permissions
   - Copy the token

3. **SENTRY_ORG & SENTRY_PROJECT:**
   - Find these in your Sentry project URL: `https://sentry.io/organizations/{org}/projects/{project}/`

## Configuration Files

The following configuration files are automatically loaded by the Sentry webpack plugin:

### 1. Client-Side (`sentry.client.config.ts`)
- Captures errors in the browser
- Includes session replay for debugging
- Only runs in production

### 2. Server-Side (`sentry.server.config.ts`)
- Captures errors in API routes and SSR
- Only runs in production
- Ignores Auth0 refresh token errors

### 3. Edge Runtime (`sentry.edge.config.ts`)
- Captures errors in middleware and edge functions
- Only runs in production

## Features Enabled

### ✅ Error Tracking
- Automatic capture of unhandled errors
- Manual error reporting via `ErrorHandler.sendToMonitoring()`
- Error categorization (auth, validation, network, etc.)

### ✅ User Context
- Automatically attaches user information to errors
- Includes user ID, email, and subscription tier
- Clears context on logout

### ✅ Session Replay (Client Only)
- Records 10% of error sessions for debugging
- Masks all text and blocks media for privacy
- Only in production environment

### ✅ Ad Blocker Bypass
- Uses tunnel route (`/api/monitoring/sentry`)
- Forwards requests through your domain
- Prevents ad blockers from blocking error reports

## Sampling Rates

Configure these in the respective config files:

```typescript
// Client
tracesSampleRate: 0.1,      // 10% of performance traces
sampleRate: 1.0,             // 100% of errors
replaysOnErrorSampleRate: 0.1, // 10% of error sessions

// Server & Edge
tracesSampleRate: 0.1,      // 10% of performance traces
sampleRate: 1.0,             // 100% of errors
```

**Adjust based on traffic volume and Sentry quota.**

## Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| Sentry enabled | ❌ Disabled | ✅ Enabled |
| Error logging | Console only | Console + Sentry |
| Source map upload | ❌ Skipped | ✅ Uploaded |
| Webpack plugin | ❌ Disabled | ✅ Enabled |
| Performance traces | ❌ None | ✅ 10% sampled |

## Verification

### Test in Production:

1. **Trigger a test error:**
   ```typescript
   throw new Error("Sentry test error");
   ```

2. **Check Sentry dashboard:**
   - Go to Issues → You should see the error
   - Verify user context is attached
   - Check breadcrumbs for context

3. **Test tunnel route:**
   ```bash
   curl -X POST http://localhost:3000/api/monitoring/sentry \
     -H "Content-Type: application/x-sentry-envelope" \
     -d '{"dsn":"your-dsn"}\n{}'
   ```

## Troubleshooting

### Issue: Sentry not capturing errors

**Check:**
1. ✅ `NEXT_PUBLIC_SENTRY_DSN` is set in environment
2. ✅ `NODE_ENV=production` (Sentry is disabled in development)
3. ✅ `next.config.ts` is wrapped with `withSentryConfig`
4. ✅ Build completed successfully without Sentry errors

### Issue: Source maps not uploaded

**Check:**
1. ✅ `SENTRY_AUTH_TOKEN` is set
2. ✅ `SENTRY_ORG` and `SENTRY_PROJECT` are set
3. ✅ Token has correct permissions (`project:releases`, `org:read`)

### Issue: User context not attached

**Check:**
1. ✅ User is authenticated
2. ✅ `SentryUserContext` is rendered in layout
3. ✅ `StoreProvider` wraps `SentryUserContext`
4. ✅ `useSentryUser` hook is executing

## Integration with Error Handler

The `ErrorHandler` class automatically sends errors to Sentry:

```typescript
// All categorized errors are sent to Sentry
ErrorHandler.handle(error, {
  context: "Payment processing",
  showToast: true,
});

// Set user context
ErrorHandler.setUser({
  id: user.id,
  email: user.email,
  tier: user.tier,
});

// Clear user context on logout
ErrorHandler.clearUser();
```

## Cost Considerations

Sentry pricing is based on:
- Number of events (errors) per month
- Number of replays captured
- Data retention period

**Recommendations:**
- Start with 10% sampling rates
- Monitor quota usage in Sentry dashboard
- Adjust sampling rates based on volume
- Use `ignoreErrors` to filter out noise

## Security

- ✅ Source maps are hidden from public (production only)
- ✅ Session replays mask all text and media
- ✅ Tunnel route prevents DSN exposure
- ✅ Auth tokens never exposed to client

## Additional Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Error Monitoring Best Practices](https://docs.sentry.io/product/error-monitoring/)
- [Session Replay Guide](https://docs.sentry.io/product/session-replay/)

