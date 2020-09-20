BEGIN;

TRUNCATE
  markdown_notes,
  markdown_users
  RESTART IDENTITY CASCADE;

INSERT INTO markdown_users (email, user_name, full_name, password, image)
VALUES
  ('nathaniel@thepixelparty.com', 'nathanielmata', 'Nathaniel Mata', 'password', 'https://lh3.googleusercontent.com/a-/AOh14Ghn52dpIIUTcfUzE9kPxBShzmeVCvRF4U9rxia6WA=s192-c-rg-br100'),
  ('nathaniel@ahdios.com', 'nathanielrose', 'Nathaniel Rose', 'password', 'https://lh6.googleusercontent.com/-lLV5q-n48hk/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEr0D1IPDLCZ053OIDl8pMn06HWQ/s96-c-rg-br100/photo.jpg'),
  ('nate@nathanielmata.com', 'homer', 'Nathaniel Homer', 'password', 'https://lh3.googleusercontent.com/-0-rJumwbvI0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclXec2Yw5EGMjn0L33miUfQFB0iSA/s96-c-rg-br100/photo.jpg');

INSERT INTO markdown_notes (user_id, title, content, created_at)
VALUES
  (1,'SVGs in JSX', E'# SVGs in JSX \n - [SVGtoJSX Electron App](https://github.com/SaraVieira/svg-to-jsx-electron/) \n ```- [SVG Basic Shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)```', '2020-01-13T16:28:32.615Z'),
  (1,'Static site generation with Hugo', E'fd', '2020-01-14T16:28:32.615Z'),
  (1,'Useful javascript array methods', E'fd', '2020-01-15T16:28:32.615Z'),
  (1,'HTTP status codes cheatesheet', E'fd', '2020-01-16T16:28:32.615Z'),
  (1,'Custom HTML Elements with Web Component', E'fd', '2020-01-17T16:28:32.615Z'),
  (1,'Intro to Web Assembly', E'fd', '2020-01-18T16:28:32.615Z'),
  (1,'Understanding Go Interfaces', E'fd', '2020-01-19T16:28:32.615Z'),
  (1,'HTTP services in Golang', E'fd', '2020-01-20T16:28:32.615Z'),
  (1,'Markdown Cheatsheet', E'# Markdown Cheatsheet \n - [Github Markdown Syntax](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)', '2020-01-21T16:28:32.615Z'),
  (1,'CSS Animations', E'# CSS Animations \n\n- Use @keyframes to control the intermediate steps in a CSS animation sequence \n\n- [MDN @keyframes ref](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)', '2020-01-22T16:28:32.615Z'),
  (1,'Unordered Lists', E'* something \n* another thing \n* last thing \n* one more \n*not in the list\n***not in the list *hello* hi***', '2020-01-23T16:28:32.615Z');

COMMIT;