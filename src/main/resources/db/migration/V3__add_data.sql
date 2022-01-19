insert into modification (name, affected_body_part, cost)
VALUES
    ('Grenade gun', 'hand', 3000),
    ('Two Edged Blade', 'hand', 2100),
    ('Ultra Wheels', 'legs', 4000);

insert into base (name, latitude, longitude)
values
    ('New castle', 30.43, 544.2),
    ('Camelia', 900.2, -43.6);

insert into transformer (name, date_of_build, height, weight, base_id, hiring_date, post)
values
    ('Optimus Prime', now() - interval '100 years', 10, 4500, 1, now() - interval '80 years', 'GENERAL'),
    ('Bumblbee', now() - interval '80 years', 9, 4000, 1, now() - interval '65 years', 'COLONEL'),
    ('Megatron', now() - interval '120 years', 9, 4000, 2, now() - interval '100 years', 'GENERAL'),
    ('Starscream', now() - interval '100 years', 9, 4000, 2, now() - interval '75 years', 'COLONEL');

insert into upgrade (date, check_date, transformer_id)
VALUES
    (now() - interval '70 years', now() - interval '70 years', 1),
    (now() - interval '60 years', now() - interval '60 years', 1),
    (now() - interval '100 years', now() - interval '100 years', 3);

insert into upgrade_modification (upgrade_id, modification_id)
VALUES
    (1, 2),
    (1, 3),
    (3, 1),
    (2, 1);

insert into injury (type, description, date, transformer_id)
VALUES
    ('bullet hole', 'bullet hole received on mega battle', now() - interval '75 years', 1);

insert into transport (name, status, type)
VALUES
    ('Jeep', 'OK', 'GROUND'),
    ('Scavenger', 'Almost ok', 'AIR');

insert into inspection (service_date, description, transformer_id, transport_id)
VALUES
    (now() - interval '70 years', 'basic check', 1, 1),
    (now() - interval '69 years', 'basic check', 1, 2);

insert into battle_field (name, terrain)
VALUES
    ('wasteland', 'DESERT'),
    ('wonderland', 'PLAIN');

insert into operation (name, start_date, end_date, enemy, battle_field_id)
VALUES
    ('battle 1', now() - interval '60 years', now() - interval '59 years', 'chickens', 1);

insert into operation_transformer (operation_id, transformer_id)
VALUES
    (1, 1),
    (1, 2);

insert into transport_operation (transport_id, operation_id)
VALUES
    (1, 1);

insert into weapon (name, type, caliber, rate_of_fire, range_of_fire)
VALUES
    ('sniper rifle', 'rifle', 'MG50', 10, 1000),
    ('shotgun', 'shotgun', '30', 20, 70);

insert into energon (capacity_left, type, kkal, weight)
VALUES
    (300, 'DARK', 30, 3),
    (430, 'BRIGHT', 44, 4);


insert into position (longitude, latitude, weapon_id, energon_id, battle_field_id, transformer_id, squad)
VALUES
    (34.5, 452, 1, 1, 2, 1, 'GROUND'),
    (45.5, 32, 2, 2, 2, 2, 'AIR');

INSERT INTO equipment (position_id, name, type, quantity, take_date)
VALUES
    (1, 'medkit', 'other', 2, now() - interval '60 years'),
    (1, 'ammo', 'other', 40, now() - interval '60 years'),
    (2, 'medkit', 'other', 4, now() - interval '60 years'),
    (2, 'ammo', 'other', 30, now() - interval '60 years');


