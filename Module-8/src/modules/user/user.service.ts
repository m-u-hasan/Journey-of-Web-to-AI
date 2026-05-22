import { pool } from "../../db";
import type { Iuser } from "../user.innterface";

import bcrypt from "bcryptjs";

const createUserIntoDB= async(payLoad: Iuser)=>{
    const {name, email, password, age}=payLoad;

const hashedPassword = await bcrypt.hash(password, 10);

console.log(hashedPassword);

 const result = await pool.query(`
  INSERT INTO users(name, email, password, age) VALUES($1,$2,$3,$4) RETURNING
  name, email, age, created_at, updated_at`, [name, email, hashedPassword, age]);

  //delete result.rows[0].password; if we try to RETURNING *
  return result;
}

const getAllUserFromDB=async()=>{
    const result = await pool.query(`
      SELECt *from users
      `);
      return result;
}

const getSingleUserFromDB=async(id: string)=>{
    
    const result = await pool.query(`
  SELECT *from users where id=$1
  `, [id],
);
  return result;

}

const updateUserFromDB=async(payLoad: Iuser, id:string)=>{

    const{name, password, age}=payLoad;
    
    const result = await pool.query(`
    UPDATE users
    SET
    name=COALESCE($1, name), 
    password=COALESCE($2, password),
    age=COALESCE($3, age)
    WHERE id=$4 
    RETURNING *
    `, [name, password, age, id]);
    return result;
}


const deleteUserFromDB =async(id: string)=>{
    
    const result = await pool.query(`
      DELETE FROM users where id=$1
      `, [id],
    );

    return result;
}
export const userService={
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB
}