Gatsby site hosted on netlify

mountainskygoldens.com domain registered on namecheap
Project root directory is ./gatsby 
Public directory is ./gatsby/public

All commands are run from ./gatsby dir
build for production: npm run build
develop: npm run start

## netlify
2 sites: 
  1. prod-mountainskygoldens.netlify.com
  - mountainskygoldens.com points to it.
  - DNS managed by netlify
  - SSL cert by netlify
  - automatically rebuilds when master is pushed to
  - can be manually rebuilt by clicking contentful "go live" button in sidebar

  2. preview-mountainskygoldens.netlify.com
  - automatically rebuilds when preview is pushed to
  - automatically rebuilds when any contentful changes are published
  - accessible through the "preview" button in the contentful editor sidebar

## contentful
"Go live" button in sidebar is a custom app with a button that triggers a build webhook for prod
"Preview" button in sidebar is a sidebar extension, accessible through "settings/extensions"

###todo
[] Make the contentful preview extension an app.
[] Clean up sidebar in contentful
[] move gatsby dir to the repo root, change any filepaths to match the change.
[] fix second git project issue, where the vscode workspace opens two repos, one at the repo root, and one in ./gatsby
[] Change 99inbound form to use netlify
[] Display a subset of litters on the homepage.
  [] add a "See more" link to a page that shows rest of litters.
  [] Figure out a better way to handle showing multiple active litters.
[] Fix the testimonial content jump issue.
[] Make sure testimonial dots don't grow past viewport width
[] Make testimonial dots interactive
[] Add "see more" link to testimonial section that opens rest of testimonials in new page.
[] Make sure stud service page is g2g
[] Make sure google analytics is working
[] Fix site performance
[] update site code
  [] update packages
  [] remove react helmet
  [] fix robots-txt plugin
[] break "about" page content into multiple paragraphs
[] Shorten homepage hero text
  [] add extra text to configurable message
[] move homepage gallery main picture into gallery



