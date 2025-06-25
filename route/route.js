import { Router } from "express";
import confirmationHandler from "../controller/confirmation.js";
import bookHandler from "../controller/books.js";

const route = Router();

route.post("/contactus", confirmationHandler);
route.post("/book", bookHandler);
export default route;