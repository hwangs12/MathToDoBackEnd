const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statementSchema = new Schema(
	{
		statement: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
	},
	{
		timestamps: true,
	}
);

const Statement = mongoose.model("Statement", statementSchema);

module.exports = Statement;
