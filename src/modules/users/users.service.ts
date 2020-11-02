import { Language } from "../../types/change-language-body.schema";


export interface User {
    userId: number;
    username: string;
    password: string;
    language: Language;
}

const users = [
    {
        userId: 1,
        username: "john",
        password: "changeme",
        language: Language.en,
    },
    {
        userId: 2,
        username: "chris",
        password: "secret",
        language: Language.en,
    },
    {
        userId: 3,
        username: "maria",
        password: "guess",
        language: Language.en,
    },
];

export async function findUserByName(username: string) {
    return users.find((user) => user.username === username);
}

export async function findUserById(userId: number) {
    return users.find((user) => user.userId === userId);
}
