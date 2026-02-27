import { Schema } from "mongoose";

export const addAgeVirtual = (userSchema: Schema) => {
    userSchema.virtual("age").get(function () {
        if (!this.birthdate) return null;
        const ageDifMs = Date.now() - this.birthdate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    });
};
