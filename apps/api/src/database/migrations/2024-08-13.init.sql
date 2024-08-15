CREATE TABLE shop
(
  id serial PRIMARY KEY,
  "name" text NOT NULL,
  phone_number varchar(15) NOT NULL
);

CREATE TABLE car_brand
(
  id serial PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE car
(
  id serial PRIMARY KEY,
  brand_id integer NOT NULL REFERENCES car_brand (id) ON DELETE CASCADE,
  model text NOT NULL,
  price integer NOT NULL,
  shop_id integer NOT NULL REFERENCES shop (id) ON DELETE CASCADE
);
