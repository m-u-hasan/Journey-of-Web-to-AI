import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";


//================Create User in DB==================
const createUser = async (req: Request, res: Response) => {
    //const { name, email, password, age } = req.body;
    try {
       const result =await userService.createUserIntoDB(req.body);
        //console.log(result);

        res.status(201).json(
            {
                success: true,
                message: "User create Successfully",
                data: result.rows[0],
            }
        );
    } catch (error: any) {
        res.status(500).json(
            {
                message: error.message,
                error: error,
            }
        )
    }
}


//================Retrive All User of DB============= 
const getAllUsers=async (req: Request, res: Response) => {
  try {
    const result=await userService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "All User Retrive successfully",
      data: result.rows
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User cant't get",
      data: error
    });
  }
}


//===============Retrive Single user with params=====
const getSingleUser=async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
const result=await userService.getSingleUserFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: true,
        message: "User Not found in DB",
        data: []
      })
    }
    res.status(200).json({
      success: true,
      message: "Single User Retrive successfully",
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      data: error
    });
  }
}


//===============Update user table==================
const updateUser=async (req: Request, res: Response) => {
    
  const { id } = req.params;
  const { name, password, age } = req.body;
  // console.log("Id: ", id);
  // console.log(name, password, age);
  try {
    const result= await userService.updateUserFromDB(req.body, id as string);
    //COALESCE ( , ) use for update separately, not effect another


    //=====if user not exist, so that updt will not completed========
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not Exist"
      })
    }

    res.status(200).json({
      success: true,
      message: "User update Successfully",
      data: result.rows[0]

    })
  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
}



//=============User Delete from DB=============
const deleteUser=async (req: Request, res: Response) => {
  const { id } = req.params;
  try {

    const result=await userService.deleteUserFromDB(id as string);
        // If user not exist in DB, so that we check early
    if (result.rowCount === 0) {
      res.status(500).json({
        status: true,
        message: "User Not Found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User Delted successfully",
      data: {}
    })
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message
    })
  }
}


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser, 
    deleteUser,
    
}
