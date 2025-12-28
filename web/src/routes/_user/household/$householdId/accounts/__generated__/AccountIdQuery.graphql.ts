/**
 * @generated SignedSource<<b8d07f05379231dbc0808ddbfaf5afbe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
export type InvestmentType = "crypto" | "stock" | "%future added value";
export type TransactionCategoryType = "expense" | "income" | "transfer" | "%future added value";
export type UserHouseholdRole = "admin" | "member" | "%future added value";
export type TransactionWhereInput = {
  and?: ReadonlyArray<TransactionWhereInput> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  datetime?: any | null | undefined;
  datetimeGT?: any | null | undefined;
  datetimeGTE?: any | null | undefined;
  datetimeIn?: ReadonlyArray<any> | null | undefined;
  datetimeLT?: any | null | undefined;
  datetimeLTE?: any | null | undefined;
  datetimeNEQ?: any | null | undefined;
  datetimeNotIn?: ReadonlyArray<any> | null | undefined;
  description?: string | null | undefined;
  descriptionContains?: string | null | undefined;
  descriptionContainsFold?: string | null | undefined;
  descriptionEqualFold?: string | null | undefined;
  descriptionGT?: string | null | undefined;
  descriptionGTE?: string | null | undefined;
  descriptionHasPrefix?: string | null | undefined;
  descriptionHasSuffix?: string | null | undefined;
  descriptionIn?: ReadonlyArray<string> | null | undefined;
  descriptionIsNil?: boolean | null | undefined;
  descriptionLT?: string | null | undefined;
  descriptionLTE?: string | null | undefined;
  descriptionNEQ?: string | null | undefined;
  descriptionNotIn?: ReadonlyArray<string> | null | undefined;
  descriptionNotNil?: boolean | null | undefined;
  hasCategory?: boolean | null | undefined;
  hasCategoryWith?: ReadonlyArray<TransactionCategoryWhereInput> | null | undefined;
  hasHousehold?: boolean | null | undefined;
  hasHouseholdWith?: ReadonlyArray<HouseholdWhereInput> | null | undefined;
  hasTransactionEntries?: boolean | null | undefined;
  hasTransactionEntriesWith?: ReadonlyArray<TransactionEntryWhereInput> | null | undefined;
  hasUser?: boolean | null | undefined;
  hasUserWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  not?: TransactionWhereInput | null | undefined;
  or?: ReadonlyArray<TransactionWhereInput> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type UserWhereInput = {
  and?: ReadonlyArray<UserWhereInput> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  email?: string | null | undefined;
  emailContains?: string | null | undefined;
  emailContainsFold?: string | null | undefined;
  emailEqualFold?: string | null | undefined;
  emailGT?: string | null | undefined;
  emailGTE?: string | null | undefined;
  emailHasPrefix?: string | null | undefined;
  emailHasSuffix?: string | null | undefined;
  emailIn?: ReadonlyArray<string> | null | undefined;
  emailLT?: string | null | undefined;
  emailLTE?: string | null | undefined;
  emailNEQ?: string | null | undefined;
  emailNotIn?: ReadonlyArray<string> | null | undefined;
  hasAccounts?: boolean | null | undefined;
  hasAccountsWith?: ReadonlyArray<AccountWhereInput> | null | undefined;
  hasHouseholds?: boolean | null | undefined;
  hasHouseholdsWith?: ReadonlyArray<HouseholdWhereInput> | null | undefined;
  hasTransactions?: boolean | null | undefined;
  hasTransactionsWith?: ReadonlyArray<TransactionWhereInput> | null | undefined;
  hasUserHouseholds?: boolean | null | undefined;
  hasUserHouseholdsWith?: ReadonlyArray<UserHouseholdWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: UserWhereInput | null | undefined;
  or?: ReadonlyArray<UserWhereInput> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type HouseholdWhereInput = {
  and?: ReadonlyArray<HouseholdWhereInput> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  hasAccounts?: boolean | null | undefined;
  hasAccountsWith?: ReadonlyArray<AccountWhereInput> | null | undefined;
  hasCurrency?: boolean | null | undefined;
  hasCurrencyWith?: ReadonlyArray<CurrencyWhereInput> | null | undefined;
  hasInvestments?: boolean | null | undefined;
  hasInvestmentsWith?: ReadonlyArray<InvestmentWhereInput> | null | undefined;
  hasTransactions?: boolean | null | undefined;
  hasTransactionsWith?: ReadonlyArray<TransactionWhereInput> | null | undefined;
  hasUserHouseholds?: boolean | null | undefined;
  hasUserHouseholdsWith?: ReadonlyArray<UserHouseholdWhereInput> | null | undefined;
  hasUsers?: boolean | null | undefined;
  hasUsersWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  locale?: string | null | undefined;
  localeContains?: string | null | undefined;
  localeContainsFold?: string | null | undefined;
  localeEqualFold?: string | null | undefined;
  localeGT?: string | null | undefined;
  localeGTE?: string | null | undefined;
  localeHasPrefix?: string | null | undefined;
  localeHasSuffix?: string | null | undefined;
  localeIn?: ReadonlyArray<string> | null | undefined;
  localeLT?: string | null | undefined;
  localeLTE?: string | null | undefined;
  localeNEQ?: string | null | undefined;
  localeNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: HouseholdWhereInput | null | undefined;
  or?: ReadonlyArray<HouseholdWhereInput> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type CurrencyWhereInput = {
  and?: ReadonlyArray<CurrencyWhereInput> | null | undefined;
  code?: string | null | undefined;
  codeContains?: string | null | undefined;
  codeContainsFold?: string | null | undefined;
  codeEqualFold?: string | null | undefined;
  codeGT?: string | null | undefined;
  codeGTE?: string | null | undefined;
  codeHasPrefix?: string | null | undefined;
  codeHasSuffix?: string | null | undefined;
  codeIn?: ReadonlyArray<string> | null | undefined;
  codeLT?: string | null | undefined;
  codeLTE?: string | null | undefined;
  codeNEQ?: string | null | undefined;
  codeNotIn?: ReadonlyArray<string> | null | undefined;
  hasAccounts?: boolean | null | undefined;
  hasAccountsWith?: ReadonlyArray<AccountWhereInput> | null | undefined;
  hasHouseholds?: boolean | null | undefined;
  hasHouseholdsWith?: ReadonlyArray<HouseholdWhereInput> | null | undefined;
  hasInvestments?: boolean | null | undefined;
  hasInvestmentsWith?: ReadonlyArray<InvestmentWhereInput> | null | undefined;
  hasTransactionEntries?: boolean | null | undefined;
  hasTransactionEntriesWith?: ReadonlyArray<TransactionEntryWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  not?: CurrencyWhereInput | null | undefined;
  or?: ReadonlyArray<CurrencyWhereInput> | null | undefined;
};
export type AccountWhereInput = {
  and?: ReadonlyArray<AccountWhereInput> | null | undefined;
  balance?: string | null | undefined;
  balanceGT?: string | null | undefined;
  balanceGTE?: string | null | undefined;
  balanceIn?: ReadonlyArray<string> | null | undefined;
  balanceLT?: string | null | undefined;
  balanceLTE?: string | null | undefined;
  balanceNEQ?: string | null | undefined;
  balanceNotIn?: ReadonlyArray<string> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  hasCurrency?: boolean | null | undefined;
  hasCurrencyWith?: ReadonlyArray<CurrencyWhereInput> | null | undefined;
  hasHousehold?: boolean | null | undefined;
  hasHouseholdWith?: ReadonlyArray<HouseholdWhereInput> | null | undefined;
  hasInvestments?: boolean | null | undefined;
  hasInvestmentsWith?: ReadonlyArray<InvestmentWhereInput> | null | undefined;
  hasTransactionEntries?: boolean | null | undefined;
  hasTransactionEntriesWith?: ReadonlyArray<TransactionEntryWhereInput> | null | undefined;
  hasUser?: boolean | null | undefined;
  hasUserWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: AccountWhereInput | null | undefined;
  or?: ReadonlyArray<AccountWhereInput> | null | undefined;
  type?: AccountType | null | undefined;
  typeIn?: ReadonlyArray<AccountType> | null | undefined;
  typeNEQ?: AccountType | null | undefined;
  typeNotIn?: ReadonlyArray<AccountType> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type TransactionEntryWhereInput = {
  amount?: string | null | undefined;
  amountGT?: string | null | undefined;
  amountGTE?: string | null | undefined;
  amountIn?: ReadonlyArray<string> | null | undefined;
  amountLT?: string | null | undefined;
  amountLTE?: string | null | undefined;
  amountNEQ?: string | null | undefined;
  amountNotIn?: ReadonlyArray<string> | null | undefined;
  and?: ReadonlyArray<TransactionEntryWhereInput> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  hasAccount?: boolean | null | undefined;
  hasAccountWith?: ReadonlyArray<AccountWhereInput> | null | undefined;
  hasCurrency?: boolean | null | undefined;
  hasCurrencyWith?: ReadonlyArray<CurrencyWhereInput> | null | undefined;
  hasTransaction?: boolean | null | undefined;
  hasTransactionWith?: ReadonlyArray<TransactionWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  not?: TransactionEntryWhereInput | null | undefined;
  or?: ReadonlyArray<TransactionEntryWhereInput> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type InvestmentWhereInput = {
  amount?: string | null | undefined;
  amountGT?: string | null | undefined;
  amountGTE?: string | null | undefined;
  amountIn?: ReadonlyArray<string> | null | undefined;
  amountLT?: string | null | undefined;
  amountLTE?: string | null | undefined;
  amountNEQ?: string | null | undefined;
  amountNotIn?: ReadonlyArray<string> | null | undefined;
  and?: ReadonlyArray<InvestmentWhereInput> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  hasAccount?: boolean | null | undefined;
  hasAccountWith?: ReadonlyArray<AccountWhereInput> | null | undefined;
  hasCurrency?: boolean | null | undefined;
  hasCurrencyWith?: ReadonlyArray<CurrencyWhereInput> | null | undefined;
  hasHousehold?: boolean | null | undefined;
  hasHouseholdWith?: ReadonlyArray<HouseholdWhereInput> | null | undefined;
  hasLots?: boolean | null | undefined;
  hasLotsWith?: ReadonlyArray<LotWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: InvestmentWhereInput | null | undefined;
  or?: ReadonlyArray<InvestmentWhereInput> | null | undefined;
  symbol?: string | null | undefined;
  symbolContains?: string | null | undefined;
  symbolContainsFold?: string | null | undefined;
  symbolEqualFold?: string | null | undefined;
  symbolGT?: string | null | undefined;
  symbolGTE?: string | null | undefined;
  symbolHasPrefix?: string | null | undefined;
  symbolHasSuffix?: string | null | undefined;
  symbolIn?: ReadonlyArray<string> | null | undefined;
  symbolLT?: string | null | undefined;
  symbolLTE?: string | null | undefined;
  symbolNEQ?: string | null | undefined;
  symbolNotIn?: ReadonlyArray<string> | null | undefined;
  type?: InvestmentType | null | undefined;
  typeIn?: ReadonlyArray<InvestmentType> | null | undefined;
  typeNEQ?: InvestmentType | null | undefined;
  typeNotIn?: ReadonlyArray<InvestmentType> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type LotWhereInput = {
  amount?: string | null | undefined;
  amountGT?: string | null | undefined;
  amountGTE?: string | null | undefined;
  amountIn?: ReadonlyArray<string> | null | undefined;
  amountLT?: string | null | undefined;
  amountLTE?: string | null | undefined;
  amountNEQ?: string | null | undefined;
  amountNotIn?: ReadonlyArray<string> | null | undefined;
  and?: ReadonlyArray<LotWhereInput> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  datetime?: any | null | undefined;
  datetimeGT?: any | null | undefined;
  datetimeGTE?: any | null | undefined;
  datetimeIn?: ReadonlyArray<any> | null | undefined;
  datetimeLT?: any | null | undefined;
  datetimeLTE?: any | null | undefined;
  datetimeNEQ?: any | null | undefined;
  datetimeNotIn?: ReadonlyArray<any> | null | undefined;
  hasInvestment?: boolean | null | undefined;
  hasInvestmentWith?: ReadonlyArray<InvestmentWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  not?: LotWhereInput | null | undefined;
  or?: ReadonlyArray<LotWhereInput> | null | undefined;
  price?: string | null | undefined;
  priceGT?: string | null | undefined;
  priceGTE?: string | null | undefined;
  priceIn?: ReadonlyArray<string> | null | undefined;
  priceLT?: string | null | undefined;
  priceLTE?: string | null | undefined;
  priceNEQ?: string | null | undefined;
  priceNotIn?: ReadonlyArray<string> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type UserHouseholdWhereInput = {
  and?: ReadonlyArray<UserHouseholdWhereInput> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  not?: UserHouseholdWhereInput | null | undefined;
  or?: ReadonlyArray<UserHouseholdWhereInput> | null | undefined;
  role?: UserHouseholdRole | null | undefined;
  roleIn?: ReadonlyArray<UserHouseholdRole> | null | undefined;
  roleNEQ?: UserHouseholdRole | null | undefined;
  roleNotIn?: ReadonlyArray<UserHouseholdRole> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type TransactionCategoryWhereInput = {
  and?: ReadonlyArray<TransactionCategoryWhereInput> | null | undefined;
  createTime?: any | null | undefined;
  createTimeGT?: any | null | undefined;
  createTimeGTE?: any | null | undefined;
  createTimeIn?: ReadonlyArray<any> | null | undefined;
  createTimeLT?: any | null | undefined;
  createTimeLTE?: any | null | undefined;
  createTimeNEQ?: any | null | undefined;
  createTimeNotIn?: ReadonlyArray<any> | null | undefined;
  hasTransactions?: boolean | null | undefined;
  hasTransactionsWith?: ReadonlyArray<TransactionWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: TransactionCategoryWhereInput | null | undefined;
  or?: ReadonlyArray<TransactionCategoryWhereInput> | null | undefined;
  type?: TransactionCategoryType | null | undefined;
  typeIn?: ReadonlyArray<TransactionCategoryType> | null | undefined;
  typeNEQ?: TransactionCategoryType | null | undefined;
  typeNotIn?: ReadonlyArray<TransactionCategoryType> | null | undefined;
  updateTime?: any | null | undefined;
  updateTimeGT?: any | null | undefined;
  updateTimeGTE?: any | null | undefined;
  updateTimeIn?: ReadonlyArray<any> | null | undefined;
  updateTimeLT?: any | null | undefined;
  updateTimeLTE?: any | null | undefined;
  updateTimeNEQ?: any | null | undefined;
  updateTimeNotIn?: ReadonlyArray<any> | null | undefined;
};
export type AccountIdQuery$variables = {
  where?: TransactionWhereInput | null | undefined;
};
export type AccountIdQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"transactionsListFragment">;
};
export type AccountIdQuery = {
  response: AccountIdQuery$data;
  variables: AccountIdQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = {
  "kind": "Variable",
  "name": "where",
  "variableName": "where"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "DATETIME"
    }
  },
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountIdQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "transactionsListFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AccountIdQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionConnection",
        "kind": "LinkedField",
        "name": "transactions",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TransactionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Transaction",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "datetime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TransactionEntry",
                    "kind": "LinkedField",
                    "name": "transactionEntries",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "amount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Account",
                        "kind": "LinkedField",
                        "name": "account",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Currency",
                            "kind": "LinkedField",
                            "name": "currency",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "code",
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "where",
          "orderBy"
        ],
        "handle": "connection",
        "key": "transactionsList_transactions",
        "kind": "LinkedHandle",
        "name": "transactions"
      }
    ]
  },
  "params": {
    "cacheID": "172f2d167faba03ea18cc7946a4f8c58",
    "id": null,
    "metadata": {},
    "name": "AccountIdQuery",
    "operationKind": "query",
    "text": "query AccountIdQuery(\n  $where: TransactionWhereInput\n) {\n  ...transactionsListFragment_3FC4Qo\n}\n\nfragment transactionCardFragment on Transaction {\n  id\n  datetime\n  transactionEntries {\n    id\n    amount\n    account {\n      name\n      currency {\n        code\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment transactionsListFragment_3FC4Qo on Query {\n  transactions(first: 20, where: $where, orderBy: {field: DATETIME, direction: DESC}) {\n    edges {\n      node {\n        id\n        ...transactionCardFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7a08ce0a2e94d8a167a2c173a69c862f";

export default node;
