const express = require("express");
const router = express.Router();
const multer = require("multer");
const Children = require("../models/children");
const supabase = require("../supabase");
const storage = multer.memoryStorage();
const upload = multer();

router.get("/", async (req, res) => {
  const children = await Children.find();
  res.json(children);
});


router.post("/add", async (req, res) => {
    try {
        const bookingEmail = req.body.bookingEmail;
        const bookingDate = req.body.bookingDate;
        const tourID = req.body.tourID;
        const name = req.body.name;
        const sex = req.body.sex;
        const dob = req.body.dob;
        const birthCert = req.body.birthCert;

        const children = new Children({
          bookingEmail,
          bookingDate,
          tourID,
          name,
          sex,
          dob,
          birthCert,
        })

        await children.save();
        res.json({ success: true, children });
    } catch (error) {
      res.status(400).json({
        error
      });
}})


router.post("/update", async (req, res) => {
  try {
    let { _id, name, sex, dob, birthCert } = req.body;

    const child = await Children.findOne({ _id});

    if (!child) {
      res.status(401).send("No children found");
      return;
    }

    const updated = await Children.updateOne({ _id},
      { name, dob, sex, birthCert})

    res.status(200).json("Update successfully");
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});

router.get("/booking", async (req, res) => {
  const bookingEmail  = req.query.bookingEmail;
  const bookingDate  = req.query.bookingDate;
  const children = await Children.find({ bookingEmail, bookingDate });
  res.json(children);
});

router.get("/tour", async (req, res) => {
  const tourID = req.query.tourID;
  const children = await Children.find({ tourID });
  res.json(children);
});

// router.post(
//   "/upload-image",
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       console.log("hello")
//       const childId = req.body.childID;
//       console.log("hello1")
//       cosole.log("childId", childId);

//       // Upload image to Supabase storage
//       const { data: uploadedFile, error } = await supabase.storage
//         .from("myadventure")
//         .upload(req.file.originalname, req.file.buffer);

//         console.log("hello2")

//       if (error) {
//         throw new Error("Failed to upload image");
//       }

//       const imageUrl = uploadedFile.url;

//       // Update the image field in the child document
//       const child = await Children.findOne({ _id: childId });

//       if (!child) {
//         res.status(404).json({ error: "Child not found" });
//         return;
//       }

//       child.birthCert = imageUrl;
//       await child.save();

//       res.json({ imageUrl });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: "An error occurred during image upload" });
//     }
//   }
// );

router.post("/update-imageURL", async (req, res) => {
  try {
    let { _id, birthCert } = req.body;

    const child = await Children.findOne({ _id});

    if (!child) {
      res.status(401).send("No children found");
      return;
    }

    const updated = await Children.updateOne({ _id},
      { birthCert})

    res.status(200).json("Update successfully");
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});

// router.post('/upload-image', upload.single('image'), async (req, res) => {
//   try {
//     const childId = req.body.childID;

//     // Upload image to Supabase storage
//     const { data: uploadedFile, error } = await supabase.storage
//       .from('myadventure')
//       .upload(req.file.originalname, req.file.buffer);

//     if (error) {
//       throw new Error('Failed to upload image');
//     }

//     const imageUrl = uploadedFile.url;

//     // Update the image field in the child document
//     const child = await Children.findOne({ _id: childId });

//     if (!child) {
//       res.status(404).json({ error: 'Child not found' });
//       return;
//     }

//     child.birthCert = imageUrl;
//     await child.save();

//     res.json({ imageUrl });
//   } catch (error) {
//     console.error('An error occurred during image upload:', error);
//     res.status(500).json({ error: 'An error occurred during image upload' });
//   }
// });

module.exports = router;
