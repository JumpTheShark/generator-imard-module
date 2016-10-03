'use strict';
const path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test');

const localeSamples = {
  "en": "An educational module",
  "ru": "Обучающий модуль"
}

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
    assert.fileContent("README.md", new RegExp(`${localeSamples[promtsEN.language]}`, 'g'));
  });
});

describe("Generating module: localization case", function () {
  const promtsRU = {
    language : "ru",
    title : "Кодицифированный модуль",
    description : "Специальное описание",
    keywords : ["ключевоеслово1", "ключевоеслово2"],
    contributors : ["автор1", "автор2"],
    disciplines : ["дисц1", "дисц2"],
    studyObjectives : ["со1", "со2", "со3"]
  };

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(promtsRU)
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

  it("populates files with the proper info in their locale", function () {
    assert.fileContent("README.md", new RegExp(`#\\s${promtsRU.title}`, 'g'));
    assert.fileContent("README.md", new RegExp(`${promtsRU.description}`, 'g'));

    assert.fileContent("module.json", new RegExp(`\"language\"\: \"${promtsRU.language}\"\,`, 'g'));
    assert.fileContent("README.md", new RegExp(`${localeSamples[promtsRU.language]}`, 'g'));
  });
});
