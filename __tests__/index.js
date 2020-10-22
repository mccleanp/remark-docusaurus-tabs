const path = require("path");
const fs = require("fs");
const unified = require("unified");
const remarkParse = require("remark-parse");
const remarkStringify = require("remark-stringify");
const remarkMdx = require("remark-mdx");
const toMDXAST = require("@mdx-js/mdx/md-ast-to-mdx-ast");
const remarkSlug = require("remark-slug");
const squeezeParagraphs = require("remark-squeeze-paragraphs");
const tabs = require("..");

describe("remark-tabs()", () => {
  test("should be a function", () => {
    expect(typeof tabs).toEqual("function");
  });

  test("should return a function", () => {
    expect(typeof tabs()).toEqual("function");
  });
});

describe("fixtures", () => {
  const fixtures = fs.readdirSync(path.resolve(__dirname, "fixtures"));

  function loadFixture(fixture, filename) {
    try {
      return fs.readFileSync(
        path.resolve(__dirname, "fixtures", fixture, filename),
        "utf8"
      );
    } catch (e) {
      return null;
    }
  }

  function saveFixture(fixture, filename, content) {
    fs.writeFileSync(
      path.resolve(__dirname, "fixtures", fixture, filename),
      content
    );
  }

  function jsxCompiler() {
    this.Compiler.prototype.visitors.jsx = (node) => node.value;
    this.Compiler.prototype.visitors.import = (node) => node.value;
    this.Compiler.prototype.visitors.comment = (node) => `<!--${node.value}-->`;
  }

  const parse = (mdx) => {
    const result = unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(toMDXAST)
      .use(remarkSlug)
      .use(tabs)
      .use(squeezeParagraphs)
      .use(remarkStringify)
      .use(jsxCompiler)
      .processSync(mdx);

    return result.contents;
  };

  fixtures.forEach((fixture) => {
    test(fixture, () => {
      const input = loadFixture(fixture, "input.mdx");
      const output = loadFixture(fixture, "output.mdx");
      const result = parse(input);

      if (output == null) {
        saveFixture(fixture, "output.mdx", result);
      } else {
        expect(result).toEqual(output);
      }
    });
  });
});
