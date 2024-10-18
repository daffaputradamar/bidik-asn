"use server"

import { hashPassword } from "@/lib/utils";
import { db } from "@/db";
import { users } from "@/db/schema";
import { UserRegisterSchema, UserRegisterType } from "@/types/userRegister";

export const RegisterUser = async (form: UserRegisterType) => {
    const parsedBody = UserRegisterSchema.safeParse(form);

    if (!parsedBody.success) {
        throw new Error("Bad Request");
    }

    const { email, password, name, province, city, district, village, phoneNumber } = parsedBody.data;

    const existedUser = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.email, email),
    });

    if (existedUser) {
        throw new Error("Email already exists");
    }

    const passwordHash = await hashPassword(password);
    await db.insert(users).values({ 
        email, 
        name, 
        password: passwordHash, 
        phoneNumber,
        role: "user", 
        provinceCode: province.code, 
        provinceName: province.name, 
        cityCode: city.code, 
        cityName: city.name, 
        districtCode: district.code, 
        districtName: district.name, 
        villageCode: village.code, 
        villageName: village.name
    });

    // revalidatePath("/admin/users");

    return parsedBody.data;
}