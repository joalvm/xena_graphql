CREATE TABLE "staff_area" (
    "id" serial4 NOT NULL,
    "code" varchar(3) NOT NULL,
    "name" varchar(80) NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "staff_division" (
    "id" serial4 NOT NULL,
    "code" char(4) NOT NULL,
    "name" varchar(80) NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "cost_centers" (
    "id" serial4 NOT NULL,
    "code" char(10) NOT NULL,
    "name" varchar(80) NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "companies" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "name" varchar(80) NOT NULL,
    "business_name" varchar(100) NOT NULL,
    "ruc" varchar(15) NOT NULL,
    "square_icon" varchar(150),
    "rectangle_icon" varchar(150),
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "employees" (
    "id" serial4 NOT NULL,
    "company_id" int4 NOT NULL,
    "name" varchar(80) NOT NULL,
    "lastname" varchar(80) NOT NULL,
    "gender" "public"."genders" NOT NULL,
    "email" varchar(80),
    "marital_status" "public"."marital_status_types" NOT NULL,
    "document_type_id" int4 NOT NULL,
    "document_number" varchar(20) NOT NULL,
    "date_of_birth" date NOT NULL,
    "date_of_entry" date NOT NULL,
    "phone" varchar(12),
    "mobile" varchar(12),
    "direction" text,
    "staff_area_id" int4 NOT NULL,
    "cost_center_id" int4 NOT NULL,
    "staff_division_id" int4 NOT NULL,
    "organizational_unit_id" int4 NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" timestamptz(0),
    "updated_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "users" (
    "id" serial4 NOT NULL,
    "username" varchar(80) NOT NULL,
    "password" varchar(80) NOT NULL,
    "salt" char(16) NOT NULL,
    "is_admin" bool NOT NULL DEFAULT false,
    "recovery_token" varchar(160),
    "enabled" bool DEFAULT true,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "users_sessions" (
    "id" serial4 NOT NULL,
    "user_id" int4 NOT NULL,
    "token" varchar(180) NOT NULL,
    "expire" timestamptz(0) NOT NULL,
    "ip" varchar(15) NOT NULL,
    "browser" varchar(25),
    "version" varchar(15),
    "platform" varchar(25),
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "closed_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "users_profile" (
    "id" serial4 NOT NULL,
    "users_id" int4 NOT NULL,
    "name" varchar(50) NOT NULL,
    "lastname" varchar(50) NOT NULL,
    "gender" char(1) NOT NULL,
    "email" varchar(80) NOT NULL,
    "avatar_url" text,
    "created_at" timestamptz(0),
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "document_types" (
    "id" serial4 NOT NULL,
    "name" varcar NOT NULL,
    "abbr" varchar(10) NOT NULL,
    "length" numeric(3) NOT NULL,
    "exact_length" bool NOT NULL DEFAULT true,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "organizational_units" (
    "id" serial4 NOT NULL,
    "name" varchar(80) NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY KEY ("id")
);

CREATE TABLE "fishing_vessel" (
    "id" serial4 NOT NULL,
    "name" varchar(25) NOT NULL,
    "created_at" timestamptz(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz(0),
    "deleted_at" timestamptz(0),
    PRIMARY key ("id")
);

CREATE TABLE "fishing_company" (

);


ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_companies_1" FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "users_sessions" ADD CONSTRAINT "fk_users_sessions_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "users_profile" ADD CONSTRAINT "fk_users_profile_users_1" FOREIGN KEY ("users_id") REFERENCES "users" ("id");
ALTER TABLE "companies" ADD CONSTRAINT "fk_companies_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_document_types_1" FOREIGN KEY ("document_type_id") REFERENCES "document_types" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_staff_area_1" FOREIGN KEY ("staff_area_id") REFERENCES "staff_area" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_cost_centers_1" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_staff_division_1" FOREIGN KEY ("staff_division_id") REFERENCES "staff_division" ("id");
ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_organizational_units_1" FOREIGN KEY ("organizational_unit_id") REFERENCES "organizational_units" ("id");

