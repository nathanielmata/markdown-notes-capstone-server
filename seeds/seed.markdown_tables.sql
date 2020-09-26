BEGIN;

TRUNCATE
  markdown_notes,
  markdown_users
  RESTART IDENTITY CASCADE;

-- INSERT INTO markdown_users (email, user_name, full_name, password, image)
-- VALUES
--   ('nathaniel@thepixelparty.com', 'demouser1', 'Demo User1', 'password1', 'https://lh3.googleusercontent.com/a-/AOh14Ghn52dpIIUTcfUzE9kPxBShzmeVCvRF4U9rxia6WA=s192-c-rg-br100'),
--   ('nathaniel@ahdios.com', 'demouser2', 'Demo User2', 'password2', 'https://lh6.googleusercontent.com/-lLV5q-n48hk/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEr0D1IPDLCZ053OIDl8pMn06HWQ/s96-c-rg-br100/photo.jpg'),
--   ('nate@nathanielmata.com', 'demouser3', 'Demo User3', 'password3', 'https://lh3.googleusercontent.com/-0-rJumwbvI0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclXec2Yw5EGMjn0L33miUfQFB0iSA/s96-c-rg-br100/photo.jpg');

INSERT INTO markdown_users (email, user_name, full_name, password, image)
VALUES
  ('nathaniel@thepixelparty.com', 'demouser1', 'Demo User1', '$2a$12$WvOuZ3LmkkCIGV37j8UOfOLxzpJFPjEJOrzcxsB8NI9pY5xFDPu0K', 'https://lh3.googleusercontent.com/a-/AOh14Ghn52dpIIUTcfUzE9kPxBShzmeVCvRF4U9rxia6WA=s192-c-rg-br100'),
  ('nathaniel@ahdios.com', 'demouser2', 'Demo User2', '$2a$12$vl77zY7ke0UQ72jdWe55tuSWa5/vODsArzyyn5TVW6aYbuKl9s/MG', 'https://lh6.googleusercontent.com/-lLV5q-n48hk/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEr0D1IPDLCZ053OIDl8pMn06HWQ/s96-c-rg-br100/photo.jpg'),
  ('nate@nathanielmata.com', 'demouser3', 'Demo User3', '$2a$12$GHxqq1Vtd14EO1TbXdNRS.w3EgpjAFqL/xKBUEaD35UNCPSIRGRMK', 'https://lh3.googleusercontent.com/-0-rJumwbvI0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclXec2Yw5EGMjn0L33miUfQFB0iSA/s96-c-rg-br100/photo.jpg');

INSERT INTO markdown_notes (uid, user_id, title, content, created_at)
VALUES
  ('6d3c16f16ff3400da7d2998c7bc518c0', 1,'SVGs in JSX', E'# SVGs in JSX \n - [SVGtoJSX Electron App](https://github.com/SaraVieira/svg-to-jsx-electron/) \n ```- [SVG Basic Shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)```', '2020-01-13T16:28:32.615Z'),
  ('633c6f58fb814d2aba9b2ccad5972ec1', 1,'Static site generation with Hugo', E'fd', '2020-01-14T16:28:32.615Z'),
  ('24916a171f4f4abba439a797b61da561', 1,'Useful javascript array methods', E'fd', '2020-01-15T16:28:32.615Z'),
  ('ad7f282bb75e46e881f13e6ed89e1fe8', 1,'HTTP status codes cheatesheet', E'fd', '2020-01-16T16:28:32.615Z'),
  ('064dbaf633734a1593b1f59be77c0f7d', 1,'Custom HTML Elements with Web Component', E'fd', '2020-01-17T16:28:32.615Z'),
  ('18b24c5d352c4310a765432c5dd5d8ff', 1,'Intro to Web Assembly', E'fd', '2020-01-18T16:28:32.615Z'),
  ('f3ca658d9ff145c38f70296eeda73f6d', 1,'Understanding Go Interfaces', E'fd', '2020-01-19T16:28:32.615Z'),
  ('d87997b557c14fa08c9b581a0c8008fd', 1,'HTTP services in Golang', E'fd', '2020-01-20T16:28:32.615Z'),
  ('cbd1c89ade844879ad9e961cd9a33a16', 1,'Markdown Cheatsheet', E'# Markdown Cheatsheet \n - [Github Markdown Syntax](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)', '2020-01-21T16:28:32.615Z'),
  ('936e7d5359764c8ba0959e3eddade160', 1,'CSS Animations', E'# CSS Animations \n\n- Use @keyframes to control the intermediate steps in a CSS animation sequence \n\n- [MDN @keyframes ref](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)', '2020-01-22T16:28:32.615Z'),
  ('4da4195d0bee4bb8af80a5ab78b19691', 1,'Unordered Lists', E'* something \n* another thing \n* last thing \n* one more \n*not in the list\n***not in the list *hello* hi***', '2020-01-23T16:28:32.615Z');












COMMIT;