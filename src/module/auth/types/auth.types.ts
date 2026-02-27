export interface SignUpBody {
    givenname: string;
    surname: string;
    birthdate: Date;
    sex: "prefer not to say" | "male" | "female";
    budget: number;
    address: string;
    mobile: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: "user" | "admin";
}

export interface SignInBody {
    identifier: string;
    password: string;
}
