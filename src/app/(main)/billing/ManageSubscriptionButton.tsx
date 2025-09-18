"use client";

import { useToast } from "@/hooks/useToast";
import { createCustomerPortalSession } from "./action";
import { useState } from "react";
import LoadingButton from "@/components/LoadingButton";


export default function ManageSubscriptionButton() {

    const { toast } = useToast();

    const [loading, setLoading] = useState(false)

    async function handleClick() {
        try {
            setLoading(true)
            const redirectUrl = await createCustomerPortalSession();
            window.location.href = redirectUrl;
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive"
                description: "Something went wrong. Please try again.",
            })
        } finally {
            setLoading(false)
        }
    }
    return <LoadingButton onClick={handleClick} loading={loading}>
      Manage Subscription
  </LoadingButton>;
}
