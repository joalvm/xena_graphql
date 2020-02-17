drop type if exists public.marital_status_types;

create type marital_status_types as enum (
  'NO_ESPECIFICADO',
  'SOLTERO',
  'CASADO',
  'CONVIVIENTE',
  'DIVORCIADO',
  'VIUDO'
);
