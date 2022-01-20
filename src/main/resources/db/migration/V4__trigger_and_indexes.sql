CREATE FUNCTION delete_empty_bases()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    DELETE
    FROM base
    WHERE id IN (SELECT b.id
                 FROM base b
                          LEFT JOIN transformer t
                                    on b.id = t.base_id
                 WHERE t.id IS NULL);
    RETURN NEW;
END ;
$$;

CREATE TRIGGER delete_empty_bases_trigger
    AFTER DELETE
    ON transformer
    FOR EACH ROW
EXECUTE PROCEDURE delete_empty_bases();

CREATE UNIQUE INDEX transformer_name_index ON transformer (name);
CREATE UNIQUE INDEX base_name_index ON base (name);
