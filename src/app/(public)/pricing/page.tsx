"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { PricingCard } from "@/components/pricing/pricing-card";
import { usePaddle } from "@/hooks/use-paddle";
import { useCreateCheckoutSession } from "@/services/billing/mutations";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export default function PricingPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth0();
	const {
		isReady: isPaddleReady,
		openCheckout,
		error: paddleError,
	} = usePaddle();
	const { mutate: createCheckout, isPending: isCreatingCheckout } =
		useCreateCheckoutSession();
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

	const cancelled = searchParams.get("cancelled");

	useEffect(() => {
		// Show toast if user cancelled checkout
		// URL will have ?cancelled=true when user cancels
		if (cancelled === "true") {
			toast.info("Checkout cancelled. You can upgrade anytime!");
		}
	}, [cancelled]);

	const handleFreeTierClick = () => {
		// Guard: Redirect to login if not authenticated
		if (!isAuthenticated) {
			router.push(ROUTES.LOGIN);
			return;
		}

		router.push(ROUTES.HOME);
	};

	const handleProClick = () => {
		// Guard: Redirect to login if not authenticated
		if (!isAuthenticated) {
			router.push(ROUTES.LOGIN);
			return;
		}

		// Guard: Check if Paddle is ready
		if (!isPaddleReady) {
			toast.error("Payment system is loading. Please try again in a moment.");
			return;
		}

		// Guard: Check for Paddle errors
		if (paddleError) {
			toast.error("Payment system unavailable. Please try again later.");
			console.error("Paddle error:", paddleError);
			return;
		}

		// Step 1: Create checkout session via backend
		// Backend calls Paddle API with proper server-side credentials
		createCheckout(
			{
				success_url: `${window.location.origin}${ROUTES.CHECKOUT_RETURN}?status=success`,
				cancel_url: `${window.location.origin}${ROUTES.PRICING}?cancelled=true`,
			},
			{
				onSuccess: (response) => {
					// Step 2: Get transaction ID from backend response
					// Backend returns session_id which is the Paddle transaction ID
					const { session_id } = response;

					if (!session_id) {
						toast.error("Invalid checkout session. Please try again.");
						return;
					}

					// Mark checkout as open
					setIsCheckoutOpen(true);

					// Step 3: Open Paddle inline modal with transaction ID
					// This uses the session created by our backend
					openCheckout({
						transactionId: session_id,
						settings: {
							displayMode: "overlay",
							theme: "light",
						},
						onSuccess: (data) => {
							// Called when Paddle fires "checkout.completed" event
							// Redirect to success page immediately
							const returnUrl = data.transaction_id
								? `${ROUTES.CHECKOUT_RETURN}?status=success&_ptxn=${data.transaction_id}`
								: `${ROUTES.CHECKOUT_RETURN}?status=success`;
							router.push(returnUrl);
						},
						onError: (error) => {
							// Called when Paddle fires "checkout.error" event
							setIsCheckoutOpen(false);
							toast.error("Payment failed. Please try again.");
							console.error("Paddle checkout error:", error);
						},
						onClose: () => {
							// Called when user closes the modal
							setIsCheckoutOpen(false);
						},
					});
				},
				onError: (error) => {
					toast.error("Failed to start checkout. Please try again.");
					console.error("Checkout creation error:", error);
				},
			},
		);
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-3xl space-y-6">
				<div className="space-y-1.5 text-center">
					<h1 className="text-3xl font-semibold tracking-tight">
						Choose Your Plan
					</h1>
					<p className="text-sm text-muted-foreground">
						Start free, upgrade when you need more
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<PricingCard
						title="Free"
						description="Perfect for getting started"
						price="$0"
						priceDescription="forever"
						features={[
							"3 mindmaps maximum",
							"Up to 100 nodes per mindmap",
							"Rich text editing",
							"Export capabilities",
						]}
						buttonText={isAuthenticated ? "Current Plan" : "Get Started"}
						buttonVariant="outline"
						onButtonClick={handleFreeTierClick}
						isLoading={isAuthLoading}
					/>

					<PricingCard
						title="Pro"
						description="For power users and professionals"
						price="$2.99"
						priceDescription="/month"
						features={[
							"Unlimited mindmaps",
							"Up to 600+ nodes per mindmap",
							"Priority support",
							"Advanced export options",
						]}
						buttonText={
							isCreatingCheckout
								? "Creating session..."
								: isCheckoutOpen
									? "Opening checkout..."
									: "Upgrade to Pro"
						}
						buttonVariant="default"
						onButtonClick={handleProClick}
						isPopular
						isLoading={
							isCreatingCheckout ||
							isCheckoutOpen ||
							isAuthLoading ||
							!isPaddleReady
						}
					/>
				</div>

				<p className="text-center text-xs text-muted-foreground/70">
					All plans include automatic saves and secure cloud storage
				</p>
			</div>
		</div>
	);
}
