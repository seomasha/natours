const fs = require("fs");
const tours = JSON.parse(fs.readFileSync("dev-data/data/tours-simple.json"));

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTourByID = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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