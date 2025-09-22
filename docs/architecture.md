# Architecture

## Simple Parser

Instead of a simple parser architecture as shown here:

![](./assets/simple-parser-diagram.png)

## Parser-Formatter Architecture

Speech Markdown is first translated into an Abstract Syntax Tree (AST) and a formatter transforms that into the correct format:

![](./assets/parser-formatter-diagram.png)

This is more powerful as formatters have the ability to customize the output based on the differences of each platform.
