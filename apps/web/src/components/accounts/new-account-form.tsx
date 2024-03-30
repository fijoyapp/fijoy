import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NewAccountStep, NewAccountSteps } from "@/types/accounts";
import NameStep from "./form-step/name-step";
import TypeStep from "./form-step/type-step";
import InstitutionStep from "./form-step/institution-step";
import BalanceStep from "./form-step/balance-step";
import { Icons } from "../icons";
import _ from "lodash";
import { Link } from "@tanstack/react-router";

type Props = {
  workspace: Workspace;
  step: NewAccountStep;
};

const NewAccountForm = ({ workspace, step }: Props) => {
  const steps = NewAccountSteps.slice(0, NewAccountSteps.indexOf(step) + 1);

  return (
    <div className="">
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((s, index) => {
            if (index === 0) {
              if (s === step) {
                return (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-bold">
                      {_.capitalize(s)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                );
              }
              return (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={"/workspace/$namespace/accounts/"}
                      params={{ namespace: workspace.namespace }}
                      search={{ step: s }}
                      className="font-bold"
                    >
                      {_.capitalize(s)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }

            if (s === step) {
              return (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-bold">
                      {_.capitalize(s)}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              );
            }
            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={"/workspace/$namespace/accounts/"}
                      params={{ namespace: workspace.namespace }}
                      search={{ step: s }}
                      className="font-bold"
                    >
                      {_.capitalize(s)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-1"></div>

      {step === "name" && <NameStep />}
      {step === "type" && <TypeStep />}
      {step === "institution" && <InstitutionStep />}
      {step === "balance" && <BalanceStep />}
      {step === "final" && (
        <div className="flex h-10 items-center gap-2">
          <Icons.spinner />
          <div>Creating your account...</div>
        </div>
      )}
    </div>
  );
};

export default NewAccountForm;
