const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		statements: [{ type: Schema.Types.ObjectId, ref: "Statement" }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Book", BookSchema);
