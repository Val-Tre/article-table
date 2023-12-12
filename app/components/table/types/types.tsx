export type TypeGetTableProps = {
    apiLimit: number
}

export type TypeApiResponse = {
    responseTime: number,
    limit: string,
    offset: number,
    list: {
        id: string;
        boolean: boolean;
        phone: string;
        date: number;
        tags: string[];
        sex: string;
        firstname: string;
        surname: string;
        email: string;
        title: string;
        intro: string;
        body: string;
        personal_code: number;
        image: {
            large: string;
            medium: string;
            small: string;
            alt: string;
            title: string;
        };
        images: {
            large: string;
            medium: string;
            small: string;
            alt: string;
            title: string;
        }[];
    
    }[];
}

export type TypeNewDataArray = {
    id: string;
    firstname: string;
    surname: string;
    sex: string;
    date: string;
    phone: string;
    image: string; 
    intro: string;
};