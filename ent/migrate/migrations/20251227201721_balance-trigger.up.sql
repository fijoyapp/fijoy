-- Trigger function to maintain account balance
CREATE OR REPLACE FUNCTION update_account_balance()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    CASE TG_OP
        WHEN 'INSERT' THEN PERFORM
                               balance
                           FROM account
                           WHERE id = NEW.account_id
                               FOR UPDATE;
                           UPDATE
                               account
                           SET balance = balance + NEW.amount
                           WHERE id = NEW.account_id;
        WHEN 'UPDATE' THEN PERFORM
                               balance
                           FROM account
                           WHERE id = NEW.account_id
                               FOR UPDATE;
                           UPDATE
                               account
                           SET balance = balance + (NEW.amount - OLD.amount)
                           WHERE id = NEW.account_id;
        WHEN 'DELETE' THEN PERFORM
                               balance
                           FROM account
                           WHERE id = OLD.account_id
                               FOR UPDATE;
                           UPDATE
                               account
                           SET balance = balance - OLD.amount
                           WHERE id = OLD.account_id;
        END CASE;
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create the trigger
CREATE TRIGGER transaction_balance_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON TRANSACTION
    FOR EACH ROW
EXECUTE FUNCTION update_account_balance();

