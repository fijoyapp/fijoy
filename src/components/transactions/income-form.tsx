import { type UseFormReturn } from "react-hook-form";
import { type formSchema } from "./new-transaction";
import { type z } from "zod";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

const IncomeForm = ({ form }: Props) => {
  return <div>IncomeForm</div>;
};

export default IncomeForm;
