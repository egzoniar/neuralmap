"use client";

import { useEffect, useState, useRef } from "react";
import { useGetBillingConfig } from "@/services/billing/queries";

declare global {
  interface Window {
    Paddle?: {
      Environment: {
        set: (env: "sandbox" | "production") => void;
      };
      Initialize: (config: { token: string; eventCallback?: (data: PaddleEventData) => void }) => void;
      Checkout: {
        open: (options: PaddleCheckoutOptions) => void;
      };
    };
  }
}

interface PaddleEventData {
  name: string;
  data?: {
    transaction_id?: string;
    status?: string;
    [key: string]: any;
  };
}

interface PaddleCheckoutOptions {
  // Either transactionId (from backend) OR items (direct creation)
  transactionId?: string;
  items?: Array<{ priceId: string; quantity?: number }>;
  customer?: { email?: string };
  customData?: Record<string, string>;
  settings?: {
    successUrl?: string;
    displayMode?: "inline" | "overlay";
    theme?: "light" | "dark";
    locale?: string;
  };
  onSuccess?: (data: { transaction_id?: string }) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

interface UsePaddleReturn {
  isReady: boolean;
  error: Error | null;
  openCheckout: (options: PaddleCheckoutOptions) => void;
}

/**
 * Hook to initialize and use Paddle checkout
 * Handles Paddle.js SDK loading and initialization with event callbacks
 * Gets configuration dynamically from backend
 * Follows codebase pattern: side effects in custom hooks
 */
export function usePaddle(): UsePaddleReturn {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch billing config from backend
  const { data: billingConfig, isLoading: isConfigLoading, error: configError } = useGetBillingConfig();

  // Store current checkout callbacks in a ref so they're accessible in eventCallback
  const checkoutCallbacksRef = useRef<{
    onSuccess?: (data: { transaction_id?: string }) => void;
    onError?: (error: Error) => void;
    onClose?: () => void;
  }>({});

  useEffect(() => {
    // Guard: Wait for billing config to load
    if (isConfigLoading) {
      return;
    }

    // Guard: Handle config fetch errors (check before billingConfig to ensure error state is set)
    if (configError) {
      console.error("Failed to fetch billing config:", configError);
      setError(new Error("Failed to load payment configuration"));
      return;
    }

    // Guard: Wait for billing config data
    if (!billingConfig) {
      return;
    }

    // Guard: Only initialize for Paddle
    if (billingConfig.payment_provider !== "paddle") {
      console.warn("Payment provider is not Paddle:", billingConfig.payment_provider);
      return;
    }

    // Guard: Check if Paddle is already initialized
    if (isReady && window.Paddle) {
      return;
    }

    // Wait for Paddle script to load
    const checkPaddle = setInterval(() => {
      if (window.Paddle) {
        try {
          const { client_token, environment = "sandbox" } = billingConfig;

          if (!client_token) {
            console.error("Paddle client_token not provided by backend");
            throw new Error("Paddle client token not configured");
          }

          console.log("Initializing Paddle SDK", {
            environment,
            tokenLength: client_token.length,
            tokenPrefix: client_token.substring(0, 10) + "..."
          });

          // Set environment (sandbox or production)
          window.Paddle.Environment.set(environment);

          // Initialize Paddle with token and event callback
          window.Paddle.Initialize({
            token: client_token,
            eventCallback: (event: PaddleEventData) => {
              console.log("Paddle event:", event.name, event.data);

              // Handle Paddle events and trigger appropriate callbacks
              switch (event.name) {
                case "checkout.completed":
                  // Payment successful
                  checkoutCallbacksRef.current.onSuccess?.({
                    transaction_id: event.data?.transaction_id,
                  });
                  break;

                case "checkout.error":
                  // Payment error
                  checkoutCallbacksRef.current.onError?.(
                    new Error(event.data?.error || "Checkout error")
                  );
                  break;

                case "checkout.closed":
                  // User closed the checkout modal
                  checkoutCallbacksRef.current.onClose?.();
                  break;
              }
            },
          });

          console.log("Paddle SDK initialized successfully");
          setIsReady(true);
          clearInterval(checkPaddle);
        } catch (err) {
          console.error("Failed to initialize Paddle:", err);
          setError(err instanceof Error ? err : new Error("Failed to initialize Paddle"));
          clearInterval(checkPaddle);
        }
      }
    }, 100);

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      if (!window.Paddle) {
        setError(new Error("Paddle SDK failed to load"));
        clearInterval(checkPaddle);
      }
    }, 10000);

    return () => {
      clearInterval(checkPaddle);
      clearTimeout(timeout);
    };
  }, [billingConfig, isConfigLoading, configError, isReady]);

  const openCheckout = (options: PaddleCheckoutOptions) => {
    if (!isReady || !window.Paddle) {
      console.error("Paddle is not ready", { isReady, hasPaddle: !!window.Paddle });
      options.onError?.(new Error("Paddle is not ready"));
      return;
    }

    try {
      // Store callbacks in ref so eventCallback can access them
      const { onSuccess, onError, onClose, ...paddleOptions } = options;
      checkoutCallbacksRef.current = { onSuccess, onError, onClose };

      console.log("Opening Paddle checkout with options:", paddleOptions);

      // Open checkout - callbacks will be triggered via eventCallback
      // Paddle supports both transactionId (from backend) and items (direct)
      window.Paddle.Checkout.open(paddleOptions);
    } catch (err) {
      console.error("Failed to open Paddle checkout:", err);
      options.onError?.(err instanceof Error ? err : new Error("Failed to open checkout"));
    }
  };

  return {
    isReady,
    error,
    openCheckout,
  };
}

