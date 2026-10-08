# School Database Design

## 1. Students Table

The `students` table stores information about students in the school database. It contains the student's ID, name, and email address. The `id` column is the primary key, while the `name` and `email` columns cannot be empty. The `email` column is also unique so that two students cannot have the same email address.

## 2. Courses Table

The `courses` table stores information about the courses offered by the school. It contains a unique course ID and the course name. The `id` column is the primary key.

## 3. Enrolments Table

The `enrolments` table records which students are enrolled in which courses. It contains its own primary key, a `student_id` that references the students table, a `course_id` that references the courses table, and the student's grade.

The `UNIQUE (student_id, course_id)` constraint prevents the same student from being enrolled in the same course more than once.

## 4. Relationships

There is a one-to-many relationship between `students` and `enrolments` because one student can have many enrolments, while each enrolment belongs to one student.

There is also a one-to-many relationship between `courses` and `enrolments` because one course can have many enrolments, while each enrolment belongs to one course.

Together, students and courses have a many-to-many relationship. A student can take many courses, and a course can have many students. The `enrolments` table is used as a join table to connect students and courses and store additional information such as grades.

## 5. Index

I would add an index on `enrolments.student_id` because it would make searches for a particular student's enrolments faster, especially when the database contains many records.

## 6. SQL vs NoSQL

I would choose SQL for this school database because the data has clear relationships between students, courses, and enrolments. SQL databases are well suited for structured data and support primary keys, foreign keys, constraints, joins, and transactions. A NoSQL database could be useful for flexible or rapidly changing data structures, but SQL is a better choice for this system because data integrity and relationships are important.
