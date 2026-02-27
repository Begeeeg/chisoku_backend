export interface ExpenselistBody {
    title: string;
    category: "fixed" | "variable" | "optional";
    recurrence: "once" | "weekly" | "fortnight" | "monthly";
    amount: number;
    deadline: Date;
}
