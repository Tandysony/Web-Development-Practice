# Web Development Practice

 > **LEARN, PRACTICE AND BUILD!**

* Author: Suo Tan (tandysony AT gmail DOT com)
* Created: Dec 18, 2015
* Last updated: May 1, 2016

---

# 1. The roles of web technologies

The most widely used web technologies/languages are HTML, CSS, JavaScript, PHP, MySQL, ASP.NET, MS SQL Server. Others like JAVA, Ruby, Python, MangoDB, etc. are also available to choose from. The following table presents the roles of several technologies/languages, taking HTML, CSS, JavaScript, PHP, Node.js, MySQL, MongoDB as examples.

| Technologies/Languages  | Roles     | Where it runs   |
| --------------|:---------------:|:---------------:|
| HTML          | Content and Structure <br> *(tex, images, tables, forms, etc)*    | Browser   |
| CSS           | Style and Presentation<br> *(color, fonts, background, margins, paddings, etc)*     | Browser   |
| JavaScript    | Client Side Scripting <br> *(dynamic user interaction, popups, form validation)*     | Browser   |
| PHP, Node.js           | Server Side Scripting  <br> *(server side logic and data processing)*    | Server    |
| MySQL, MangoDB         | Data Management  <br> *(store all sorts of data needed by a website)*          | Server    |

# 2. Basic technologies/languages

Front-end technologies majorly include the golden trinity: `HTML` for **Content**, `CSS` for **Style**, and `JavaScript` for **Behavior**.

### 2.1. HTML
#### # Block-level elements V.S. Inline elements

##### * Block-level elements
A **block-level element** always *starts on a new line* and takes up the full width available (stretches out to the left and right as far as it can). Examples of block-level elements:

```HTML
<div>
<h1> - <h6>
<p>
<form>
```

###### * Inline elements
An **inline element** *does not start on a new line* and only takes up as much width as necessary. Examples of inline elements:

```HTML
<span>
<a>
<img>
```

### 2.2. CSS

`CSS` (Cascading Style Sheets) is a style sheet language that describes the presentation of an `HTML` (or `XML`) document. `CSS` describes how elements must be rendered on screen, on paper, or in other media. The reason why we use `CSS` to separate the presentation layer of our page way from functional part that we may use JavaScript to add rich functionality to the page and markup as well.

* Use `#` to target a `ID` defined in HTML files; use `.` to target a `class` defined in HTML files; just use the element name, e.g., `body`, `h1`, for an `element` in HTML files.

### 2.3. JavaScript

Primary tasks JavaScript does:
  * Event Handling
  * DOM (Document Object Model) Traversal
  * DOM Manipulation
  * Send/receive data without page refresh (AJAX)

#### * JQuery

##### 1. Try jQuery selector at [jQuery Selector Tester](http://www.w3schools.com/jquery/trysel.asp)
##### 2. Try jQuery examples at [jQuery Examples](http://www.w3schools.com/jquery/jquery_examples.asp)

# 3. Web development with Drupal (or WordPress)

* [Install Drupal on a AMPPS](https://github.com/Tandysony/Web-Development-Practice/blob/master/Drupal_dev_docs/Install%20Drupal%20on%20AMPPS.md)
* [Web Development with Drupal 7](https://github.com/Tandysony/Web-Development-Practice/blob/master/Drupal_dev_docs/Web%20Development%20with%20Drupal%207.md)


# 4. MEAN stack

The acronym `MEAN` stands for `MongoDB Express.js AngularJS Node.js` and represents a group of technologies which are known to synergize well together. The major benefit of the `MEAN` stack is that it's extremely quick to prototype with. `Node.js` allows you to use Javascript on the backend as well as the front-end which can save you from having to learn a separate language. In addition, the `NoSQL` nature of MongoDB allows you to quickly change and alter the data layer without having to worry about migrations, which is a very valuable attribute when you're trying to build a product without clear specifications. Finally, these technologies have a lot of community support behind them so finding answers to questions or hiring help is going to be much easier using these technologies.

## FAQ
**Q1:** How to add `/usr/local/git/bin` to `$PATH` in Mac OS X?  
![PATH](PATH_problem.png)

  **A1:** `export PATH=$PATH:/usr/local/git/bin:/usr/local/bin`
