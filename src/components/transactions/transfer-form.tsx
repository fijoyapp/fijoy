import { type UseFormReturn } from "react-hook-form";
import { type formSchema } from "./new-transaction";
import { type z } from "zod";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

const TransferForm = ({ form }: Props) => {
  return <div>TransferForm</div>;
};

export default TransferForm;
