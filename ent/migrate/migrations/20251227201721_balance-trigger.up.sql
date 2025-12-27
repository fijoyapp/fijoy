CREATE OR REPLACE FUNCTION update_account_balance()
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
                           SET balance = balance + NEW.amount
                           WHERE id = NEW.account_transaction_entries;

        WHEN 'DELETE' THEN UPDATE accounts
                           SET balance = balance - OLD.amount
                           WHERE id = OLD.account_transaction_entries;

        WHEN 'UPDATE'
            THEN -- 1. Check if the Account ID (Foreign Key) is the same
            IF NEW.account_transaction_entries =
               OLD.account_transaction_entries THEN
                -- Same account: Just apply the difference in amount
                UPDATE accounts
                SET balance = balance + (NEW.amount - OLD.amount)
                WHERE id = NEW.account_transaction_entries;

            ELSE -- 2. The Account ID changed. We must update TWO accounts.
            -- We must enforce Locking Order (Low ID -> High ID) to avoid deadlocks.

                IF OLD.account_transaction_entries <
                   NEW.account_transaction_entries THEN
                    first_account_id := OLD.account_transaction_entries;
                    second_account_id := NEW.account_transaction_entries;
                ELSE
                    first_account_id := NEW.account_transaction_entries;
                    second_account_id := OLD.account_transaction_entries;
                END IF;

                -- UPDATE THE FIRST (LOWER ID) ACCOUNT
                IF first_account_id = OLD.account_transaction_entries THEN
                    UPDATE accounts
                    SET balance = balance - OLD.amount
                    WHERE id = first_account_id;
                ELSE
                    UPDATE accounts
                    SET balance = balance + NEW.amount
                    WHERE id = first_account_id;
                END IF;

                -- UPDATE THE SECOND (HIGHER ID) ACCOUNT
                IF second_account_id = OLD.account_transaction_entries THEN
                    UPDATE accounts
                    SET balance = balance - OLD.amount
                    WHERE id = second_account_id;
                ELSE
                    UPDATE accounts
                    SET balance = balance + NEW.amount
                    WHERE id = second_account_id;
                END IF;
            END IF;
        END CASE;

    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create the trigger
CREATE TRIGGER transaction_balance_trigger
    AFTER INSERT OR UPDATE OR DELETE ON transaction_entries
    FOR EACH ROW
    EXECUTE FUNCTION update_account_balance();
