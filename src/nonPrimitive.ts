
let fruits :string[] =["Oragnge", "Apple", "Lichi", "Graphes"];
fruits.push('Karim');
//fruits.push(13); Argument of number type not possible to assign in string type

//mixed array
console.log("RUNNING...");
console.log(fruits);

let mixedArray: (string | number)[] =["rahim", "12", "karim"];

mixedArray.push('karim'); //valid
mixedArray.push(2123); //valid

//Non-Primitive tuple type

let coordinate:[number,number]=[10,20];

let couple:[string, string] =["Rahim", "Rahima"];


//Reference type: object

let userName={
    firstName: "Rahim",
    middleName: "Uddhin",
    lastName: "Sohanfsdddddddddddddddd"
}

console.log(userName);

let userName2:{
    readonly courseTitle: string,
    firstName:string;
    middleName?:string; //optional type
    lastName:string;
}={
    courseTitle: "Programming",
    firstName: "Rahim",
    //middleName: "Uddhin", //not show err bcs this is declared optional
    lastName: "Sohan"
}
// userName2.courseTitle=["programming Language-2"];// cannot
//  assign bcs its read only
console.log(userName2);