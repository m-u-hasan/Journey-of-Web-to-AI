type User={
    name: string;
    age:number;
};

type Role ={
    role: 'admin'|'user',
};

type userWithRole =User & Role;
const user1:User={
    name:"Mr.X",
    age: 100,
};


const user2:User={
    name:"Mr.X",
    age: 100,
};