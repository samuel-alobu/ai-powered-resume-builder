import { ResumeValues } from "@/lib/validation";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import LoadingButton from "@/components/LoadingButton";
import { WandSparklesIcon } from "lucide-react";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // TODO: Block for non-premium users

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while generating the summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <LoadingButton
      variant="outline"
      type="button"
      loading={loading}
      onClick={handleClick}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
