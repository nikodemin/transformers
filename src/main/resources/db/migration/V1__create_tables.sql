/* Create Tables */

CREATE TABLE base
(
    id        SERIAL,
    name      varchar(100)     NOT NULL,
    latitude  double precision NOT NULL,
    longitude double precision NOT NULL
)
;

CREATE TABLE battle_field
(
    id      SERIAL,
    name    varchar(50) NOT NULL,
    terrain varchar(50) NOT NULL
)
;

CREATE TABLE energon
(
    id            SERIAL,
    capacity_left integer     NOT NULL,
    type          varchar(50) NOT NULL,
    kkal          integer     NOT NULL,
    weight        integer     NOT NULL
)
;

CREATE TABLE equipment
(
    id          SERIAL,
    position_id int                      NOT NULL,
    name        varchar(50)              NOT NULL,
    type        varchar(50),
    quantity    integer                  NOT NULL,
    take_date   timestamp with time zone NOT NULL
)
;

CREATE TABLE injury
(
    id             SERIAL,
    type           varchar(50)              NOT NULL,
    description    varchar(50)              NOT NULL,
    date           timestamp with time zone NOT NULL,
    transformer_id int                      NOT NULL
)
;

CREATE TABLE inspection
(
    id             SERIAL,
    service_date   timestamp with time zone NOT NULL,
    description    text                     NOT NULL,
    transformer_id int                      NOT NULL,
    transport_id   int                      NOT NULL
)
;

CREATE TABLE modification
(
    id                 SERIAL,
    name               varchar(50),
    affected_body_part varchar(50),
    cost               integer
)
;

CREATE TABLE operation
(
    id              SERIAL,
    name            varchar(50)              NOT NULL,
    start_date      timestamp with time zone NOT NULL,
    end_date        timestamp with time zone,
    enemy           varchar(50)              NOT NULL,
    battle_field_id int                      NOT NULL
)
;

CREATE TABLE operation_transformer
(
    operation_id   int NOT NULL,
    transformer_id int NOT NULL,
    PRIMARY KEY (operation_id, transformer_id)
)
;

CREATE TABLE position
(
    id              SERIAL,
    longitude       double precision NOT NULL,
    latitude        double precision NOT NULL,
    weapon_id       int              NOT NULL,
    energon_id      int              NOT NULL,
    battle_field_id int              NOT NULL,
    transformer_id  int              NOT NULL,
    squad           VARCHAR(50)      NOT NULL
)
;

CREATE TABLE transformer
(
    id            SERIAL,
    name          varchar(50)              NOT NULL,
    date_of_build timestamp with time zone NOT NULL,
    height        integer                  NOT NULL,
    weight        integer                  NOT NULL,
    base_id       int                      NOT NULL,
    hiring_date   timestamp with time zone NOT NULL,
    post          varchar(50)              NOT NULL
)
;

CREATE TABLE transport
(
    id     SERIAL,
    name   varchar(50) NOT NULL,
    status varchar(50) NOT NULL,
    type   varchar(50) NOT NULL
)
;

CREATE TABLE transport_operation
(
    transport_id int NOT NULL,
    operation_id int NOT NULL,
    PRIMARY KEY (transport_id, operation_id)
)
;

CREATE TABLE upgrade
(
    id             SERIAL,
    date           timestamp with time zone NOT NULL,
    check_date     timestamp with time zone,
    transformer_id int                      NOT NULL
)
;

CREATE TABLE upgrade_modification
(
    upgrade_id      int NOT NULL,
    modification_id int NOT NULL,
    PRIMARY KEY (upgrade_id, modification_id)
)
;

CREATE TABLE weapon
(
    id            SERIAL,
    name          varchar(50) NOT NULL,
    type          varchar(50) NOT NULL,
    caliber       varchar(50) NOT NULL,
    rate_of_fire  integer     NOT NULL,
    range_of_fire integer     NOT NULL
)
;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE base
    ADD CONSTRAINT "PK_Base"
        PRIMARY KEY (id)
