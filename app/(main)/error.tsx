"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md bg-card/50 backdrop-blur-md border-white/10 shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-destructive opacity-80" />
                    </div>
                    <CardTitle className="text-2xl">Something went wrong</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 rounded-lg bg-black/20 font-mono text-sm text-destructive-foreground break-all">
                        <code>{error.message}</code>
                    </div>
                    <Button
                        onClick={() => reset()}
                        className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        <RefreshCcw className="h-4 w-4" /> Try again
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

// FIXED: Missing Route Boundaries