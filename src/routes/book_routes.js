const express = require("express");
const { Book } = require("../db");
const { getApiBooks, getDbBooks } = require("../controller/book_controller");


const router = express();
router.use(express.json());

router.get("/", async(req, res) => {
    let { name } = req.query;

    if(!name) {
        try {
            let books = await Book.findAll();

            if(!books.length) {
                books = await getApiBooks();
            }

            res.status(200).json(books);

        }
        catch(e) {
            console.log(e);
            res.status(400).send(e.message);
        }
    }
})


module.exports = router
 