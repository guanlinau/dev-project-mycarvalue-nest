import { Expose } from "class-transformer";

export class OutputUserDto {
    @Expose()
    id: number;
    @Expose()
    email: string
}