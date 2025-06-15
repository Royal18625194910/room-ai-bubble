import { Textarea } from "@/components/ui/textarea";

type AdditionPromptProps = {
  selectAdditionPrompt: (prompt: string) => void;
};

const AdditionPrompt = ({ selectAdditionPrompt }: AdditionPromptProps) => {
  return (
    <div className="mt-5">
      <label htmlFor="" className="text-slate-500">
        Enter Additonal Requirments (Optional)
      </label>
      <Textarea
        className="mt-2"
        onInput={(e: any) => selectAdditionPrompt(e.target.value)}
        placeholder="Additional prompt"
      />
    </div>
  );
};

export default AdditionPrompt;
