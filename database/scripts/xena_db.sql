CREATE TABLE "staff_area" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "code" varchar NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "staff_division" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "code" char(4) NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "cost_centers" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "code" char(10) NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "companies" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "name" varchar NOT NULL,
    "business_name" varchar NOT NULL,
    "ruc" varchar NOT NULL,
    "square_icon" varchar NULL,
    "rectangle_icon" varchar NULL,
    "is_default" bool DEFAULT FALSE,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "employees" (
    "id" serial4 NOT NULL,
    "company_id" int4 NOT NULL,
    "person_id" int4 NOT NULL,
    "code" varchar(15),
    "date_entry" date,
    "email" varchar NULL,
    "company_position_id" int4 NOT NULL,
    "staff_area_id" int4 NOT NULL,
    "cost_center_id" int4 NOT NULL,
    "staff_division_id" int4 NOT NULL,
    "organizational_unit_id" int4 NOT NULL,
    "eps_affiliate" bool,
    "eps_plan" varchar(50),
    "eps_option" varchar(20),
    "affiliated" bool,
    "sctr_affiliate" bool,
    "ev_affiliate" bool,
    "boss" int4,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

COMMENT ON COLUMN "employees"."ev_affiliate" IS 'essalud vida';

CREATE TABLE "users" (
    "id" serial4 NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    "salt" char(16) NOT NULL,
    "is_admin" bool NOT NULL DEFAULT false,
    "recovery_token" varchar NULL,
    "enabled" bool DEFAULT true,
    "name" varchar NOT NULL,
    "lastname" varchar NOT NULL,
    "gender" "public"."genders" NOT NULL,
    "email" varchar NOT NULL,
    "avatar_url" varchar NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "users_sessions" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "token" varchar NOT NULL,
    "expire" timestamptz(0) NOT NULL,
    "ip" varchar NOT NULL,
    "browser" varchar NULL,
    "version" varchar NULL,
    "platform" varchar NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "closed_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "document_types" (
    "id" serial4 NOT NULL,
    "name" varchar NOT NULL,
    "abbr" varchar NOT NULL,
    "length" numeric(3) NOT NULL,
    "exact_length" bool NOT NULL DEFAULT true,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "organizational_units" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "users_collaborators" (
    "id" serial4 NOT NULL,
    "user_id" int4,
    "company_id" int4,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id") 
);

CREATE TABLE "fishing_vessels" (
    "id" serial4 NOT NULL,
    "company_id" int4 NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "fishing_company_parameters" (
    "id" serial4 NOT NULL,
    "employee_id" int4 NOT NULL,
    "fishing_vessel_id" int4,
    "fishing_part" numeric(3),
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "company_positions" (
    "id" serial4 NOT NULL,
    "company_id" int4 NOT NULL,
    "name" varchar NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "departments" (
    "id" serial4 NOT NULL,
    "name" varchar NOT NULL,
    "code" char(2) NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "provinces" (
    "id" serial4 NOT NULL,
    "department_id" int4 NOT NULL,
    "name" varchar NOT NULL,
    "code" char(4) NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "districts" (
    "id" serial4 NOT NULL,
    "province_id" int4 NOT NULL,
    "name" varchar NOT NULL,
    "code" char(6) NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);

CREATE TABLE "persons" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "name" varchar NOT NULL,
    "lastname" varchar NOT NULL,
    "gender" "public"."genders" NOT NULL,
    "marital_status" "public"."marital_status_types" NOT NULL,
    "document_type_id" int4 NOT NULL,
    "document_number" varchar NOT NULL,
    "date_of_birth" date NOT NULL,
    "district_id" int4,
    "direction" text,
    "phone" varchar NULL,
    "mobile" varchar NULL,
    "email" varchar NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id") 
);


ALTER TABLE "users_sessions" ADD CONSTRAINT "fk_users_sessions_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "companies" ADD CONSTRAINT "fk_companies_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_companies_1" FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_staff_area_1" FOREIGN KEY ("staff_area_id") REFERENCES "staff_area" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_cost_centers_1" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_staff_division_1" FOREIGN KEY ("staff_division_id") REFERENCES "staff_division" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_organizational_units_1" FOREIGN KEY ("organizational_unit_id") REFERENCES "organizational_units" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_company_positions_1" FOREIGN KEY ("company_position_id") REFERENCES "company_positions" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_persons_1" FOREIGN KEY ("person_id") REFERENCES "persons" ("id");

ALTER TABLE "users_collaborators" ADD CONSTRAINT "fk_users_collaborators_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "users_collaborators" ADD CONSTRAINT "fk_users_collaborators_companies_1" FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "fishing_company_parameters" ADD CONSTRAINT "fk_fishing_company_parameters_employees_1" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id");
ALTER TABLE "fishing_company_parameters" ADD CONSTRAINT "fk_fishing_company_parameters_fishing_vessels_1" FOREIGN KEY ("fishing_vessel_id") REFERENCES "fishing_vessels" ("id");
ALTER TABLE "fishing_vessels" ADD CONSTRAINT "fk_fishing_vessels_companies_1" FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "company_positions" ADD CONSTRAINT "fk_company_positions_companies_1" FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "districts" ADD CONSTRAINT "fk_districts_provinces_1" FOREIGN KEY ("province_id") REFERENCES "provinces" ("id");
ALTER TABLE "provinces" ADD CONSTRAINT "fk_provinces_departments_1" FOREIGN KEY ("department_id") REFERENCES "departments" ("id");
ALTER TABLE "persons" ADD CONSTRAINT "fk_persons_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "persons" ADD CONSTRAINT "fk_persons_districts_1" FOREIGN KEY ("district_id") REFERENCES "districts" ("id");
ALTER TABLE "persons" ADD CONSTRAINT "fk_persons_document_types_1" FOREIGN KEY ("document_type_id") REFERENCES "document_types" ("id");
ALTER TABLE "organizational_units" ADD CONSTRAINT "fk_organizational_units_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "cost_centers" ADD CONSTRAINT "fk_cost_centers_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "staff_area" ADD CONSTRAINT "fk_staff_area_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "staff_division" ADD CONSTRAINT "fk_staff_division_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
