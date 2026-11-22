import { Router } from "express";

import { userController } from "./user.controller";

const router = Router()

const auth = (req, res, next) => {
    console.log("This protected route!");
    next()
}

router.post("/", userController.createUser);
router.get("/", auth, userController.getAllUsers );
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router
