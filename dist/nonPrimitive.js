"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fruits = ["Oragnge", "Apple", "Lichi", "Graphes"];
fruits.push('Karim');
//fruits.push(13); Argument of number type not possible to assign in string type
//mixed array
console.log("RUNNING...");
console.log(fruits);
let mixedArray = ["rahim", "12", "karim"];
mixedArray.push('karim'); //valid
mixedArray.push(2123); //valid
//Non-Primitive tuple type
let coordinate = [10, 20];
let couple = ["Rahim", "Rahima"];
//Reference type: object
let userName = {
    firstName: "Rahim",
    middleName: "Uddhin",
    lastName: "Sohan"
};
let userName2 = {
    firstName: "Rahim",
    //middleName: "Uddhin", //not show err bcs this is declared optional
    lastName: "Sohan"
};
console.log(userName2);
//# sourceMappingURL=nonPrimitive.js.map