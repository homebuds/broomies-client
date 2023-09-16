

export type AssignedChore = {
    id: string;
    choreId: string;
    accountId: string;
    date: Date;
    completed: boolean;
    choreDescription?: string;
    choreName?: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
};

export type Account = {
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
};

export type Chore = {
    id: string;
    choreDescription: string;
    choreName: string;
};

export type User = {
    id: string;
    householdId: string;
}

export type tempElo = {
    id: string,
    elo: number
}