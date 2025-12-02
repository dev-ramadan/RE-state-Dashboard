export type Users = Agent & {
        userId: string,
        username: string,
        email: string,
        phoneNumber: string,
        dateJoined: string,
        avatar?: string
        hasNext: boolean
        items: any
};

export type Broker = {
        id: string,
        nationalID: string,
        licenseID: string,
        user: Users
        items: any

}

export type Agent = Broker & {
        agencyName: string,
        taxIdentificationNumber: number,
        rating: number,
        experienceYears: number,
}

export type UpdateUser = {
        name: string;
        email: string;
        phone: string
}