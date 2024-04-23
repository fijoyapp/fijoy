import { type UseFormReturn } from "react-hook-form";
import { type formSchema } from "./new-transaction";
import { type TypeOf } from "zod";

type Props = {
  form: UseFormReturn<TypeOf<typeof formSchema>>;
};

const ExpenseForm = ({ form }: Props) => {
  console.log(form);
  return <div>ExpenseForm</div>;
};

export default ExpenseForm;
