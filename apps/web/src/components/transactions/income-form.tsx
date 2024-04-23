import { type UseFormReturn } from "react-hook-form";
import { type formSchema } from "./new-transaction";
import { type TypeOf } from "zod";

type Props = {
  form: UseFormReturn<TypeOf<typeof formSchema>>;
};

const IncomeForm = ({ form }: Props) => {
  console.log(form);
  return <div>IncomeForm</div>;
};

export default IncomeForm;