;

ALTER TABLE battle_field
    ADD CONSTRAINT "PK_battle_field"
        PRIMARY KEY (id)
;

ALTER TABLE energon
    ADD CONSTRAINT "PK_energon"
        PRIMARY KEY (id)
;

ALTER TABLE equipment
    ADD CONSTRAINT "PK_equipment"
        PRIMARY KEY (id)
;

ALTER TABLE inspection
    ADD CONSTRAINT "PK_inspection"
        PRIMARY KEY (id)
;

ALTER TABLE modification
    ADD CONSTRAINT "PK_Modification"
        PRIMARY KEY (id)
;

ALTER TABLE operation
    ADD CONSTRAINT "PK_operation"
        PRIMARY KEY (id)
;

ALTER TABLE position
    ADD CONSTRAINT "PK_position"
        PRIMARY KEY (id)
;

ALTER TABLE transformer
    ADD CONSTRAINT "PK_Transformer"
        PRIMARY KEY (id)
;

ALTER TABLE transport
    ADD CONSTRAINT "PK_transport"
        PRIMARY KEY (id)
;

ALTER TABLE upgrade
    ADD CONSTRAINT "PK_Upgrade"
        PRIMARY KEY (id)
;

ALTER TABLE weapon
    ADD CONSTRAINT "PK_weapon"
        PRIMARY KEY (id)
;

/* Create Foreign Key Constraints */

ALTER TABLE equipment
    ADD CONSTRAINT "FK_equipment_position"
        FOREIGN KEY (position_id) REFERENCES position (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE injury
    ADD CONSTRAINT "FK_Injury_transformer"
        FOREIGN KEY (transformer_id) REFERENCES transformer (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE inspection
    ADD CONSTRAINT "FK_inspection_transformer"
        FOREIGN KEY (transformer_id) REFERENCES transformer (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE inspection
    ADD CONSTRAINT "FK_inspection_transport"
        FOREIGN KEY (transport_id) REFERENCES transport (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE operation
    ADD CONSTRAINT "FK_operation_battle_field"
        FOREIGN KEY (battle_field_id) REFERENCES battle_field (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE operation_transformer
    ADD CONSTRAINT "FK_operation_transformer_transformer"
        FOREIGN KEY (transformer_id) REFERENCES transformer (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE operation_transformer
    ADD CONSTRAINT "FK_operation_transformer_operation"
        FOREIGN KEY (operation_id) REFERENCES operation (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE position
    ADD CONSTRAINT "FK_position_battle_field"
        FOREIGN KEY (battle_field_id) REFERENCES battle_field (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE position
    ADD CONSTRAINT "FK_position_energon"
        FOREIGN KEY (energon_id) REFERENCES energon (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE position
    ADD CONSTRAINT "FK_position_transformer"
        FOREIGN KEY (transformer_id) REFERENCES transformer (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE position
    ADD CONSTRAINT "FK_position_weapon"
        FOREIGN KEY (weapon_id) REFERENCES weapon (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE transformer
    ADD CONSTRAINT "FK_Transformer_Base"
        FOREIGN KEY (base_id) REFERENCES base (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE transport_operation
    ADD CONSTRAINT "FK_transport_operation_operation"
        FOREIGN KEY (operation_id) REFERENCES operation (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE transport_operation
    ADD CONSTRAINT "FK_transport_operation_transport"
        FOREIGN KEY (transport_id) REFERENCES transport (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE upgrade
    ADD CONSTRAINT "FK_upgrade_Transformer"
        FOREIGN KEY (transformer_id) REFERENCES transformer (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE upgrade_modification
    ADD CONSTRAINT "FK_upgrade_modification_modification"
        FOREIGN KEY (modification_id) REFERENCES modification (id) ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE upgrade_modification
    ADD CONSTRAINT "FK_upgrade_modification_upgrade"
        FOREIGN KEY (upgrade_id) REFERENCES upgrade (id) ON DELETE CASCADE ON UPDATE CASCADE
;
