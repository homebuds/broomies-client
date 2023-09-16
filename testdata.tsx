import { Chore, AssignedChore, Account, CompletionStatus } from './types/backend';

export const chores: Chore[] = [
    {
        id: "c1",
        choreDescription: "Take out the trash",
        choreName: "Trash Duty",
    },
    {
        id: "c2",
        choreDescription: "Wash the dishes",
        choreName: "Dishwashing",
    },
    {
        id: "c3",
        choreDescription: "Vacuum the living room",
        choreName: "Vacuum",
    },
    {
        id: "c4",
        choreDescription: "Clean the bathroom",
        choreName: "Bathroom Cleanup",
    },
];

export const assignedChores: AssignedChore[] = [
    {
        id: "1",
        choreId: "c1",
        accountId: "a1",
        date: new Date("2023-09-16"),
        isCompleted: CompletionStatus.INCOMPLETE,
    },
    {
        id: "2",
        choreId: "c2",
        accountId: "a1",
        date: new Date("2023-09-17"),
        isCompleted: CompletionStatus.COMPLETED,
    },
    {
        id: "3",
        choreId: "c3",
        accountId: "a2",
        date: new Date("2023-09-16"),
        isCompleted: CompletionStatus.INCOMPLETE,
    },
    {
        id: "4",
        choreId: "c4",
        accountId: "a2",
        date: new Date("2023-09-18"),
        isCompleted: CompletionStatus.IN_PROGRESS,
    },
    {
        id: "5",
        choreId: "c1",
        accountId: "a3",
        date: new Date("2023-09-19"),
        isCompleted: CompletionStatus.INCOMPLETE,
    },
    {
        id: "6",
        choreId: "c3",
        accountId: "a4",
        date: new Date("2023-09-16"),
        isCompleted: CompletionStatus.COMPLETED,
    },
    {
        id: "7",
        choreId: "c2",
        accountId: "a3",
        date: new Date("2023-09-20"),
        isCompleted: CompletionStatus.IN_PROGRESS,
    },
    {
        id: "8",
        choreId: "c3",
        accountId: "a4",
        date: new Date("2023-09-16"),
        isCompleted: CompletionStatus.COMPLETED,
    },
    {
        id: "9",
        choreId: "c2",
        accountId: "a3",
        date: new Date("2023-09-20"),
        isCompleted: CompletionStatus.INCOMPLETE,
    },
    {
        id: "10",
        choreId: "c3",
        accountId: "a4",
        date: new Date("2023-09-16"),
        isCompleted: CompletionStatus.COMPLETED,
    },
    {
        id: "11",
        choreId: "c2",
        accountId: "a3",
        date: new Date("2023-09-20"),
        isCompleted: CompletionStatus.IN_PROGRESS,
    },
];

export const accounts: Account[] = [
    {
        accountId: "a1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        photo: "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
    },
    {
        accountId: "a2",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        photo: "https://people.com/thmb/84W5-9FnCb0XLaqaoYwHasY5GwI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(216x0:218x2)/robert-pattinson-435-2-3f3472a03106439abee37574a6b8cef7.jpg"
    },
    {
        accountId: "a3",
        firstName: "Emily",
        lastName: "Smith",
        email: "emily.smith@example.com",
        photo: "https://blush-design.imgix.net/collections/rChdrB8vX8xQJunpDPp8/v16/Master/Avataaar/cropped/Default.svg?w=500&auto=compress&cs=srgb"
    },
    {
        accountId: "a4",
        firstName: "Tom",
        lastName: "Brown",
        email: "tom.brown@example.com",
        photo: "https://marketplace.canva.com/EAFewoMXU-4/1/0/1600w/canva-purple-pink-gradient-man-3d-avatar-0o0qE2T_kr8.jpg"
    },
];