import { Photo } from './photo';

// this is typescript
export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    dateCreated: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string; // ?optional
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
