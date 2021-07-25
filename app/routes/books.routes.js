const router = require("express").Router();
let Book = require("../models/book.model");
let Statement = require("../models/statement.model");

// Get all the books
router.route("/").get((req, res) => {
	Book.find()
		.then((books) => res.json(books))
		.catch((err) => res.status(400).json("error: " + err));
});

// Get a book by id and all the statements in the book
router.route("/:bookId").get(async (req, res) => {
	const book = await Book.findById(req.params["bookId"])
		.populate("statements")
		.exec();
	try {
		res.json(book);
	} catch (e) {
		res.status(400).json("error: " + err);
	}
});

// Add a book
router.route("/addbook").post((req, res) => {
	const title = req.body.title;

	const newBook = new Book({ title });

	newBook
		.save()
		.then(() => res.json("Book added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Delete a statement in the book
router.route("/:bookId/statements").get(async (req, res) => {
	const book = await Book.findById(req.params["bookId"])
		.populate("statements")
		.exec();
	try {
		res.json(book.statements);
	} catch (e) {
		res.status(400).json("error: " + e);
	}
});

// Get a statement in the book
router.route("/:bookId/statements/:statementId").get(async (req, res) => {
	const statement = await Statement.findById(req.params["statementId"]);
	try {
		res.json(statement);
	} catch (e) {
		res.status(400).json("error" + e);
	}
});

// Delete a statement in the book
router.route("/:bookId/statements/:statementId").delete(async (req, res) => {
	try {
		await Statement.findByIdAndDelete(req.params["statementId"]);
		res.json("Exercise deleted.");
	} catch (e) {
		res.status(400).json("error" + e);
	}
});

router
	.route("/:bookId/statements/:statementId/update")
	.post(async (req, res) => {
		const targetStatement = await Statement.findById(
			req.params["statementId"]
		);
		targetStatement.statement = req.body.statement;
		await targetStatement.save();
		res.redirect(`/books/${req.params["bookId"]}/statements/`);
	});

// Add a statement in the book
router.route("/:bookId/statements/addstatement").post(async (req, res) => {
	const book = await Book.findById(req.params["bookId"]);
	const statement = req.body.statement;
	const newStatement = new Statement({ statement });
	book.statements.push(newStatement);
	await newStatement.save();
	await book.save();
	res.redirect(`/books/${book._id}`);
});

module.exports = router;
