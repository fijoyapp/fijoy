import { type UseFormReturn } from "react-hook-form";
import { type formSchema } from "./new-transaction";
import { type z } from "zod";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

const TransferForm = ({ form }: Props) => {
  console.log(form);
  return <div>TransferForm</div>;
};

export default TransferForm;
