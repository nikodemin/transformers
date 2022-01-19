CREATE FUNCTION check_date_of_build_before()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    flag boolean;
BEGIN
    EXECUTE format(
            'SELECT tr.date_of_build > t.%2$I FROM transformer tr JOIN %3$I t ON tr.id = t.%1$I WHERE tr.id = $1.%1$I',
            tg_argv[0],
            tg_argv[1],
            tg_table_name
        ) USING NEW INTO flag;
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
EXECUTE PROCEDURE check_date_of_build_before('transformer_id', 'service_date');


CREATE TRIGGER upgrade_check_trigger
    BEFORE INSERT
    ON upgrade
    FOR EACH ROW
EXECUTE PROCEDURE check_date_of_build_before('transformer_id', 'date');

CREATE TRIGGER operation_check_trigger
    BEFORE INSERT
    ON operation_transformer
    FOR EACH ROW
EXECUTE PROCEDURE check_operation();
