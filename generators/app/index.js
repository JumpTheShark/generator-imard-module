'use strict';
const yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      //'Welcome to the impressive ' + chalk.red('generator-imard-module') + ' generator!'
      `Welcome to this fancy ${chalk.yellow('learning module')} generator!`
    ));

    const
      prompts = [
        {
          type: "list",
          name: "language",
          message: "In what language are you going to write?",
          choices: ["en", "ru"],
          "default": "en"
        },
        {
          type: "input",
          name: "title",
          message: "Specify the title for your module",
          "default": "Sample module"
        },
        {
          type: "input",
          name: "description",
          message: "Enter the brief description for your module",
          "default": "Sample learning module created to demonstrate the very basic model functionality"
        },
        {
          type: "input",
          name: "keywords",
          message: "Please list keywords for your modules separated by comma",
          "default": ["IMARD", "sample"],

          filter: (value) => (typeof value === "object") ? value :
            (value === "") ? [] :
              value.replace(/,\s/g, ",").split(",")
        },
        {
          type: "input",
          name: "contributors",
          message: "Please list authors and contributors that are working on this module, separated by comma",
          "default": ["IMARD system"],

          filter: (value) => (typeof value === "object") ? value :
            (value === "") ? [] :
              value.replace(/,\s/g, ",").split(",")
        },
        {
          type: "input",
          name: "disciplines",
          message: "Please list disciplines in which the subject of your module would lie separated by comma",
          "default": ["IMARD system", "computer science"],

          filter: (value) => (typeof value === "object") ? value :
            (value === "") ? [] :
              value.replace(/,\s/g, ",").split(",")
        },
        {
          type: "input",
          name: "studyObjectives",
          message: "Please list the study objectives of your module separated by semicolon",
          "default": ["Learn the ways of adaptive learning", "Embrace the power of static generators"],

          filter: (value) => (typeof value === "object") ? value :
            (value === "") ? [] :
              value.replace(/;\s/g, ";").split(";")
        }
      ];

    return this.prompt(prompts).then( (props) => {
      props.contributorsList = JSON.stringify(props.contributors) || [];
      props.keywordsList = JSON.stringify(props.keywords) || [];
      props.disciplinesList = JSON.stringify(props.disciplines) || [];
      props.studyObjectivesList = JSON.stringify(props.studyObjectives) || [];
      props.id = new Date();

      props.creationDate = new Date().toDateString();

      this.props = props;
    } );
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath(`README-${this.props.language}.md`),
      this.destinationPath("README.md"),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("package-tpl.json"),
      this.destinationPath("package.json"),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("module.json"),
      this.destinationPath("module.json"),
      this.props
    );

    this.fs.copy(
      this.templatePath("gitignore.tpl"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("module.md"),
      this.destinationPath("module.md")
    );
  },

  install: function () {
    //this.npmInstall();
  }
});
