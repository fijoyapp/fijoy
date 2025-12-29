CREATE OR REPLACE FUNCTION update_investment_value()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.value := NEW.amount * NEW.quote;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER investment_value_trigger
    BEFORE INSERT OR UPDATE OF amount, quote
    ON investments
    FOR EACH ROW
EXECUTE FUNCTION update_investment_value();
