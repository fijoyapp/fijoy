CREATE OR REPLACE FUNCTION update_account_balance_and_value_on_transaction_entry_change()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
DECLARE
    -- Variables to help with sorting locks
    first_account_id  INT;
    second_account_id INT;
BEGIN
    CASE TG_OP
        WHEN 'INSERT' THEN UPDATE accounts
                           SET balance = balance + NEW.amount,
                               value   = value + NEW.amount
                           WHERE id = NEW.account_id;

        WHEN 'DELETE' THEN UPDATE accounts
                           SET balance = balance - OLD.amount,
                               value   = value - OLD.amount
                           WHERE id = OLD.account_id;

        WHEN 'UPDATE'
            THEN -- 1. Check if the Account ID (Foreign Key) is the same
            IF NEW.account_id =
               OLD.account_id THEN
                -- Same account: Just apply the difference in amount
                UPDATE accounts
                SET balance = balance + (NEW.amount - OLD.amount),
                    value   = value + (NEW.amount - OLD.amount)
                WHERE id = NEW.account_id;

            ELSE -- 2. The Account ID changed. We must update TWO accounts.
            -- We must enforce Locking Order (Low ID -> High ID) to avoid deadlocks.

                IF OLD.account_id <
                   NEW.account_id THEN
                    first_account_id := OLD.account_id;
                    second_account_id := NEW.account_id;
                ELSE
                    first_account_id := NEW.account_id;
                    second_account_id := OLD.account_id;
                END IF;

                -- UPDATE THE FIRST (LOWER ID) ACCOUNT
                IF first_account_id = OLD.account_id THEN
                    UPDATE accounts
                    SET balance = balance - OLD.amount,
                        value   = value - OLD.amount
                    WHERE id = first_account_id;
                ELSE
                    UPDATE accounts
                    SET balance = balance + NEW.amount,
                        value   = value + NEW.amount
                    WHERE id = first_account_id;
                END IF;

                -- UPDATE THE SECOND (HIGHER ID) ACCOUNT
                IF second_account_id = OLD.account_id THEN
                    UPDATE accounts
                    SET balance = balance - OLD.amount,
                        value   = value - OLD.amount
                    WHERE id = second_account_id;
                ELSE
                    UPDATE accounts
                    SET balance = balance + NEW.amount,
                        value   = value + NEW.amount
                    WHERE id = second_account_id;
                END IF;
            END IF;
        END CASE;

    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create the trigger
CREATE TRIGGER transaction_balance_and_value_on_transaction_entry_change_trigger
    AFTER INSERT OR UPDATE OF amount OR DELETE
    ON transaction_entries
    FOR EACH ROW
EXECUTE FUNCTION update_account_balance_and_value_on_transaction_entry_change();
