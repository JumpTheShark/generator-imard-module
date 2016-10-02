# <%= title %>
An educational module for IMARD learning ecosystem.

## Module description
<%= description%>

Modules materials lie in the fields of<% disciplines.forEach(function(discipline){ %>
- <%= discipline%><% }); %>

## Basic usage
You can write your content either using IMARD authoring system or directly into `module.md` file.

### Previewing changes
Use the following command:
```bash
imard server
```
To preview your content locally in the browser. Server uses HTTP port 4000 by default.

### Installing new components
To install a new components from IMARD components repository you can use this command:
```bash
imard install new-component
```
where `new-component` is the stub of the desired component.
