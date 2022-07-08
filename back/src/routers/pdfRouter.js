import { Router } from "express";
import { pdfService } from "../services/pdfService.js";
import path from "path";
const pdfRouter = Router();
const __dirname = path.resolve();
pdfRouter.get("/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const diary_id = req.params.id;
      const data = await pdfService.pdfConverter({
        id: diary_id,
      });
      res.contentType("application/pdf");
      res.sendFile(path.join(__dirname, "/", data));
    } catch (e) {
      console.log(e);
    }
  } else {
    res.sendStatus(404).send("invalid user");
  }
});

export { pdfRouter };
