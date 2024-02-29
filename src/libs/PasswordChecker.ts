import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        // Handle error
        throw new Error("Failed to hash password");
    }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const isPasswordValid = await argon2.verify(hashedPassword, password);
        return isPasswordValid;
    } catch (error) {
        // Handle error
        throw new Error("Failed to verify password");
    }
}

// Example usage
/*
const password = "myPassword123";

hashPassword(password)
    .then((hashedPassword) => {
        console.log("Hashed password:", hashedPassword);

        // Verify password
        verifyPassword(password, hashedPassword)
            .then((isValid) => {
                console.log("Is password valid:", isValid);
            })
            .catch((error) => {
                console.error(error);
            });
    })
    .catch((error) => {
        console.error(error);
    });
*/
