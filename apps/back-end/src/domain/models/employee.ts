import { Schema, model, Document } from 'mongoose';

interface IEmployee extends Document {
    name: string;
    position: string;
    department: string;
    salary: number;
}

const employeeSchema = new Schema<IEmployee>({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true }
});

const Employee = model<IEmployee>('Employee', employeeSchema);

export default Employee;
