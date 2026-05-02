//Destructuing of Object

//Note: The destructuring object or array name will be in right side of equal "=" sign. 

const product={
    id: 2123,
    Name: "Apple",
    Price: "56564",
    origin:{
        making: "USA",
        pakaging: "China",
        port: "Germany",
    },
    discount: "545",
};

const {origin:{port:p}} = product; //destructing
console.log(p);

//Destructuring of Array

const flower=["Rose", "Lily", "Tulip", "Beli"];
const [a,b,c,d] =flower;
console.log(c);

const [,,hello] =flower;
console.log(hello);

const [,myfavourite] =flower;
console.log(myfavourite);