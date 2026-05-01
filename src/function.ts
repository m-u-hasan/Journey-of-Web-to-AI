//Function
//Normal Function & Arrow function

function add(num1:number,num2:number):number{
    return num1+num2;
}
console.log(add(2,2));
//arrow Function

const Karim = (num1:number,num2:number):number => num1+num2;
console.log(Karim(5,2));

// object=>Function=>method

const funInObj={
    Name: "Rahim",
    initialBalance: 100000,
    add(value:number):number{
        let total=this.initialBalance+value;
        return total;
    },
};
   console.log(funInObj.add(20000));