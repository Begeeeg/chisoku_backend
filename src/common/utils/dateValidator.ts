import { AppError } from "./appError";

export const dateValidator = (dateInput: string | Date): Date => {
    let parsedDate: Date;

    if (dateInput instanceof Date) {
        parsedDate = dateInput;
    } else if (typeof dateInput === "string") {
        const cleanDate = dateInput.split("T")[0];
        const parts = cleanDate.split("-");

        if (parts.length !== 3) {
            throw new AppError("Invalid date format. Use YYYY-MM-DD", 400);
        }

        const [year, month, day] = parts.map(Number);
        parsedDate = new Date(Date.UTC(year, month - 1, day));
    } else {
        throw new AppError("Invalid deadline type", 400);
    }

    if (isNaN(parsedDate.getTime())) {
        throw new AppError("Invalid deadline date", 400);
    }

    // Normalize to UTC date-only
    const normalizedDate = new Date(
        Date.UTC(
            parsedDate.getUTCFullYear(),
            parsedDate.getUTCMonth(),
            parsedDate.getUTCDate()
        )
    );

    const now = new Date();
    const todayUTC = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    if (normalizedDate < todayUTC) {
        throw new AppError("Deadline cannot be in the past", 400);
    }

    return normalizedDate;
};
