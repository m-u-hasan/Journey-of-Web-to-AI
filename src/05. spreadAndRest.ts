//Spread Operator of array

let friends=["rahim", "karim",];
let collegeFriends=["you you", "jonka naka"];
let uniFrindes=["mr.du", "mr. smu"];

friends.push(...collegeFriends);
console.log(friends);

//Spread OPerator of Objects
const user={
    name: "rahim",
    Age: "20",
};
const info={
    village: "Nadhia",
    Post: "rhimpur",
};
const unserInfo={...user, ...info};
console.log(unserInfo);


//Rest operator with arrrow function (Manual)
const sentInvite=(frnd1:string,frnd2:string)=>{
    console.log(`Invitation sent to ${frnd1}`);
    console.log(`Invitation sent to ${frnd2}`);
}
sentInvite("Rahim", "Karim");
console.log(sentInvite);

//Rest operator with arrow function Pass as a Array: forEatch(ADVANCE)


const product=(...productName:string[]) => {
    console.log(`The name of product ${productName} `);
};

product("Apple", "komola", "Shirt", "Pent");


//Rest operator with arrow function Pass as a Array: forEatch(More ADVANCE)


const productInfo=(...productName:string[]) => {
    
   productName.forEach((productName:string)=> 
    {console.log(`The name of product ${productName} `)
   });
};

productInfo("Apple", "komola", "Shirt", "Pent");


