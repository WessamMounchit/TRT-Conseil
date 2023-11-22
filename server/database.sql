CREATE DATABASE TRT;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES Roles(id)
);

CREATE TABLE candidates (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  cv VARCHAR(255),
  is_active BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recruiters (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255),
  address VARCHAR(255),
  is_active BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE job_postings (
  id SERIAL PRIMARY KEY,
  recruiter_id uuid DEFAULT uuid_generate_v4(),
  job_title VARCHAR(255),
  work_location VARCHAR(255),
  description TEXT,
  consultant_id uuid DEFAULT NULL,
  is_valid BOOLEAN DEFAULT false,
  FOREIGN KEY (recruiter_id) REFERENCES recruiters(user_id) ON DELETE CASCADE,
  FOREIGN KEY (consultant_id) REFERENCES users(id)
);

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  candidate_id uuid DEFAULT uuid_generate_v4(),
  job_posting_id INTEGER,
  consultant_id uuid DEFAULT NULL,
  is_valid BOOLEAN DEFAULT false,
  FOREIGN KEY (candidate_id) REFERENCES candidates(user_id) ON DELETE CASCADE,
  FOREIGN KEY (job_posting_id) REFERENCES job_Postings(id) ON DELETE CASCADE,
  FOREIGN KEY (consultant_id) REFERENCES users(id)
)
INSERT INTO
  roles (id, name)
VALUES
  (1, 'admin'),
  (2, 'consultant'),
  (3, 'recruiter'),
  (4, 'candidate')
INSERT INTO
  users (email, password, role_id)
VALUES
  (
    'admin@gmail.com',
    '$2a$10$IXpahBckQCvPMWqYPnC.keHX1srVbk22PjBinrmq4qNhshDoS3Ib6',
    1
  ),
  (
    'consultant@gmail.com',
    '$2a$10$4ttf7q3QO.jrx3YfwOPpXuiFBT5WD6KjDh.Jyz/sUvOTBwgWVocJu',
    2
  ),
  (
    'recruiter@gmail.com',
    '$2a$10$RFy.gqGQzkQQBkXLLNuIvOHWW8z.njJzJi7d5gHL5OdiZCJOqEt.S',
    3
  ),
  (
    'candidate@gmail.com',
    '$2a$10$EcnqJIo89X1XflhhYaXI.uh67OBmYeBb3NxngdA3Uks6tw3d.wa4K',
    4
  )