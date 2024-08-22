import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

export function DevnetAlert() {
  return (
    <Alert 
      variant="default" 
      className="flex items-start p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-md" 
      role="alert"
    >
      <TriangleAlertIcon className="mr-3 text-yellow-600" />
      <div>
        <AlertTitle className="text-lg font-semibold">Devnet ONLY</AlertTitle>
        <AlertDescription className="text-sm">
          This example action is configured to run on Solana&apos;s devnet. Ensure your wallet is set to devnet when testing this transaction.
        </AlertDescription>
      </div>
    </Alert>
  );
}
