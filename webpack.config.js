const path = require("path");

module.exports = {
	mode: "development",

	entry: "./src/index.js",

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	devServer: {
		contentBase: path.join(__dirname, "public"),
		port: 3000,
	},
	resolve: {
		fallback: { os: require.resolve("os-browserify/browser") },
	},
};
