const express = require("express");
const WishlistProduct = require("../modules/wishlist_product");
const http = require("http");
require("dotenv").config();

const userRouter = express.Router();

userRouter.get("/api/movies/:page", async (req, res) => {
  let page = req.url.split("/")[2] || 1; // Get page number from URL, default to 1

  // Fetch list of movies
  let request = http.get(
    `http://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`,
    (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        let movies = JSON.parse(data).results;
        res.write(JSON.stringify(movies));
        res.end();
      });
    }
  );

  // Handle request errors
  request.on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });
});

userRouter.get("/api/series/:page", async (req, res) => {
  let page = req.url.split("/")[2] || 1; // Get page number from URL, default to 1

  // Fetch list of series
  let request = http.get(
    `http://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`,
    (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        let series = JSON.parse(data).results;
        res.write(JSON.stringify(series));
        res.end();
      });
    }
  );

  // Handle request errors
  request.on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });
});

userRouter.get("/api/top/movies", async (req, res) => {
  // Fetch list of movies
  let request = http.get(
    `http://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        let movies = JSON.parse(data).results.slice(0, 5);
        res.write(JSON.stringify(movies));
        res.end();
      });
    }
  );

  // Handle request errors
  request.on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });
});

userRouter.get("/api/top/series", async (req, res) => {
  // Fetch list of series
  let request = http.get(
    `http://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        let series = JSON.parse(data).results.slice(0, 5);
        res.write(JSON.stringify(series));
        res.end();
      });
    }
  );

  // Handle request errors
  request.on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });
});

// $ Wishlist page
// add a product to the wishlist
userRouter.post("/api/wishlist", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    console.log(productId, userId);
    // Check if the product is already wishlisted by the user
    const existingWishlistedProduct = await WishlistProduct.findOne({
      productId,
      userId,
    });

    if (existingWishlistedProduct) {
      return res
        .status(400)
        .json({ msg: "Le produit est déjà dans la liste de souhaits" });
    }
    // Create a new wishlisted product document
    const wishlistedProduct = new WishlistProduct({ productId, userId });
    await wishlistedProduct.save();
    res.json(wishlistedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fetch the wishlist products
userRouter.get("/api/wishlist/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Retrieve the wishlisted products for the user and populate the product details
    const wishlistedProducts = await WishlistProduct.find({ userId }).populate(
      "productId"
    );
    console.log(wishlistedProducts);
    // Extract the product details from the wishlisted products
    const products = wishlistedProducts
      .filter((product) => product.productId !== null)
      .map((wishlistedProduct) => wishlistedProduct.productId);
    console.log(products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching wishlisted products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete product from the wishlist
userRouter.delete("/api/wishlist/:productId/:userId", async (req, res) => {
  const { productId, userId } = req.params;

  try {
    const product = await WishlistProduct.findOneAndDelete({
      productId,
      userId,
    });
    res.json(product);
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/api/search/movies", async (req, res) => {
  let query = url.parse(req.url, true).query;
  let page = query.page || 1; // Get page number from query string, default to 1
  let searchTerm = query.search;

  // Search for movies
  let request = http.get(
    `http://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchTerm}&page=${page}`,
    (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        let movies = JSON.parse(data).results;
        res.write(JSON.stringify(movies));
        res.end();
      });
    }
  );

  // Handle request errors
  request.on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });
});

userRouter.get("/api/search/series", async (req, res) => {
  let query = url.parse(req.url, true).query;
  let page = query.page || 1; // Get page number from query string, default to 1
  let searchTerm = query.search; // Get search term from query string

  // Search for series
  let request = http.get(
    `http://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchTerm}&page=${page}`,
    (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        let series = JSON.parse(data).results;
        res.write(JSON.stringify(series));
        res.end();
      });
    }
  );

  // Handle request errors
  request.on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });
});

userRouter.get("/api/trailer/movie/:movieId", async (req, res) => {
  let id = query.id; // Get id from query string
  // Fetch movie videos
  let request = http.get(
    `http://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`,
    (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        let videos = JSON.parse(data).results;
        let trailer = videos.find((video) => video.type === "Trailer");

        if (trailer) {
          res.write(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else {
          res.write("No trailer found.");
        }

        res.end();
      });
    }
  );

  // Handle request errors
  request.on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });
});

userRouter.get("/api/trailer/serie/:serieId", async (req, res) => {
  let id = query.id; // Get id from query string
  // Fetch series videos
  let request = http.get(
    `http://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`,
    (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        let videos = JSON.parse(data).results;
        let trailer = videos.find((video) => video.type === "Trailer");

        if (trailer) {
          res.write(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else {
          res.write("No trailer found.");
        }

        res.end();
      });
    }
  );

  // Handle request errors
  request.on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });
});

module.exports = userRouter;
