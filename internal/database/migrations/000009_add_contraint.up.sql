ALTER TABLE "fijoy_account" ADD CONSTRAINT "fijoy_account_workspace_id_fijoy_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "fijoy_workspace" ("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "fijoy_category" ADD CONSTRAINT "fijoy_category_workspace_id_fijoy_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "fijoy_workspace" ("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "fijoy_transaction" ADD CONSTRAINT "fijoy_transaction_from_account_id_fijoy_account_id_fk" FOREIGN KEY ("from_account_id") REFERENCES "fijoy_account" ("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "fijoy_transaction" ADD CONSTRAINT "fijoy_transaction_to_account_id_fijoy_account_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "fijoy_account" ("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "fijoy_transaction" ADD CONSTRAINT "fijoy_transaction_category_id_fijoy_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "fijoy_category" ("id") ON DELETE set null ON UPDATE no action;

ALTER TABLE "fijoy_transaction" ADD CONSTRAINT "workspace_user_reference" FOREIGN KEY ("workspace_id", "user_id") REFERENCES "fijoy_workspace_user" ("workspace_id", "user_id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "fijoy_workspace_user" ADD CONSTRAINT "fijoy_workspace_user_workspace_id_fijoy_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "fijoy_workspace" ("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "fijoy_workspace_user" ADD CONSTRAINT "fijoy_workspace_user_user_id_fijoy_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "fijoy_user" ("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "fijoy_user_key" ADD CONSTRAINT "fijoy_user_key_user_id_fijoy_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "fijoy_user" ("id") ON DELETE cascade ON UPDATE no action;
