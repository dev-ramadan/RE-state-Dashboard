export type Users =Agent& {
        userId: string,
        username: string,
        email: string,
        phoneNumber: string,
        dateJoined: string,
        avatar?:string
};

export type Broker =  {
        id: string,
        nationalID: string,
        licenseID: string,
        user:Users
}

export type Agent = Broker & {
        agencyName: string,
        taxIdentificationNumber: number,
        rating: number,
        experienceYears: number,
} 