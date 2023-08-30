import { Router } from "express";
const router = Router ();

import {login} from "../controllers/views.controllers.js"

router.post('/logout', login, (req, res) => {
   req.session.destroy(err => {
   if (err) {
     return res.json({ status: 'Logout ERROR', body: err })
   }
   else  res.send('Logout ok!')
 })
 console.log(err);
});
export default router; 