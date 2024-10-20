# Dev Club Explore Pages

This project creates a dynamic set of pages for Dev Club that allows users to explore various items such as coding challenges, workshops, competitions, and resources. It uses Node.js to serve HTML files and dynamically loads content from a JSON file. The content for each page is customizable and stored in `exploreItems.json`.

## Features

- **Dynamic Page Loading**: Different explore items are loaded dynamically from a JSON file, reducing the need for hardcoded HTML.
- **Event-Driven Architecture**: The server is designed using Node.js with custom events to serve pages like the home, explore, and 404 (Not Found) pages.
- **Modular JSON Content**: Content for explore items is stored in `exploreItems.json` and can be easily updated or extended.
- **Back to Home Links**: All pages include navigation options for returning to the home page.
- **404 Page**: A custom 404 page is served when a user tries to access an invalid URL.

To run this project, you will need:

- **Node.js** installed on your machine.

 Clone this repository:

   ```bash
   git clone https://github.com/your-username/dev-club-explore.git
```

### Project Structure
```bash
├── public
|    ├── exploreItems.json      # Contains the content for each explore item
|    ├── index.html             # The home page of the project
|    ├── explore.html           # The explore page where items are listed
|    ├── notFound.html          # The 404 Not Found page
|    ├── items.html
|    ├── items.json 
|    ├── exploreItems.txt 
├── index.js              # The Node.js server script
├── README.md              # Documentation for the project
```

### Contributing
Feel free to fork this repository, create new features, or submit issues. Contributions are welcome!

  - Fork the repository.
  -Create a new branch for your feature or bugfix.
  -Open a pull request when your changes are ready for review.
