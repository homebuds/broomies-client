export enum CompletionStatus {
    COMPLETED = 'completed',
    IN_PROGRESS = 'in progress',
    INCOMPLETE = 'incomplete',
  }

export type AssignedChore = {
    id: string;
    choreId: string;
    accountId: string;
    date: Date;
    isCompleted: CompletionStatus;
    choreDescription?: string;
    choreName?: string;
    firstName?: string;
    lastName?: string;
  };
  
  export type Account = {
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  
  export type Chore = {
    id: string;
    choreDescription: string;
    choreName: string;
  };

  