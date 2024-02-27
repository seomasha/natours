const express = require("express");
const port = 3000;
const app = express();
const fs = require("fs");

app.use(express.json());

const tours = JSON.parse(fs.readFileSync("dev-data/data/tours-simple.json"));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTourByID = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    //if (id > tours.length) {
    return res.status(404).json({
      status: "Not found",
      message: "The tour doesn't exist",
    });
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);

  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: id }, req.body);

  tours.push(newTour);
  fs.writeFile(
    "dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    //if (id > tours.length) {
    return res.status(404).json({
      status: "Not found",
      message: "The tour doesn't exist",
    });
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    //if (id > tours.length) {
    return res.status(404).json({
      status: "Not found",
      message: "The tour doesn't exist",
    });
  }

  res.status(204).json({
    status: "Success",
    data: {
      tour: "<Deleted tour here...>",
    },
  });
};

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// //? means optional /:x?
// app.get("/api/v1/tours/:id", getTourByID);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
