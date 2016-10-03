'use strict';
const path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test');

describe('Generating module: common case', function () {
  const promtsEN = {
    language : "en",
    title : "Codified module",
    description : "Codified description",
    keywords : ["keyword1", "keyword2"],
    contributors : ["contrib1", "contrib2"],
    disciplines : ["disc1", "disc2"],
    studyObjectives : ["so1", "so2", "so3"]
  };

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(promtsEN)
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'module.json',
      'module.md',
      'package.json',
      '.gitignore',
      'README.md'
    ]);
  });

  it('populates files with suitable contents read from the prompts', function () {
    assert.fileContent("README.md", new RegExp(`#\\s${promtsEN.title}`, 'g'));
    assert.fileContent("README.md", new RegExp(`${promtsEN.description}`, 'g'));

    assert.fileContent("module.json", new RegExp(`\"language\"\: \"${promtsEN.language}\"\,`, 'g'));
  });
});

describe("Generating module: localization case", function () {

});
