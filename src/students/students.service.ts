import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';

@Injectable()
export class StudentsService {
  private students: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[] = [];

  private nextId = 1;

  create(createStudentDto: CreateStudentDto) {
    const student = {
      id: this.nextId++,
      ...createStudentDto,
    };

    this.students.push(student);
    return student;
  }

  findAll() {
    return this.students;
  }

  findOne(id: number) {
    const student = this.students.find(
      (student) => student.id === id,
    );

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = this.findOne(id);
    Object.assign(student, updateStudentDto);
    return student;
  }

  remove(id: number) {
    const student = this.findOne(id);

    this.students = this.students.filter(
      (student) => student.id !== id,
    );

    return student;
  }
}