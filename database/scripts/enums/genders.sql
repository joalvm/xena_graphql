drop type if exists public.genders;

create type genders as enum (
	'MASCULINO',
	'FEMENINO'
);
