CREATE FUNCTION inspection_check_date_of_build()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    flag boolean;
BEGIN
    SELECT tr.date_of_build > NEW.service_date
    FROM transformer tr
    WHERE tr.id = NEW.transformer_id
    INTO flag;
    IF flag THEN
        RAISE EXCEPTION 'new row violates constraint on date_of_build';
    END IF;
    RETURN NEW;
END ;
$$;

CREATE FUNCTION upgrade_check_date_of_build()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    flag boolean;
BEGIN
    SELECT tr.date_of_build > NEW.date
    FROM transformer tr
    WHERE tr.id = NEW.transformer_id
    INTO flag;
    IF flag THEN
        RAISE EXCEPTION 'new row violates constraint on date_of_build';
    END IF;
    RETURN NEW;
END ;
$$;

CREATE FUNCTION check_operation()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    flag boolean;
BEGIN
    SELECT (SELECT date_of_build FROM transformer WHERE id = NEW.transformer_id) >
           (SELECT start_date FROM operation WHERE id = NEW.operation_id)
    INTO flag;

    IF flag THEN
        RAISE EXCEPTION 'new row violates constraint on date_of_build';
    END IF;
    RETURN NEW;
END ;
$$;

CREATE TRIGGER inspection_check_trigger
    BEFORE INSERT
    ON inspection
    FOR EACH ROW
EXECUTE PROCEDURE inspection_check_date_of_build();


CREATE TRIGGER upgrade_check_trigger
    BEFORE INSERT
    ON upgrade
    FOR EACH ROW
EXECUTE PROCEDURE upgrade_check_date_of_build();

CREATE TRIGGER operation_check_trigger
    BEFORE INSERT
    ON operation_transformer
    FOR EACH ROW
EXECUTE PROCEDURE check_operation();
