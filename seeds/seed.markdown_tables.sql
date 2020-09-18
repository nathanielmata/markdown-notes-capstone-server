BEGIN;

TRUNCATE
  markdown_notes,
  markdown_users
  RESTART IDENTITY CASCADE;

INSERT INTO markdown_users (email, full_name, password, image)
VALUES
  ('nathaniel@thepixelparty.com', 'Nathaniel Mata', 'password', 'https://lh3.googleusercontent.com/a-/AOh14Ghn52dpIIUTcfUzE9kPxBShzmeVCvRF4U9rxia6WA=s192-c-rg-br100'),
  ('nathaniel@ahdios.com', 'Nathaniel Rose', 'password', 'https://lh6.googleusercontent.com/-lLV5q-n48hk/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEr0D1IPDLCZ053OIDl8pMn06HWQ/s96-c-rg-br100/photo.jpg'),
  ('nate@nathanielmata.com', 'Nathaniel Homer', 'password', 'https://lh3.googleusercontent.com/-0-rJumwbvI0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclXec2Yw5EGMjn0L33miUfQFB0iSA/s96-c-rg-br100/photo.jpg');

INSERT INTO markdown_notes (user_id, title, content)
VALUES
  (1,'SVGs in JSX', '# SVGs in JSX \n - [SVGtoJSX Electron App](https://github.com/SaraVieira/svg-to-jsx-electron/) \n ```- [SVG Basic Shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)```'),
  (1,'Static site generation with Hugo', 'fd'),
  (1,'Useful javascript array methods', 'fd'),
  (1,'HTTP status codes cheatesheet', 'fd'),
  (1,'Custom HTML Elements with Web Component', 'fd'),
  (1,'Intro to Web Assembly', 'fd'),
  (1,'Understanding Go Interfaces', 'fd'),
  (1,'HTTP services in Golang', 'fd'),
  (1,'Markdown Cheatsheet', '# Markdown Cheatsheet \n - [Github Markdown Syntax](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)'),
  (1,'CSS Animations', '# CSS Animations \n - Use @keyframes to control the intermediate steps in a CSS animation sequence \n - [MDN @keyframes ref](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)'),
  (1,'Unordered Lists', '* something \n* another thing \n* last thing \n* one more \n*not in the list\n***not in the list *hello* hi***');

COMMIT;