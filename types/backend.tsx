

export type AssignedChore = {
    id: string;
    choreId: string;
    accountId: string;
    dueDate: string;
    completed: boolean;
    description?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
};

export type Account = {
    householdId: string;
    id: string
    firstName: string;
    lastName: string;
    email: string;
    pictureUrl: string;
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