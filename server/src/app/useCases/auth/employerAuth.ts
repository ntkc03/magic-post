import { employerInterface } from "../../../types/employerInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { employerDbInterface } from "../../repositories/employerDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";

export const createAccount = async (
    employer: employerInterface,
    employerRepository: ReturnType<employerDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    employer.username = employer.username.toLowerCase();
    const isExistingEmail = await employerRepository.getEmployerByUsername(employer.username);
    if (isExistingEmail) {
        throw new AppError("username already exists", HttpStatus.CONFLICT);
    }
    employer.password = await authService.encryptPassword(employer.password ?? "");
    const result = await employerRepository.createEmployer(employer);
    return result;
};